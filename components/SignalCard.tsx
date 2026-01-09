
import React from 'react';
import { Signal } from '../types';

interface SignalCardProps {
  signal: Signal;
}

const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
  return (
    <a 
      href={signal.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/50 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(6,182,212,0.1)] overflow-hidden"
    >
      {/* Visual Glitch Decor */}
      <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-cyan-500 transition-all duration-500" />
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-[9px] font-bold tracking-[0.3em] text-cyan-500/60 uppercase">
            ID // {signal.id}
          </span>
          <span className="text-[10px] font-mono text-white/30 uppercase mt-1">
            {signal.timestamp}
          </span>
        </div>
        <div className="px-2 py-0.5 rounded border border-cyan-500/30 text-[9px] font-bold text-cyan-400 uppercase tracking-widest">
          ONLINE
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors uppercase leading-tight">
        {signal.title}
      </h3>
      
      <div className="flex justify-between items-center pt-4 border-t border-white/5 mt-4">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] mb-1">Source Node</span>
          <span className="text-xs font-bold text-white/80 font-mono tracking-wider">{signal.category}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-cyan-500/40 group-hover:text-cyan-400 transition-colors">
          <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Access Link</span>
          <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center group-hover:border-cyan-500/50 group-hover:bg-cyan-500/10 transition-all">
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            >
              <path d="M7 17l10-10M17 17V7H7" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
};

export default SignalCard;
