
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex flex-col items-center py-12 px-6">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full border border-cyan-500/30 blur-xl neon-pulse" />
        <div className="w-20 h-20 rounded-full border-2 border-cyan-500 flex items-center justify-center relative z-10 bg-[#020617] shadow-[inset_0_0_15px_rgba(6,182,212,0.2)]">
          <span className="text-2xl font-black text-white tracking-tighter">SV</span>
        </div>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter text-center uppercase mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        SILICON <span className="text-cyan-500 italic">VIBE</span>
      </h1>
      
      <div className="relative group">
        <div className="flex items-center space-x-3 text-[10px] font-bold text-cyan-500/70 uppercase tracking-[0.5em] bg-cyan-500/5 px-4 py-2 rounded-full border border-cyan-500/20">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Neural Uplink Active</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
