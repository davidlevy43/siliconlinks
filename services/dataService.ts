
import { Signal } from '../types';

/**
 * Robust CSV parser handling quotes and various line endings.
 */
function parseCSV(csvText: string): any[] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField);
        currentField = '';
      } else if (char === '\r' || char === '\n') {
        currentRow.push(currentField);
        if (currentRow.some(field => field.trim() !== '')) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = '';
        if (char === '\r' && nextChar === '\n') i++;
      } else {
        currentField += char;
      }
    }
  }
  
  if (currentRow.length > 0 || currentField !== '') {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

export async function fetchSignals(sheetId?: string): Promise<Signal[]> {
  if (!sheetId) return [];

  // Fetching as CSV via Google Visualization API
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Uplink failed');
    const csvText = await response.text();
    const rows = parseCSV(csvText);
    
    if (rows.length < 2) return [];

    // Filter headers and map based on positions from the screenshot
    // Row 0 is Header: [Date, Headline, Source, URL]
    // Row 1+ are Data
    return rows.slice(1).map((row, index) => {
      const date = row[0]?.trim() || '';
      const headline = row[1]?.trim() || '';
      const source = row[2]?.trim() || '';
      const link = row[3]?.trim() || '#';

      return {
        id: String(index + 1).padStart(2, '0'),
        title: headline || 'UNKNOWN_SIGNAL',
        description: `Signal intercepted from ${source || 'unidentified source'}. Encryption layer: standard.`,
        category: source.toUpperCase() || 'EXTERNAL',
        timestamp: date || new Date().toLocaleDateString(),
        link: link.startsWith('http') ? link : `https://${link}`,
        status: 'active' as const
      };
    }).filter(s => s.title !== 'UNKNOWN_SIGNAL');
  } catch (err) {
    console.error('Data Transmission Error:', err);
    throw err;
  }
}
