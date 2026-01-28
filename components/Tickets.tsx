
import React, { useState, useEffect, useMemo } from 'react';
import { Copy, CheckCircle2, Plus, Minus, Send, Users } from 'lucide-react';
import { LoteType } from '../App';
import qecodeImg from '../assets/qecode.png';

// --- CONFIGURAÇÃO ---
const WHATSAPP_NUMBER = "5548991861568"; // Configure o número aqui (DDI + DDD + Número)
const CHAVE_PIX = "48991861568"; // Chave para o payload dinâmico
const NOME_BENEFICIARIO = "Caio Amato";
const CIDADE_BENEFICIARIO = "Floripa";

interface TicketsProps {
  price: number;
  loteStatus: LoteType;
}

const Tickets: React.FC<TicketsProps> = ({ price, loteStatus }) => {
  const [copied, setCopied] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [guestNames, setGuestNames] = useState<string[]>(['']);

  const totalPrice = price * quantity;

  // Sincroniza o array de nomes com a quantidade selecionada
  useEffect(() => {
    setGuestNames(prev => {
      const updated = [...prev];
      if (quantity > prev.length) {
        for (let i = prev.length; i < quantity; i++) updated.push('');
      } else {
        updated.splice(quantity);
      }
      return updated;
    });
  }, [quantity]);

  const handleNameChange = (index: number, value: string) => {
    const updated = [...guestNames];
    updated[index] = value;
    setGuestNames(updated);
  };

  const isFormValid = guestNames.every(name => name.trim().length >= 3);

  const getTicketTheme = () => {
    switch (loteStatus) {
      case 'NO_DIA': return { label: "ÚLTIMA CHAMADA", color: "bg-red-600", desc: "INGRESSO NO DIA" };
      case 'LOTE_2': return { label: "2º LOTE ATIVO", color: "bg-[#FF9E1B]", desc: "ANTECIPADO LOTE 2" };
      default: return { label: "LOTE 1 ATIVO", color: "bg-[#D12E4B]", desc: "ANTECIPADO PROMOCIONAL" };
    }
  };

  const theme = getTicketTheme();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CHAVE_PIX);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateWhatsAppUrl = () => {
    const namesList = guestNames.map((n, i) => `${i + 1}. ${n}`).join('%0A');
    const message = `Olá! Acabei de fazer o PIX para o Queimei a Largada! 🥁%0A%0A` +
                    `*DETALHES DO PEDIDO:*%0A` +
                    `• Qtd: ${quantity} ingresso(s)%0A` +
                    `• Valor Total: R$ ${totalPrice},00%0A%0A` +
                    `*NOMES PARA A LISTA:*%0A${namesList}%0A%0A` +
                    `Estou enviando o comprovante em anexo! ✅`;
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  return (
    <div className="brutalist-card bg-white/95 p-4 sm:p-8 md:p-12 relative overflow-hidden border-[#005C53] border-[4px] md:border-[6px]">
      <div className="absolute -right-10 -top-10 text-[100px] md:text-[200px] font-display text-[#005C53] opacity-5 pointer-events-none select-none">
        PIX
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 md:space-y-10">
        {/* Header de Preço Total */}
        <div className="space-y-4 w-full">
          <div className={`inline-flex items-center gap-2 ${theme.color} text-white font-display px-4 py-1 md:px-6 md:py-2 text-xs md:text-xl tracking-widest rotate-1 border-2 border-[#005C53]`}>
             <span className="animate-pulse">🔥</span> {theme.label}
          </div>
          
          <div className="flex flex-col items-center">
            <h2 className="font-display text-5xl sm:text-7xl md:text-9xl text-[#005C53] leading-none">
              R${totalPrice}
            </h2>
            <p className="font-bold text-sm md:text-2xl uppercase tracking-tighter mt-2 text-[#D12E4B]">
              {quantity} {quantity === 1 ? 'Ingresso' : 'Ingressos'} - {theme.desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Seletor de Quantidade e Nomes */}
          <div className="space-y-6 text-left order-2 lg:order-1">
            <div className="brutalist-card bg-[#FF9E1B] p-4 md:p-6 border-4 border-[#005C53] shadow-[4px_4px_0px_0px_#005C53] md:shadow-[6px_6px_0px_0px_#005C53]">
              <label className="font-display text-xs md:text-sm text-[#005C53] uppercase mb-2 md:mb-4 block tracking-wider">1. Quantos Ingressos?</label>
              <div className="flex items-center justify-between bg-white border-4 border-[#005C53] p-2">
                <button 
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="bg-[#D12E4B] text-white w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border-2 border-[#005C53] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform active:translate-x-1 active:translate-y-1 touch-manipulation"
                >
                  <Minus size={20} className="md:w-6 md:h-6" />
                </button>
                <span className="font-display text-3xl md:text-5xl text-[#005C53]">{quantity}</span>
                <button 
                  onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                  className="bg-[#005C53] text-white w-10 h-10 md:w-14 md:h-14 flex items-center justify-center border-2 border-[#005C53] hover:translate-x-0.5 hover:translate-y-0.5 transition-transform active:translate-x-1 active:translate-y-1 touch-manipulation"
                >
                  <Plus size={20} className="md:w-6 md:h-6" />
                </button>
              </div>
            </div>

            {/* Alerta de Instruções */}
            <div className="brutalist-card bg-[#FFF3CD] p-4 md:p-6 border-4 border-[#FF9E1B] shadow-[4px_4px_0px_0px_#005C53] md:shadow-[6px_6px_0px_0px_#005C53] animate-pulse-brutal">
              <p className="text-[#005C53] text-sm md:text-base font-bold leading-tight">
                Bora garantir o ingresso? Preencha os nomes da galera com atenção e clique no botão do Zap! 
                <span className="block mt-2 text-[#D12E4B] uppercase font-black">
                  Agora com os nomes confirmados e a conversa aberta no whats, faça o pix e mande o comprovante na mesma conversa, assim já começa a contagem regressiva! 🎉
                </span>
              </p>
            </div>

            <div className="brutalist-card bg-white p-4 md:p-6 border-4 border-[#005C53] shadow-[4px_4px_0px_0px_#FF66C4] md:shadow-[6px_6px_0px_0px_#FF66C4]">
              <label className="font-display text-xs md:text-sm text-[#005C53] uppercase mb-2 md:mb-4 flex items-center gap-2 tracking-wider">
                <Users size={16} /> 2. Lista de Nomes
              </label>
              {/* Max-height reduzido em mobile para não cobrir tudo quando o teclado abre */}
              <div className="space-y-3 max-h-[200px] md:max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {guestNames.map((name, index) => (
                  <input
                    key={index}
                    type="text"
                    autoCapitalize="words"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`Nome completo convidado ${index + 1}`}
                    className="w-full bg-[#005C53]/5 border-2 border-[#005C53] p-3 md:p-4 font-bold text-[#005C53] text-sm md:text-base focus:outline-none focus:bg-[#FF9E1B]/10 placeholder:text-[#005C53]/40 rounded-none"
                  />
                ))}
              </div>
              {!isFormValid && (
                <p className="text-[10px] text-[#D12E4B] font-black mt-2 uppercase">* Preencha todos os nomes (mín. 3 letras)</p>
              )}
            </div>
          </div>

          {/* Checkout (QR Code e Copia e Cola) */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="bg-white border-4 border-[#005C53] p-4 md:p-6 space-y-4 md:space-y-6 shadow-[6px_6px_0px_0px_#005C53] md:shadow-[8px_8px_0px_0px_#005C53]">
              <div className="flex flex-col items-center gap-4">
                 <div className="bg-[#005C53]/5 p-2 border-2 border-[#005C53] relative">
                    <img 
                      src={qecodeImg} 
                      alt="QR Code PIX" 
                      className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] object-cover"
                    />
                 </div>
                 <p className="text-[10px] md:text-xs font-bold text-[#005C53] px-4 bg-[#FF9E1B] border border-[#005C53] py-1 uppercase text-center">
                    Escaneie ou copie o código abaixo
                 </p>
              </div>

              <div className="space-y-2 text-left">
                <label className="font-display text-[10px] text-[#005C53] uppercase">CHAVE PIX (CELULAR):</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={CHAVE_PIX}
                    className="flex-1 bg-[#005C53]/5 border-2 border-[#005C53] p-2 md:p-3 font-bold text-[#005C53] text-[10px] overflow-hidden text-ellipsis whitespace-nowrap rounded-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className={`brutalist-button px-3 md:px-4 flex items-center justify-center transition-all ${
                      copied ? 'bg-green-600 border-green-700' : 'bg-[#D12E4B]'
                    }`}
                  >
                    {copied ? <CheckCircle2 className="text-white" size={18} /> : <Copy className="text-white" size={18} />}
                  </button>
                </div>
                {copied && <p className="text-green-600 font-bold text-[10px] text-center uppercase mt-1 animate-bounce">Copiado com sucesso!</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Envio para o WhatsApp */}
        <div className="w-full pt-2 md:pt-4 order-3">
          <a
            href={isFormValid ? generateWhatsAppUrl() : '#'}
            target={isFormValid ? "_blank" : undefined}
            rel="noopener noreferrer"
            className={`brutalist-button w-full py-5 md:py-6 flex flex-col items-center justify-center gap-1 transition-all group ${
              isFormValid 
                ? 'bg-[#FF9E1B] text-[#005C53] cursor-pointer hover:bg-[#005C53] hover:text-white shadow-[6px_6px_0px_0px_#005C53] md:shadow-[8px_8px_0px_0px_#005C53]' 
                : 'bg-gray-200 text-gray-400 border-gray-400 cursor-not-allowed grayscale'
            }`}
            onClick={(e) => !isFormValid && e.preventDefault()}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <Send size={20} className={isFormValid ? "group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform md:w-6 md:h-6" : "md:w-6 md:h-6"} />
              <span className="font-display text-lg md:text-3xl uppercase tracking-tighter">
                ENVIAR COMPROVANTE
              </span>
            </div>
            <span className="text-[10px] md:text-xs font-black opacity-70 uppercase px-4 text-center">
              {isFormValid ? "Finalize enviando no WhatsApp!" : "Preencha os nomes acima para liberar"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
