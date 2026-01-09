
import React, { useState, useEffect } from 'react';

interface BootSequenceProps {
  onComplete: () => void;
}

const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const steps = [
    "INITIALIZING NEURAL CORE...",
    "HANDSHAKE PROTOCOL: 0x8F2A...",
    "DECRYPTING BIO-STREAMS...",
    "SYNCING WITH SILICON VIBE...",
    "CONNECTION SECURE."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center p-6 text-cyan-500 font-mono">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-cyan-500 flex items-center justify-center neon-pulse">
            <span className="text-2xl font-black tracking-tighter">SV</span>
          </div>
        </div>
        
        <div className="space-y-2 h-40">
          {steps.map((text, idx) => (
            <div 
              key={idx} 
              className={`transition-opacity duration-300 ${idx <= step ? 'opacity-100' : 'opacity-0'}`}
            >
              <span className="mr-2">[{idx <= step ? 'OK' : '..'}]</span>
              <span className={idx === step ? 'animate-pulse' : ''}>{text}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 w-full bg-cyan-900/20 h-1 rounded-full overflow-hidden">
          <div 
            className="h-full bg-cyan-500 transition-all duration-300 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
