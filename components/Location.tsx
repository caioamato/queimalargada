
import React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import sitioImg from '../assets/sitio.png';

const Location: React.FC = () => {
  const mapsUrl = "https://maps.app.goo.gl/XmVBhZb6YqsMJhyK7?g_st=iw";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div className="space-y-4 md:space-y-6">
        <div className="flex items-center gap-3 md:gap-4">
          <h2 className="font-display text-3xl md:text-6xl text-[#005C53]">LOCAL</h2>
          <div className="flex-1 h-2 bg-[#005C53]"></div>
        </div>
        <div className="brutalist-card bg-white/95 p-4 md:p-6 space-y-3 md:space-y-4 border-[#005C53]">
          <div className="flex items-start gap-3">
            <MapPin className="text-[#D12E4B] shrink-0 w-8 h-8 md:w-8 md:h-8" />
            <div>
              <h3 className="font-display text-xl md:text-2xl text-[#005C53]">SÍTIO PRAIA</h3>
              <p className="font-bold text-sm md:text-base text-[#005C53]/70">Costa de Dentro, Florianópolis</p>
            </div>
          </div>
          <p className="font-bold text-base md:text-lg border-l-4 border-[#FF9E1B] pl-4 text-[#005C53]">
            Rod. Rozália Paulina Ferreira, 3070
          </p>
          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="brutalist-button w-full bg-[#005C53] text-white py-3 md:py-4 font-display flex items-center justify-center gap-2 hover:bg-[#D12E4B] transition-all text-sm md:text-base"
          >
            ABRIR NO GOOGLE MAPS
            <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <div className="brutalist-card bg-[#FF9E1B] aspect-video md:aspect-square relative overflow-hidden border-[#005C53] flex items-center justify-center group cursor-pointer" 
           onClick={() => window.open(mapsUrl, '_blank')}>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10"></div>
        <img 
          src={sitioImg} 
          alt="Vista do Local" 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-white text-[#005C53] font-display px-4 py-2 md:px-6 md:py-3 border-4 border-[#005C53] -rotate-6 group-hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_#D12E4B] text-sm md:text-base">
            VER NO MAPA
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
