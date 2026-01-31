import React from 'react';
import { Calendar, Clock, Ticket, ChevronDown } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToTickets = () => {
    document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-12 pb-20 px-4 text-center overflow-hidden">
      {/* Decorative Floating Elements - Ocultos em telas muito pequenas para limpar a visão */}
      <div className="absolute top-10 left-10 text-4xl md:text-6xl animate-bounce hidden sm:block opacity-60 md:opacity-100">🎷</div>
      <div className="absolute top-20 right-20 text-3xl md:text-5xl animate-pulse hidden sm:block opacity-60 md:opacity-100">💫</div>
      <div className="absolute bottom-40 left-20 text-4xl md:text-6xl rotate-12 hidden lg:block">🥁</div>
      <div className="absolute bottom-20 right-10 text-4xl md:text-6xl -rotate-12 hidden lg:block">✨</div>
      
      <div className="brutalist-card bg-white/95 p-4 sm:p-8 md:p-12 transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative border-[#005C53] max-w-full">
        <div className="absolute -top-5 -right-3 md:-top-12 md:-right-12 bg-[#D12E4B] text-white font-display px-3 py-1 md:px-6 md:py-2 border-2 md:border-4 border-[#005C53] rotate-12 text-xs md:text-2xl z-10 shadow-[2px_2px_0px_0px_#005C53] md:shadow-[4px_4px_0px_0px_#005C53]">
          PRÉ-CARNAVAL!
        </div>
        
        {/* Tipografia responsiva ajustada: text-4xl para telas muito pequenas, text-6xl tablet, text-8xl+ desktop */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-4 md:mb-6 flex flex-col items-center tracking-tighter">
          <span className="text-[#005C53]">QUEIMEI</span>
          <span className="text-[#D12E4B]">A LARGADA</span>
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-2 md:gap-4 justify-center items-center font-bold text-sm md:text-2xl mt-4 md:mt-8 w-full">
          <div className="flex items-center gap-2 bg-[#005C53] text-white px-4 py-2 md:px-6 md:py-3 border-2 border-black w-full sm:w-auto justify-center">
            <Calendar size={18} className="md:w-6 md:h-6" />
            <span>07.FEV • SÁBADO</span>
          </div>
          <div className="flex items-center gap-2 bg-[#FF9E1B] text-[#005C53] px-4 py-2 md:px-6 md:py-3 border-2 border-black w-full sm:w-auto justify-center">
            <Clock size={18} className="md:w-6 md:h-6" />
            <span>20H ATÉ 6H</span>
          </div>
        </div>
      </div>

      <div className="mt-8 md:mt-16 flex flex-col items-center w-full max-w-md">
        <button 
          onClick={scrollToTickets}
          className="brutalist-button w-full sm:w-auto animate-pulse-brutal bg-[#005C53] text-white px-8 py-4 md:px-10 md:py-8 rounded-none font-display text-xl md:text-3xl flex items-center justify-center gap-3 md:gap-4 hover:bg-[#D12E4B] transition-all group"
        >
          <Ticket size={24} className="md:w-8 md:h-8 group-hover:rotate-12 transition-transform" />
          GARANTIR VAGA
        </button>
        <p className="mt-4 md:mt-6 font-display text-xs md:text-base uppercase tracking-widest text-[#005C53] bg-white/60 px-4 py-2 border-2 border-[#005C53] border-dashed">
          Venha queimar a largada com a gente! 💫
        </p>
      </div>

      {/* Seta indicativa de scroll */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce text-[#005C53]">
        <ChevronDown size={40} strokeWidth={3} />
      </div>

      {/* Background patterns */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #005C53 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}>
      </div>
    </section>
  );
};

export default Hero;
