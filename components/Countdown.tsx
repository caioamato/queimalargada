
import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';
import { LoteType } from '../App';

interface CountdownProps {
  loteStatus: LoteType;
}

const Countdown: React.FC<CountdownProps> = ({ loteStatus }) => {
  const viradaLoteDate = new Date('2026-02-02T23:59:59').getTime();
  const diaFestaDate = new Date('2026-02-07T20:00:00').getTime();
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = loteStatus === 'LOTE_1' ? viradaLoteDate : diaFestaDate;
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [loteStatus, viradaLoteDate, diaFestaDate]);

  if (loteStatus === 'NO_DIA') {
    return (
      <div className="brutalist-card bg-[#D12E4B] p-6 md:p-10 text-center relative overflow-hidden border-[#005C53] shadow-[8px_8px_0px_0px_#000]">
        <div className="relative z-10 space-y-4">
          <div className="inline-block bg-white text-[#D12E4B] font-display px-6 py-2 border-2 border-[#005C53] rotate-2">
            HOJE É O DIA! 😱🎉
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-white uppercase leading-tight">Chegou a hora de queimar a largada</h2>
          <p className="text-white font-bold text-lg md:text-xl uppercase tracking-widest">Ingressos na porta: R$ 30,00 🏃💨</p>
        </div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 10px, transparent 10px, transparent 20px)' }}></div>
      </div>
    );
  }

  const TimeUnit = ({ value, label, isSeconds = false }: { value: number, label: string, isSeconds?: boolean }) => (
    <div className={`flex flex-col items-center bg-white border-2 md:border-4 border-[#005C53] p-2 md:p-6 shadow-[4px_4px_0px_0px_#005C53] md:shadow-[6px_6px_0px_0px_#005C53] transform transition-all ${isSeconds ? 'scale-105 bg-[#FF9E1B]' : 'hover:-translate-y-1'}`}>
      <span className={`font-display text-2xl md:text-6xl text-[#005C53] ${isSeconds ? 'animate-pulse' : ''}`}>
        {value.toString().padStart(2, '0')}
      </span>
      <span className="font-bold text-[8px] md:text-sm uppercase tracking-widest text-[#005C53]/60">{label}</span>
    </div>
  );

  return (
    <div className="brutalist-card bg-[#FF9E1B] p-5 md:p-10 text-center relative overflow-hidden border-[#005C53]">
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-[#005C53] text-white px-3 py-1 rounded-full border-2 border-white z-20">
        <div className="w-2 h-2 bg-[#D12E4B] rounded-full animate-ping"></div>
        <span className="text-[10px] font-black tracking-tighter">LOTE ATIVO</span>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8">
        <div className="inline-flex items-center gap-3 bg-[#005C53] text-white font-display px-4 md:px-6 py-2 md:py-3 border-2 md:border-4 border-[#005C53] -rotate-1 shadow-[4px_4px_0px_0px_#D12E4B]">
          <Timer size={24} className="animate-spin-slow" style={{ animationDuration: '6s' }} />
          {loteStatus === 'LOTE_1' ? 'VIRADA DE LOTE EM:' : 'O ROLÊ COMEÇA EM:'}
        </div>

        <div className="grid grid-cols-4 gap-2 md:gap-8 w-full max-w-3xl">
          <TimeUnit value={timeLeft.days} label="Dias" />
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <TimeUnit value={timeLeft.seconds} label="Seg" isSeconds />
        </div>

        <div className="relative group w-full max-w-lg">
          <div className="absolute inset-0 bg-[#005C53] translate-x-1 translate-y-1 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
          <p className="relative font-display text-sm md:text-2xl text-[#005C53] bg-white px-4 md:px-8 py-3 md:py-4 border-2 md:border-4 border-[#005C53] uppercase leading-tight">
            {loteStatus === 'LOTE_1' ? 'CORRE! DIA 01/FEV SOBE PRA R$ 25 🏃💨' : 'ÚLTIMOS INGRESSOS ANTECIPADOS! 🏃💨'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
