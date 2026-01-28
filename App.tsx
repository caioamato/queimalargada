
import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Lineup from './components/Lineup';
import CoolerCalculator from './components/CoolerCalculator';
import Location from './components/Location';
import Tickets from './components/Tickets';
import Countdown from './components/Countdown';
import FooterGame from './components/FooterGame';

export type LoteType = 'LOTE_1' | 'LOTE_2' | 'NO_DIA';

const App: React.FC = () => {
  const [loteStatus, setLoteStatus] = useState<LoteType>('LOTE_1');
  const [currentPrice, setCurrentPrice] = useState(20);

  useEffect(() => {
    const viradaLote = new Date('2026-02-01T00:00:00').getTime();
    const diaFesta = new Date('2026-02-07T00:00:00').getTime();
    
    const checkLote = () => {
      const now = new Date().getTime();
      
      if (now >= diaFesta) {
        setLoteStatus('NO_DIA');
        setCurrentPrice(30);
      } else if (now >= viradaLote) {
        setLoteStatus('LOTE_2');
        setCurrentPrice(25);
      } else {
        setLoteStatus('LOTE_1');
        setCurrentPrice(20);
      }
    };

    checkLote();
    const interval = setInterval(checkLote, 10000); // Re-check every 10 seconds

    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((reveal) => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;
        if (revealTop < windowHeight - revealPoint) {
          reveal.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FF66C4] text-[#005C53] overflow-x-hidden selection:bg-[#D12E4B] selection:text-white">
      <Hero />
      
      {/* Container aumentado para max-w-7xl para melhor layout desktop */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-20 space-y-12 md:space-y-24">
        
        {/* Intro Manifesto Section - Centralizado e contido para leitura */}
        <section className="reveal text-center mt-8 md:mt-0 max-w-4xl mx-auto">
          <div className="brutalist-card bg-white/95 p-5 md:p-12 border-[4px] md:border-[6px] border-[#005C53] shadow-[6px_6px_0px_0px_#D12E4B] md:shadow-[8px_8px_0px_0px_#D12E4B]">
            <p className="font-display text-xl sm:text-3xl md:text-5xl text-[#005C53] leading-[1.1] mb-4 md:mb-6 uppercase">
              O PRÉ-CARNAVAL QUE VOCÊ NÃO VAI LEMBRAR, MAS JAMAIS VAI ESQUECER! 🏁
            </p>
            <div className="inline-block bg-[#D12E4B] text-white px-4 py-1 md:px-6 md:py-2 transform -rotate-2">
                <p className="font-bold text-sm sm:text-lg md:text-2xl tracking-widest uppercase">
                Sítio Praia • 07 Fev • 10h de Folia
                </p>
            </div>
          </div>
        </section>

        <section id="lineup" className="reveal">
          <Lineup />
        </section>

        {/* Countdown contido para não esticar demais */}
        <section id="countdown" className="reveal max-w-5xl mx-auto">
          <Countdown loteStatus={loteStatus} />
        </section>

        <section id="calculator" className="reveal">
          <CoolerCalculator />
        </section>

        <section id="location" className="reveal">
          <Location />
        </section>

        <section id="tickets" className="reveal">
          <Tickets price={currentPrice} loteStatus={loteStatus} />
        </section>
      </main>

      <footer className="bg-[#005C53] text-white pt-12 md:pt-16 pb-8 px-4 text-center font-bold border-t-8 border-[#FF9E1B]">
        {/* Mini Game Section */}
        <div className="mb-8 md:mb-12 max-w-4xl mx-auto">
          <p className="font-display text-[#FF9E1B] text-xs md:text-sm uppercase tracking-widest mb-4">Treine sua resistência 🏃‍♀️💨</p>
          <FooterGame />
        </div>

        <div className="text-4xl md:text-5xl mb-4 md:mb-6 animate-bounce">🥁✨</div>
        <p className="font-display text-2xl md:text-5xl mb-1 md:mb-2 text-[#FF9E1B]">QUEIMEI A LARGADA</p>
        <p className="text-[#FF66C4] font-display text-base md:text-xl mb-6 md:mb-8 tracking-[0.3em] md:tracking-[0.5em] uppercase">Edição 2026</p>
        <div className="h-1 md:h-2 w-16 md:w-24 bg-white mx-auto mb-6 md:mb-8"></div>
        <p className="text-xs md:text-base opacity-60 max-w-md mx-auto leading-relaxed px-4">
          Evento destinado a maiores de 18 anos. Beba com inteligência. Se dirigir, não beba. Não seja babaca Respeite as minas!
        </p>
      </footer>
    </div>
  );
};

export default App;
