
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SignalCard from './components/SignalCard';
import BootSequence from './components/BootSequence';
import { fetchSignals } from './services/dataService';
import { Signal, AppState } from './types';

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
        error: 'CONNECTION_FAILURE: Could not synchronize with neural source.', 
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
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none neural-gradient opacity-60" />
      
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />

      <main className="w-full max-w-2xl px-6 pb-32 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Header />

        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center px-2 mb-6">
            <h2 className="text-xs font-bold text-cyan-500/80 uppercase tracking-widest">Live Signal Feed</h2>
            <div className="flex items-center space-x-1">
              <span className="text-[10px] text-white/30 uppercase">Uplink:</span>
              <span className={`text-[10px] font-mono ${state.error ? 'text-red-400' : 'text-cyan-400'}`}>
                {state.error ? 'OFFLINE' : 'STABLE // 12ms'}
              </span>
            </div>
          </div>

          {state.error && (
            <div className="p-6 rounded-xl border border-red-500/30 bg-red-500/5 text-center">
              <p className="text-red-400 font-mono text-xs uppercase tracking-wider mb-4">{state.error}</p>
              <button 
                onClick={loadData}
                className="text-[10px] font-bold text-white uppercase bg-red-500/20 hover:bg-red-500/40 px-4 py-2 rounded transition-colors"
              >
                Retry Handshake
              </button>
            </div>
          )}

          {state.loading && !state.error ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 rounded-xl bg-white/5 border border-white/10 animate-pulse" />
              ))}
            </div>
          ) : (
            state.signals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))
          )}

          {!state.loading && !state.error && state.signals.length === 0 && (
            <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/2 backdrop-blur-sm">
              <p className="text-white/40 font-mono text-xs uppercase tracking-widest">No signals detected in cloud</p>
              <p className="text-[10px] text-white/20 mt-2 uppercase">Ensure the sheet is public or has valid data</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center opacity-40">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em]">
            © 2024 SILICON VIBE PROTOCOL
          </p>
          <p className="text-[8px] font-mono mt-1">
            TERMINAL_BUILD_V3.02_HOTFIX
          </p>
        </footer>
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-6">
        <button 
          onClick={loadData}
          disabled={state.loading}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase py-4 rounded-xl shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all duration-300 active:scale-95 flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            className={`${state.loading ? 'animate-spin' : 'group-hover:rotate-180'} transition-transform duration-500`}
          >
            <path d="M21 2v6h-6M3 12a9 9 0 0115-6.7L21 8M3 22v-6h6M21 12a9 9 0 01-15 6.7L3 16" />
          </svg>
          <span className="tracking-widest text-sm">{state.loading ? 'Syncing...' : 'Refresh Signal Hub'}</span>
        </button>
      </div>
    </div>
  );
};

export default App;
