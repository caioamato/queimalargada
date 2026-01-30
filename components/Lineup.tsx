
import React from 'react';
import { Music, Radio, Zap, Headphones, Ghost, Instagram, Clock } from 'lucide-react';

const Lineup: React.FC = () => {
  const schedule = [
    { time: '20:00', event: 'ABERTURA DA CASA', type: 'info' },
    { time: '22:00', end: '23:00', event: 'DJ SAUL', link: 'https://www.instagram.com/saulsmith.art?igsh=MWpqcjBydGx6eXFodw==', type: 'dj' },
    { time: '23:00', end: '00:15', event: 'TATU E A TOCA', link: 'https://www.instagram.com/tatueatoca?igsh=ajN3a3oxbXF0N2Zt', type: 'band' },
    { time: '00:15', end: '01:00', event: 'DJ ANDREI', link: 'https://www.instagram.com/andreisarmento?igsh=MWM2Y24zazZzam5lcg==', type: 'dj' },
    { time: '01:00', end: '02:15', event: 'DU DE CANÁRIO', link: 'https://www.instagram.com/dudecanariooficial?igsh=MXA3MTE2amVybGJscA==', type: 'band' },
    { time: '02:15', end: '03:00', event: 'DJS ANDREI E SAUL', type: 'dj' },
    { time: '03:00', end: '06:00', event: 'JAM, RODA ABERTA & XEPA', sub: 'Com todos os músicos e convidados', type: 'jam' },
  ];

  return (
    <div className="space-y-8 md:space-y-16 px-2 md:px-0">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 px-2 md:px-0">
        <h2 className="font-display text-3xl md:text-6xl lg:text-7xl text-[#005C53] uppercase tracking-tighter leading-tight">
          LINE-UP <span className="text-[#D12E4B]">⚡</span>
        </h2>
        <div className="flex-1 h-2 md:h-3 bg-[#005C53] hidden md:block"></div>
      </div>

      {/* DESTAQUES BANDAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        
        {/* Banda 01: Tatu e a Toca */}
        <div className="brutalist-card bg-white p-4 md:p-6 relative overflow-hidden flex flex-col border-[#005C53] shadow-[6px_6px_0px_0px_#005C53] md:shadow-[12px_12px_0px_0px_#005C53]">
          <div className="absolute -right-8 -top-4 bg-[#D12E4B] text-white font-display px-6 py-2 rotate-12 border-4 border-[#005C53] z-20 text-[10px] md:text-sm">
            23:00H
          </div>
          
          <div className="mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              <Radio className="text-[#D12E4B]" size={20} />
              <span className="font-display text-xs md:text-lg text-[#005C53]/60 uppercase tracking-widest">23:00 às 00:15</span>
            </div>
            <h3 className="font-display text-2xl md:text-4xl text-[#005C53] mb-2 uppercase leading-none">TATU E A TOCA</h3>
            <p className="font-bold text-sm md:text-lg text-[#005C53]/80 italic border-l-4 border-[#FF66C4] pl-3 mb-4">
              O puro suco do axé e do samba para suar a camisa.
            </p>
            <a href="https://www.instagram.com/tatueatoca?igsh=ajN3a3oxbXF0N2Zt" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#D12E4B] hover:underline uppercase">
              <Instagram size={16} /> Ver no Instagram
            </a>
          </div>

          <div className="mt-auto">
            <div className="border-4 border-[#005C53] rounded-xl overflow-hidden bg-black mb-4">
              <iframe 
                style={{ borderRadius: '0px' }} 
                src="https://open.spotify.com/embed/album/2TIkpkB97Qf23GuwRCxORq?utm_source=generator" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify - Tatu e a Toca"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Banda 02: Du de Canário */}
        <div className="brutalist-card bg-[#005C53] p-4 md:p-6 relative overflow-hidden flex flex-col border-[#005C53] shadow-[6px_6px_0px_0px_#FF9E1B] md:shadow-[12px_12px_0px_0px_#FF9E1B]">
          <div className="absolute -right-8 -top-4 bg-[#FF9E1B] text-[#005C53] font-display px-6 py-2 rotate-12 border-4 border-[#005C53] z-20 text-[10px] md:text-sm">
            01:00H
          </div>

          <div className="mb-4 md:mb-6">
            <div className="flex items-center gap-2 md:gap-3 mb-2 text-white">
              <Music className="text-[#FF9E1B]" size={20} />
              <span className="font-display text-xs md:text-lg opacity-60 uppercase tracking-widest text-white">01:00 às 02:15</span>
            </div>
            <h3 className="font-display text-2xl md:text-4xl text-[#FF9E1B] mb-2 uppercase leading-none">DU DE CANÁRIO</h3>
            <p className="font-bold text-sm md:text-lg text-white/80 italic border-l-4 border-[#D12E4B] pl-3 mb-4">
              Brasileiridades e clássicos para cantar junto até o sol nascer.
            </p>
            <a href="https://www.instagram.com/dudecanariooficial?igsh=MXA3MTE2amVybGJscA==" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-white hover:text-[#FF9E1B] hover:underline uppercase transition-colors">
              <Instagram size={16} /> Ver no Instagram
            </a>
          </div>

          <div className="mt-auto">
            <div className="border-4 border-[#FF9E1B] rounded-xl overflow-hidden bg-black mb-4">
              <iframe 
                style={{ borderRadius: '0px' }} 
                src="https://open.spotify.com/embed/artist/00MkbvKdzPD3NzL09N6ihh?utm_source=generator" 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen={true} 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                title="Spotify - Du de Canário"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* CRONOGRAMA COMPLETO */}
      <div className="brutalist-card bg-white p-4 md:p-8 border-[#005C53] shadow-[8px_8px_0px_0px_#D12E4B] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none">
             <Clock size={200} />
        </div>
        
        <h3 className="font-display text-2xl md:text-4xl text-[#005C53] mb-6 md:mb-8 uppercase border-b-4 border-[#005C53] pb-2 inline-block">
            PROGRAMAÇÃO
        </h3>

        <div className="space-y-0 relative">
          {/* Linha vertical do tempo */}
          <div className="absolute left-[70px] md:left-[100px] top-4 bottom-4 w-1 md:w-2 bg-[#005C53]/10 hidden sm:block"></div>

          {schedule.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 py-3 md:py-4 border-b-2 border-dashed border-[#005C53]/20 last:border-0 relative hover:bg-[#005C53]/5 transition-colors group">
                
                {/* Horário */}
                <div className="min-w-[70px] md:min-w-[100px] text-right sm:pr-4">
                    <span className="font-display text-lg md:text-2xl text-[#D12E4B] block leading-none">{item.time}</span>
                    {item.end && <span className="text-xs font-bold text-[#005C53]/60">até {item.end}</span>}
                </div>

                {/* Marcador Timeline (Mobile Hidden) */}
                <div className="w-4 h-4 rounded-full border-4 border-[#005C53] bg-white z-10 hidden sm:block absolute left-[64px] md:left-[93px]"></div>

                {/* Detalhes */}
                <div className="flex-1 pl-2 sm:pl-0 border-l-4 border-[#D12E4B] sm:border-0 pl-3 sm:pl-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                        <div>
                            <span className={`font-display text-lg md:text-2xl uppercase leading-none ${item.type === 'jam' ? 'text-[#FF66C4]' : 'text-[#005C53]'}`}>
                                {item.event}
                            </span>
                            {item.sub && (
                                <p className="text-xs md:text-sm font-bold opacity-70 mt-1">{item.sub}</p>
                            )}
                        </div>
                        
                        {item.link && (
                            <a 
                                href={item.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#005C53] px-3 py-1 hover:bg-[#D12E4B] transition-colors w-fit border-2 border-transparent hover:border-[#005C53]"
                            >
                                <Instagram size={14} /> Insta
                            </a>
                        )}
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>

      {/* Extras Grid */}

        <div className="brutalist-card bg-[#D12E4B] text-white p-4 md:p-6 text-center font-display text-lg md:text-2xl sm:col-span-2 md:col-span-1 border-[#005C53] shadow-[4px_4px_0px_0px_#FF9E1B] md:shadow-[6px_6px_0px_0px_#FF9E1B] flex items-center justify-center uppercase tracking-tighter">
          🍹 VAI TER CHOPE VENDENDO E VAI SER OPEN COOLER 👀
        </div>
      </div>
    </div>
  );
};

export default Lineup;
