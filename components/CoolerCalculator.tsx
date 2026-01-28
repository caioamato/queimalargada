
import React, { useState, useMemo } from 'react';
import { Beer, Droplets, Zap, GlassWater, Refrigerator, Info, Check, Sparkles } from 'lucide-react';

type DrinkType = 'Cerveja' | 'Destilados' | 'Água';
type VibeType = 'Moderado' | 'Inimigo do Fim';

const CoolerCalculator: React.FC = () => {
  const [selectedDrinks, setSelectedDrinks] = useState<DrinkType[]>(['Cerveja', 'Água']);
  const [vibe, setVibe] = useState<VibeType>('Moderado');

  const toggleDrink = (drink: DrinkType) => {
    setSelectedDrinks((prev) =>
      prev.includes(drink) 
        ? prev.filter((d) => d !== drink) 
        : [...prev, drink]
    );
  };

  const calculation = useMemo(() => {
    let result = {
      beer: 0,
      spirits: "",
      mixers: "",
      water: 2,
      ice: 3,
      comment: "",
      isWaterOnly: selectedDrinks.length === 1 && selectedDrinks[0] === 'Água'
    };

    const isLegend = vibe === 'Inimigo do Fim';

    // Beer Logic
    if (selectedDrinks.includes('Cerveja')) {
      result.beer = isLegend ? 24 : 12;
      result.water += Math.ceil(result.beer / 3);
      result.ice += isLegend ? 2 : 0;
    }

    // Spirits Logic
    if (selectedDrinks.includes('Destilados')) {
      result.spirits = isLegend ? "1 Garrafa" : "1/2 Garrafa";
      result.mixers = "2L Energético/Tônica";
      result.ice += isLegend ? 3 : 1;
      result.water += isLegend ? 3 : 1;
    }

    // Fixed Ice Logic for Vibe
    if (isLegend) {
        result.ice = Math.max(result.ice, 6);
    }

    // Dynamic Comments
    if (result.isWaterOnly) {
      result.comment = "MVP DA FESTA! 🏅 Motorista da rodada ou fitness? O importante é que você vai lembrar de tudo amanhã.";
    } else if (isLegend) {
      result.comment = "MODO LENDA ATIVADO 🚀 Calculamos gelo extra para durar até o nascer do sol. Hidrate-se entre os goles!";
    } else {
      result.comment = "NA MEDIDA CERTA 👌 Você vai curtir a música, beber de boa e voltar pra casa com dignidade.";
    }

    return result;
  }, [selectedDrinks, vibe]);

  return (
    <div className="w-full bg-[#005C53] text-white py-8 md:py-20 relative overflow-hidden border-t-4 border-b-4 border-[#FF66C4]">
      {/* Elemento decorativo de fundo */}
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transform rotate-12">
        <Refrigerator size={200} className="md:w-[400px] md:h-[400px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* --- COLUNA ESQUERDA: PAINEL DE CONTROLE (7 colunas) --- */}
          <div className="lg:col-span-7 space-y-8 md:space-y-12">
            
            {/* Header com Hierarquia Forte */}
            <div className="space-y-2 md:space-y-4">
              <h2 className="font-display text-4xl sm:text-5xl md:text-7xl leading-[0.9] uppercase tracking-tighter">
                <span className="text-[#FF9E1B] block">Calculadora</span>
                <span className="text-[#FF66C4] block">De Cooler</span>
              </h2>
              <p className="font-bold text-white/70 text-sm md:text-lg max-w-md border-l-4 border-[#FF66C4] pl-4 py-1">
                A festa tem 10 horas de duração (20h às 06h). Planeje seu estoque para não queimar a largada!
              </p>
            </div>

            {/* Input 1: Bebidas */}
            <div className="space-y-4 md:space-y-6">
              <label className="flex items-center gap-2 md:gap-3 font-display text-lg md:text-xl uppercase text-[#FF66C4] tracking-widest">
                <span className="bg-[#FF66C4] text-[#005C53] w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-sm text-sm md:text-lg">1</span>
                O que você bebe?
              </label>
              
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {(['Cerveja', 'Destilados', 'Água'] as DrinkType[]).map((drink) => {
                  const isSelected = selectedDrinks.includes(drink);
                  
                  return (
                    <button
                      key={drink}
                      onClick={() => toggleDrink(drink)}
                      className={`
                        group relative flex flex-col items-center justify-center gap-2 md:gap-3 py-4 px-2 md:py-6 md:px-4 border-4 transition-all duration-200
                        ${isSelected 
                          ? 'bg-white border-white -translate-y-1 md:-translate-y-2 shadow-[4px_4px_0px_0px_#FF66C4] md:shadow-[8px_8px_0px_0px_#FF66C4] z-10' 
                          : 'bg-transparent border-[#005C53] border-opacity-40 hover:border-white/50 text-white/50 hover:text-white'
                        }
                      `}
                    >
                      <div className={isSelected ? 'text-[#005C53]' : 'text-current'}>
                        {drink === 'Cerveja' && <Beer className="w-6 h-6 md:w-8 md:h-8" />}
                        {drink === 'Destilados' && <GlassWater className="w-6 h-6 md:w-8 md:h-8" />}
                        {drink === 'Água' && <Droplets className="w-6 h-6 md:w-8 md:h-8" />}
                      </div>
                      <span className={`font-display text-xs md:text-lg uppercase tracking-wide ${isSelected ? 'text-[#005C53]' : 'text-current'}`}>
                        {drink}
                      </span>
                      
                      {isSelected && (
                        <div className="absolute top-1 right-1 md:top-2 md:right-2 text-[#FF66C4]">
                          <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={4} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input 2: Vibe */}
            <div className="space-y-4 md:space-y-6">
              <label className="flex items-center gap-2 md:gap-3 font-display text-lg md:text-xl uppercase text-[#FF66C4] tracking-widest">
                <span className="bg-[#FF66C4] text-[#005C53] w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-sm text-sm md:text-lg">2</span>
                Qual a sua vibe?
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                {(['Moderado', 'Inimigo do Fim'] as VibeType[]).map((level) => {
                   const isSelected = vibe === level;
                   return (
                    <button
                      key={level}
                      onClick={() => setVibe(level)}
                      className={`
                        flex items-center justify-center py-4 px-4 md:py-5 md:px-6 border-4 font-display uppercase tracking-wider text-sm md:text-base transition-all
                        ${isSelected
                          ? 'bg-[#FF9E1B] text-[#005C53] border-[#FF9E1B] shadow-[4px_4px_0px_0px_#005C53] md:shadow-[6px_6px_0px_0px_#005C53] translate-x-1 translate-y-1 md:translate-x-0 md:translate-y-0'
                          : 'bg-transparent text-white border-white/20 hover:border-white/60'
                        }
                      `}
                    >
                      {level === 'Inimigo do Fim' && <Zap size={18} className="mr-2 fill-current md:w-5 md:h-5" />}
                      {level}
                    </button>
                   )
                })}
              </div>
            </div>
          </div>

          {/* --- COLUNA DIREITA: PAINEL DE RESULTADO (5 colunas) --- */}
          {/* Sticky Wrapper */}
          <div className="lg:col-span-5 relative h-full">
            <div className="lg:sticky lg:top-32 transition-all duration-300">
              
              {/* O "Ticket" de Resultado */}
              <div className="bg-white text-[#005C53] p-6 md:p-8 border-4 border-[#005C53] shadow-[8px_8px_0px_0px_#FF9E1B] md:shadow-[12px_12px_0px_0px_#FF9E1B] relative">
                
                {/* Header do Ticket */}
                <div className="flex justify-between items-start mb-6 border-b-4 border-dashed border-[#005C53]/20 pb-4">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl uppercase leading-none mb-1">Seu Cooler</h3>
                    <p className="text-xs md:text-sm font-bold opacity-60 uppercase tracking-widest">Lista Sugerida</p>
                  </div>
                  <Sparkles className="text-[#FF66C4] w-6 h-6 md:w-8 md:h-8" />
                </div>

                {/* Lista de Itens */}
                <ul className="space-y-4 md:space-y-5 mb-6 md:mb-8">
                  {selectedDrinks.includes('Cerveja') && (
                    <li className="flex justify-between items-end group">
                      <div className="flex items-center gap-2 md:gap-3">
                        <Beer className="text-[#FF9E1B] w-5 h-5 md:w-6 md:h-6" />
                        <span className="font-bold text-base md:text-lg">Cerveja</span>
                      </div>
                      <div className="flex-1 border-b-2 border-dashed border-[#005C53]/20 mx-2 md:mx-3 mb-1 opacity-30"></div>
                      <span className="font-display text-xl md:text-2xl text-[#D12E4B]">{calculation.beer} <span className="text-xs md:text-sm text-[#005C53]">latas</span></span>
                    </li>
                  )}
                  
                  {selectedDrinks.includes('Destilados') && (
                    <>
                      <li className="flex justify-between items-end">
                        <div className="flex items-center gap-2 md:gap-3">
                          <GlassWater className="text-[#FF9E1B] w-5 h-5 md:w-6 md:h-6" />
                          <span className="font-bold text-base md:text-lg">Destilado</span>
                        </div>
                        <div className="flex-1 border-b-2 border-dashed border-[#005C53]/20 mx-2 md:mx-3 mb-1 opacity-30"></div>
                        <span className="font-display text-lg md:text-xl text-[#D12E4B]">{calculation.spirits}</span>
                      </li>
                      <li className="flex justify-between items-end">
                        <div className="flex items-center gap-2 pl-2 opacity-70">
                          <span className="font-bold text-xs md:text-sm uppercase">↳ Mixer</span>
                        </div>
                        <div className="flex-1 border-b-2 border-dashed border-[#005C53]/20 mx-2 md:mx-3 mb-1 opacity-30"></div>
                        <span className="font-bold text-xs md:text-sm text-[#005C53] uppercase">{calculation.mixers}</span>
                      </li>
                    </>
                  )}

                  <li className="flex justify-between items-end">
                    <div className="flex items-center gap-2 md:gap-3">
                      <Droplets className="text-[#FF9E1B] w-5 h-5 md:w-6 md:h-6" />
                      <span className="font-bold text-base md:text-lg">Água</span>
                    </div>
                    <div className="flex-1 border-b-2 border-dashed border-[#005C53]/20 mx-2 md:mx-3 mb-1 opacity-30"></div>
                    <span className="font-display text-xl md:text-2xl text-[#D12E4B]">{calculation.water} <span className="text-xs md:text-sm text-[#005C53]">garrafas</span></span>
                  </li>

                  <li className="pt-3 md:pt-4 mt-3 md:mt-4 border-t-4 border-dashed border-[#005C53]/10">
                    <div className="flex justify-between items-end">
                        <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-xl md:text-2xl">🧊</span>
                        <span className="font-bold text-base md:text-lg uppercase tracking-wider">Gelo</span>
                        </div>
                        <div className="flex-1 border-b-2 border-dashed border-[#005C53]/20 mx-2 md:mx-3 mb-1 opacity-30"></div>
                        <span className="font-display text-2xl md:text-3xl text-[#005C53]">{calculation.ice}kg</span>
                    </div>
                  </li>
                </ul>

                {/* Warning Box */}
                <div className={`
                  p-3 md:p-4 border-l-4 text-xs md:text-sm font-bold leading-relaxed
                  ${vibe === 'Inimigo do Fim' 
                    ? 'bg-[#FFF3CD] text-[#856404] border-[#FF9E1B]' 
                    : 'bg-[#005C53]/5 text-[#005C53] border-[#005C53]'
                  }
                `}>
                  <div className="flex gap-2 mb-1">
                    <Info size={14} className="shrink-0 mt-0.5" />
                    <span className="uppercase font-display tracking-wide text-[10px] md:text-xs">Dica do Experiente:</span>
                  </div>
                  {calculation.comment}
                </div>

                {/* Decorative Holes for Ticket Effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#005C53] rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CoolerCalculator;
