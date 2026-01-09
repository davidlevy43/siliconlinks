
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import SignalCard from './components/SignalCard.tsx';
import BootSequence from './components/BootSequence.tsx';
import { fetchSignals } from './services/dataService.ts';
import { Signal, AppState } from './types.ts';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    isBooting: true,
    signals: [],
    loading: true,
    error: null
  });

  const loadData = async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const sheetId = '1VU1qo4BZ4cFNbjsHHWqAcO7A5zZx1BiYwDYkbsiId_8';
      const data = await fetchSignals(sheetId);
      setState(prev => ({ ...prev, signals: data, loading: false }));
    } catch (err) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        error: 'CONNECTION_FAILURE: NEURAL_UPLINK_TIMEOUT', 
        loading: false 
      }));
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleBootComplete = () => {
    setState(prev => ({ ...prev, isBooting: false }));
  };

  if (state.isBooting) {
    return <BootSequence onComplete={handleBootComplete} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 relative overflow-hidden flex flex-col items-center">
      <div className="fixed inset-0 pointer-events-none neural-gradient opacity-60" />
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />

      <main className="w-full max-w-2xl px-6 pb-32 relative z-10">
        <Header />

        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center px-2 mb-6">
            <h2 className="text-xs font-bold text-cyan-500/80 uppercase tracking-widest">Live Signal Feed</h2>
            <div className="flex items-center space-x-1">
              <span className="text-[10px] text-white/30 uppercase">Uplink:</span>
              <span className={`text-[10px] font-mono ${state.error ? 'text-red-400' : 'text-cyan-400'}`}>
                {state.error ? 'OFFLINE' : 'STABLE // 24ms'}
              </span>
            </div>
          </div>

          {state.error && (
            <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/5 text-center">
              <p className="text-red-400 font-mono text-[10px] uppercase tracking-wider mb-4">{state.error}</p>
              <button onClick={loadData} className="text-[10px] font-bold text-white uppercase bg-red-500/20 px-4 py-2 rounded">Retry Sync</button>
            </div>
          )}

          {state.loading && !state.error ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
              ))}
            </div>
          ) : (
            state.signals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))
          )}

          {!state.loading && !state.error && state.signals.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
              <p className="text-white/20 font-mono text-xs uppercase tracking-widest">Waiting for incoming signal...</p>
            </div>
          )}
        </div>

        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center opacity-40">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em]">© 2024 SILICON VIBE PROTOCOL</p>
        </footer>
      </main>

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-6">
        <button 
          onClick={loadData}
          disabled={state.loading}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95 disabled:opacity-50"
        >
          {state.loading ? 'Synchronizing...' : 'Refresh Uplink'}
        </button>
      </div>
    </div>
  );
};

export default App;
