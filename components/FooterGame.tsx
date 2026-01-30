
import React, { useRef, useEffect, useState } from 'react';
import { Trophy, RefreshCw, Play, Beer as BeerIcon, Music, Clock, Sparkles } from 'lucide-react';

// --- CONFIGURAÇÕES GERAIS ---
const GAME_CONFIG = {
  GRAVITY: 0.6,
  JUMP_STRENGTH: -12,
  SPEED: 4,
  MAX_BEERS: 3, // Limite para dar PT
  VICTORY_TIME_SEC: 20, // Tempo para chegar na festa
  FPS: 60
};

const FooterGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<any>(null); // Armazena a instância da classe Game
  const requestRef = useRef<number>(0);
  
  // UI State (Sincronizado com a classe do jogo)
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER' | 'PASSED_OUT' | 'VICTORY'>('START');
  const [score, setScore] = useState(0); // Tempo decorrido (segundos)
  const [beers, setBeers] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // --- CLASSES DO JOGO ---

    class Entity {
      x: number;
      y: number;
      width: number;
      height: number;
      type: string;
      markedForDeletion: boolean = false;

      constructor(x: number, y: number, width: number, height: number, type: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
      }

      update(speed: number) {
        this.x -= speed;
        if (this.x + this.width < 0) this.markedForDeletion = true;
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Implementado nas subclasses ou gerenciador
      }
    }

    class Player {
      x: number;
      y: number;
      width: number = 30;
      height: number = 44; // Um pouco mais alta
      dy: number = 0;
      grounded: boolean = false;
      rotation: number = 0;
      runFrame: number = 0;

      constructor(groundY: number) {
        this.x = 50;
        this.y = groundY - this.height;
      }

      // Ajusta posição quando a tela redimensiona
      adjustPosition(newGroundY: number) {
        const diff = newGroundY - (this.y + this.height);
        // Se estava no chão (ou muito perto), gruda no novo chão
        if (this.grounded || Math.abs(diff) < 10) {
            this.y = newGroundY - this.height;
            this.dy = 0;
            this.grounded = true;
        } else {
            // Se estava no ar, mantém a posição relativa ou ajusta minimamente
            // Para simplificar, vamos deixar a física resolver no próximo update,
            // mas garantindo que não atravesse o chão
            if (this.y + this.height > newGroundY) {
                this.y = newGroundY - this.height;
            }
        }
      }

      update(groundY: number, inputJump: boolean, isPassedOut: boolean, isVictory: boolean) {
        // Física
        this.dy += GAME_CONFIG.GRAVITY;
        this.y += this.dy;

        // Chão
        if (this.y + this.height > groundY) {
          this.y = groundY - this.height;
          this.dy = 0;
          this.grounded = true;
        } else {
          this.grounded = false;
        }

        // Pulo
        if (inputJump && this.grounded && !isPassedOut && !isVictory) {
          this.dy = GAME_CONFIG.JUMP_STRENGTH;
          this.grounded = false;
        }

        // Animação Desmaio
        if (isPassedOut) {
           if (this.rotation > -90) this.rotation -= 5;
        } else if (isVictory) {
           this.rotation = 0; // Fica em pé curtindo
           this.runFrame++; // Dançando
           
           // Pulo de celebração aleatório
           if (this.grounded && Math.random() > 0.95) {
               this.dy = -5;
               this.grounded = false;
           }
        } else {
           this.rotation = 0;
           this.runFrame++;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        
        // Pivot para rotação (nos pés)
        const pivotX = this.x + this.width / 2;
        const pivotY = this.y + this.height;
        ctx.translate(pivotX, pivotY);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.translate(-pivotX, -pivotY);

        const x = this.x;
        const y = this.y;

        // Cores Pixel Art
        const cSkin = '#FFC0CB';
        const cHair = '#4A3728'; // Castanho
        const cTop = '#D12E4B'; // Vermelho Queimei a Largada
        const cShorts = '#005C53'; // Teal
        const cShoes = '#FF9E1B';

        // Animação de corrida (Frames)
        const frame = Math.floor(this.runFrame / 8) % 2; 

        // 1. Cabelo (Trás)
        ctx.fillStyle = cHair;
        ctx.fillRect(x - 4, y + 6, 12, 18);

        // 2. Pernas (Animadas)
        ctx.fillStyle = cSkin;
        if (!this.grounded) {
          // Pulo
          ctx.fillRect(x + 6, y + 30, 6, 10); // Esq
          ctx.fillRect(x + 18, y + 28, 6, 8); // Dir
          // Sapatos
          ctx.fillStyle = cShoes;
          ctx.fillRect(x + 6, y + 40, 8, 4);
          ctx.fillRect(x + 18, y + 36, 8, 4);
        } else if (frame === 0) {
          ctx.fillRect(x + 6, y + 32, 6, 12);
          ctx.fillRect(x + 18, y + 30, 6, 10);
          ctx.fillStyle = cShoes;
          ctx.fillRect(x + 6, y + 40, 8, 4);
          ctx.fillRect(x + 18, y + 40, 8, 4);
        } else {
          ctx.fillRect(x + 6, y + 30, 6, 10);
          ctx.fillRect(x + 18, y + 32, 6, 12);
          ctx.fillStyle = cShoes;
          ctx.fillRect(x + 6, y + 40, 8, 4);
          ctx.fillRect(x + 18, y + 40, 8, 4);
        }

        // 3. Shorts
        ctx.fillStyle = cShorts;
        ctx.fillRect(x + 4, y + 24, 22, 10);

        // 4. Tronco/Top
        ctx.fillStyle = cTop;
        ctx.fillRect(x + 5, y + 14, 20, 12);

        // 5. Cabeça
        ctx.fillStyle = cSkin;
        ctx.fillRect(x + 6, y, 18, 16);

        // 6. Cabelo (Frente)
        ctx.fillStyle = cHair;
        ctx.fillRect(x + 6, y, 18, 4); // Franja
        ctx.fillRect(x + 4, y + 4, 4, 8); // Lateral

        // 7. Braço (Balançando)
        ctx.fillStyle = cSkin;
        const armY = frame === 0 ? 0 : -2;
        ctx.fillRect(x + 12, y + 16 + armY, 6, 12);

        ctx.restore();
      }
    }

    class Game {
      width: number;
      height: number;
      groundY: number;
      player: Player;
      obstacles: Entity[] = [];
      clouds: any[] = [];
      
      state: 'START' | 'PLAYING' | 'GAME_OVER' | 'PASSED_OUT' | 'VICTORY' = 'START';
      frames: number = 0;
      seconds: number = 0;
      beerCount: number = 0;
      
      inputJump: boolean = false;
      speed: number = GAME_CONFIG.SPEED;
      
      // Cenário Final
      stage: Entity | null = null;

      constructor(w: number, h: number) {
        this.width = w;
        this.height = h;
        this.groundY = h - 10;
        this.player = new Player(this.groundY);
        this.initClouds();
      }

      // Método chamado quando a tela redimensiona
      resize(w: number, h: number) {
        this.width = w;
        this.height = h;
        this.groundY = h - 10;
        // Ajusta jogador para não cair no buraco
        this.player.adjustPosition(this.groundY);
      }

      initClouds() {
        this.clouds = [
          { x: 50, y: 20, size: 20, speed: 0.2 },
          { x: 300, y: 40, size: 30, speed: 0.5 },
          { x: 600, y: 15, size: 25, speed: 0.3 }
        ];
      }

      start() {
        this.state = 'PLAYING';
        this.reset();
        setGameState('PLAYING');
      }

      reset() {
        this.obstacles = [];
        this.stage = null;
        this.frames = 0;
        this.seconds = 0;
        this.beerCount = 0;
        this.speed = GAME_CONFIG.SPEED;
        this.player = new Player(this.groundY);
        this.player.y = 0; // Drop from sky
        setScore(0);
        setBeers(0);
      }

      handleInput() {
        this.inputJump = true;
      }

      update() {
        // Update Nuvens (Sempre movem um pouco)
        this.clouds.forEach(c => {
          c.x -= c.speed;
          if (c.x + c.size * 3 < 0) c.x = this.width + 50;
        });

        if (this.state === 'PLAYING') {
          this.frames++;
          if (this.frames % GAME_CONFIG.FPS === 0) {
            this.seconds++;
            setScore(this.seconds);
          }

          // Checar condição de Vitória (Chegar na Festa)
          if (this.seconds >= GAME_CONFIG.VICTORY_TIME_SEC) {
            // Inicia sequência de chegada
            if (!this.stage) {
               // Cria a casa da festa fora da tela à direita
               // Largura da casa: 200px
               this.stage = new Entity(this.width + 100, this.groundY - 120, 200, 120, 'STAGE');
            }
          }

          // Se o palco existe, move ele até o centro
          if (this.stage) {
            // Calcula o centro da tela para parar a casa
            const targetX = (this.width - this.stage.width) / 2;
            
            if (this.stage.x > targetX) {
              this.stage.x -= this.speed;
              // Player corre
              this.player.update(this.groundY, this.inputJump, false, false);
            } else {
              // Palco chegou no centro, parar jogo -> VITÓRIA
              this.state = 'VICTORY';
              setGameState('VICTORY');
              // Player para na frente da casa e dança
              this.player.update(this.groundY, false, false, true);
            }
          } else {
            // Jogo Normal (Sem palco ainda)
            this.player.update(this.groundY, this.inputJump, false, false);
            this.spawnManager();
            this.updateEntities();
            this.checkCollisions();
          }

          this.inputJump = false; // Reset input trigger
        } 
        else if (this.state === 'PASSED_OUT') {
           this.player.update(this.groundY, false, true, false);
        }
        else if (this.state === 'VICTORY') {
           // Continua animando o player dançando
           this.player.update(this.groundY, false, false, true);
        }
      }

      spawnManager() {
        if (this.seconds >= GAME_CONFIG.VICTORY_TIME_SEC) return;

        // Spawna a cada X frames
        if (this.frames % 70 === 0) {
          const rand = Math.random();
          
          if (rand < 0.35) {
            // BEER (Coletável Aéreo)
            const jumpHeight = 60 + Math.random() * 40;
            this.obstacles.push(new Entity(this.width, this.groundY - jumpHeight, 20, 28, 'BEER'));
          } else if (rand > 0.5) {
            // OBSTACLE (Chão)
            const type = Math.random() > 0.5 ? 'RED_MUSHROOM' : 'YELLOW_MUSHROOM';
            this.obstacles.push(new Entity(this.width, this.groundY - 30, 30, 30, type));
          }
        }
      }

      updateEntities() {
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
          const obs = this.obstacles[i];
          obs.update(this.speed);
          if (obs.markedForDeletion) this.obstacles.splice(i, 1);
        }
      }

      checkCollisions() {
        const p = this.player;
        const pHit = { x: p.x + 8, y: p.y + 4, w: p.width - 16, h: p.height - 8 };

        for (let i = this.obstacles.length - 1; i >= 0; i--) {
          const obs = this.obstacles[i];
          const obsHit = { x: obs.x, y: obs.y, w: obs.width, h: obs.height };

          if (
            pHit.x < obsHit.x + obsHit.w &&
            pHit.x + pHit.w > obsHit.x &&
            pHit.y < obsHit.y + obsHit.h &&
            pHit.y + pHit.h > obsHit.y
          ) {
            if (obs.type === 'BEER') {
              this.beerCount++;
              setBeers(this.beerCount);
              this.obstacles.splice(i, 1);
              if (this.beerCount >= GAME_CONFIG.MAX_BEERS) {
                this.state = 'PASSED_OUT';
                setGameState('PASSED_OUT');
              }
            } else {
              this.state = 'GAME_OVER';
              setGameState('GAME_OVER');
            }
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Limpar tela (importante para transparencia/resize)
        ctx.clearRect(0, 0, this.width, this.height);

        // 1. Background
        ctx.fillStyle = '#004d40';
        ctx.fillRect(0, 0, this.width, this.height);

        // Nuvens
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        this.clouds.forEach(c => {
           ctx.beginPath();
           ctx.arc(c.x, c.y, c.size, 0, Math.PI*2);
           ctx.fill();
        });

        // Chão
        ctx.fillStyle = '#FF9E1B';
        ctx.fillRect(0, this.groundY, this.width, 10);

        // 2. Palco / Casa
        if (this.stage) this.drawStage(ctx, this.stage);

        // 3. Entidades
        this.obstacles.forEach(obs => {
           if (obs.type === 'BEER') this.drawBeer(ctx, obs);
           else this.drawMushroom(ctx, obs);
        });

        // 4. Player
        this.player.draw(ctx);
      }

      drawMushroom(ctx: CanvasRenderingContext2D, m: Entity) {
        const color = m.type === 'RED_MUSHROOM' ? '#D12E4B' : '#FF9E1B';
        const spots = m.type === 'RED_MUSHROOM' ? '#FFF' : '#005C53';
        
        ctx.fillStyle = '#FFE4C4';
        ctx.fillRect(m.x + 10, m.y + 15, 10, 15);
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(m.x + 15, m.y + 15, 15, Math.PI, 0);
        ctx.fill();

        ctx.fillStyle = spots;
        ctx.beginPath(); ctx.arc(m.x + 10, m.y + 10, 3, 0, Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(m.x + 20, m.y + 8, 2, 0, Math.PI*2); ctx.fill();
      }

      drawBeer(ctx: CanvasRenderingContext2D, b: Entity) {
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(b.x + 4, b.y + b.height);
        ctx.lineTo(b.x + b.width - 4, b.y + b.height);
        ctx.lineTo(b.x + b.width, b.y + 5);
        ctx.lineTo(b.x, b.y + 5);
        ctx.fill();

        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(b.x + 5, b.y + 5, 5, 0, Math.PI*2);
        ctx.arc(b.x + 10, b.y + 2, 6, 0, Math.PI*2);
        ctx.arc(b.x + 15, b.y + 5, 5, 0, Math.PI*2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(b.x + b.width - 2, b.y + 10);
        ctx.bezierCurveTo(b.x + b.width + 6, b.y + 10, b.x + b.width + 6, b.y + 20, b.x + b.width - 3, b.y + 22);
        ctx.stroke();
      }

      drawStage(ctx: CanvasRenderingContext2D, s: Entity) {
         // Estrutura da Casa
         const houseColor = '#FFF'; // Branco
         const roofColor = '#D12E4B'; // Rosa/Vermelho
         const doorColor = '#005C53'; // Teal
         
         const x = s.x;
         const y = s.y;
         const w = s.width;
         const h = s.height;

         // Telhado (Triangulo)
         ctx.fillStyle = roofColor;
         ctx.beginPath();
         ctx.moveTo(x, y + 40);
         ctx.lineTo(x + w/2, y);
         ctx.lineTo(x + w, y + 40);
         ctx.fill();

         // Parede Principal
         ctx.fillStyle = houseColor;
         ctx.fillRect(x + 20, y + 40, w - 40, h - 40);

         // Porta
         ctx.fillStyle = doorColor;
         ctx.fillRect(x + w/2 - 20, y + h - 60, 40, 60);

         // Janelas
         ctx.fillStyle = '#FF9E1B'; // Luz acesa
         ctx.fillRect(x + 40, y + 60, 20, 20);
         ctx.fillRect(x + w - 60, y + 60, 20, 20);

         // Letreiro Neon
         const time = Date.now();
         const blink = Math.floor(time / 200) % 2 === 0;
         if (blink) {
             ctx.fillStyle = '#FF66C4';
             ctx.font = 'bold 16px sans-serif';
             ctx.textAlign = 'center';
             ctx.fillText('FESTA', x + w/2, y + 30);
         }

         // Luzes de Festa (Piscando)
         const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'];
         for (let i = 0; i < 5; i++) {
             ctx.fillStyle = colors[(Math.floor(time/100) + i) % colors.length];
             ctx.beginPath();
             ctx.arc(x + 30 + (i * 35), y + 40, 4, 0, Math.PI*2);
             ctx.fill();
         }
      }
    }

    // --- INICIALIZAÇÃO E LOOP ---
    
    // Resize Handler Refatorado para DPI e Responsividade
    const handleResize = () => {
       const container = containerRef.current;
       const canvas = canvasRef.current;
       if (container && canvas) {
          // Lógica de DPI (Device Pixel Ratio) para nitidez em mobile/retina
          const dpr = window.devicePixelRatio || 1;
          
          // Tamanho lógico (CSS)
          const rect = container.getBoundingClientRect();
          const logicalWidth = rect.width;
          
          // Altura Responsiva: Mobile = 160px, Desktop = 220px
          const logicalHeight = window.innerWidth < 768 ? 160 : 220;

          // Define tamanho interno do buffer (multiplicado pelo DPR)
          canvas.width = logicalWidth * dpr;
          canvas.height = logicalHeight * dpr;

          // Define tamanho visual do CSS
          canvas.style.width = `${logicalWidth}px`;
          canvas.style.height = `${logicalHeight}px`;
          
          // Escala o contexto para desenhar usando coordenadas lógicas
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform
            ctx.scale(dpr, dpr);
          }
          
          if (!gameInstanceRef.current) {
             gameInstanceRef.current = new Game(logicalWidth, logicalHeight);
          } else {
             // Atualiza dimensões no jogo existente
             gameInstanceRef.current.resize(logicalWidth, logicalHeight);
          }
       }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Trigger inicial

    // Loop
    const loop = () => {
      if (gameInstanceRef.current && ctx) {
        gameInstanceRef.current.update();
        gameInstanceRef.current.draw(ctx);
      }
      requestRef.current = requestAnimationFrame(loop);
    };
    requestRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // --- CONTROLES EXTERNOS ---
  const handleTap = () => {
    if (gameState === 'START' || gameState === 'GAME_OVER' || gameState === 'PASSED_OUT' || gameState === 'VICTORY') {
      gameInstanceRef.current?.start();
    } else {
      gameInstanceRef.current?.handleInput();
    }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Allow typing in inputs without triggering game actions
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        handleTap();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState]);


  return (
    <div className="w-full max-w-4xl mx-auto border-4 border-[#FF66C4] bg-[#004d40] relative overflow-hidden select-none shadow-[8px_8px_0px_0px_#005C53] touch-manipulation" ref={containerRef}>
      <canvas 
        ref={canvasRef}
        className="block w-full cursor-pointer touch-manipulation"
        onClick={handleTap}
      />
      
      {/* HUD SUPERIOR */}
      <div className="absolute top-2 left-2 right-2 flex justify-between items-start pointer-events-none z-10">
        
        {/* Lado Esquerdo: Cervejas */}
        <div className="flex items-center gap-1 bg-black/40 p-1.5 md:p-2 rounded-lg backdrop-blur-sm border border-white/20">
            {[...Array(GAME_CONFIG.MAX_BEERS)].map((_, i) => (
                <BeerIcon 
                    key={i} 
                    className={`w-5 h-5 md:w-6 md:h-6 ${i < beers ? "text-[#FFD700] fill-[#FFD700] drop-shadow-lg" : "text-white/20"}`} 
                />
            ))}
        </div>

        {/* Lado Direito: Tempo */}
        <div className="flex items-center gap-2 font-display text-white bg-black/40 p-1.5 px-3 md:p-2 md:px-4 rounded-lg backdrop-blur-sm border border-white/20">
             <Clock className="text-[#FF9E1B] w-4 h-4 md:w-5 md:h-5" />
             <span className="text-sm md:text-lg tabular-nums leading-none">{score}s <span className="text-[10px] md:text-xs opacity-50 tracking-wider">/ {GAME_CONFIG.VICTORY_TIME_SEC}s</span></span>
        </div>
      </div>

      {/* --- TELAS DE ESTADO (OVERLAYS) --- */}

      {/* 1. START SCREEN */}
      {gameState === 'START' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none z-20">
           <div className="text-center text-white animate-pulse px-4">
              <Play className="mx-auto mb-2 text-[#FF9E1B] w-12 h-12 md:w-16 md:h-16" />
              <p className="font-display text-xl md:text-3xl uppercase tracking-wider mb-2">Toque para Jogar</p>
              <div className="inline-flex flex-col items-center bg-black/50 p-3 md:p-4 rounded-xl border border-white/10 text-xs md:text-sm font-bold opacity-90 gap-1">
                 <p>🏁 Sobreviva por 25s</p>
                 <p>🍺 Cuidado para não dar PT</p>
              </div>
           </div>
        </div>
      )}

      {/* 2. GAME OVER (COGUMELO) */}
      {gameState === 'GAME_OVER' && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#D12E4B]/95 backdrop-blur-sm p-4 z-20">
           <div className="text-center text-white animate-in zoom-in duration-300">
              <p className="font-display text-3xl md:text-5xl uppercase mb-2">Tropeçou!</p>
              <p className="text-sm md:text-lg opacity-90 mb-6">A grama do sítio é traiçoeira.</p>
              <button 
                onClick={(e) => { e.stopPropagation(); handleTap(); }}
                className="bg-white text-[#D12E4B] px-8 py-3 md:px-10 md:py-4 text-sm md:text-xl font-display uppercase border-4 border-[#005C53] hover:scale-105 transition-transform flex items-center justify-center gap-3 mx-auto shadow-lg"
              >
                <RefreshCw className="w-5 h-5 md:w-6 md:h-6" /> Tentar de Novo
              </button>
           </div>
        </div>
      )}

      {/* 3. PASSED OUT (QUEIMOU A LARGADA) */}
      {gameState === 'PASSED_OUT' && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FF9E1B]/95 backdrop-blur-sm p-4 border-4 border-white z-20">
           <div className="text-center text-[#005C53] animate-in slide-in-from-bottom duration-500 w-full max-w-md">
              <div className="text-5xl md:text-6xl mb-2 animate-bounce">😵‍💫</div>
              <h2 className="font-display text-3xl md:text-5xl uppercase leading-none mb-2 text-[#D12E4B]">DEU PT!</h2>
              <p className="font-bold text-sm md:text-lg mb-6 leading-tight">
                 Você queimou a largada antes da festa começar!
              </p>
              <button 
                onClick={(e) => { e.stopPropagation(); handleTap(); }}
                className="bg-[#005C53] text-white w-full py-3 md:py-4 text-sm md:text-xl font-display uppercase border-4 border-white hover:bg-[#D12E4B] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <RefreshCw className="w-5 h-5 md:w-6 md:h-6" /> Beber Água & Reiniciar
              </button>
           </div>
        </div>
      )}

      {/* 4. VICTORY (CHEGOU NA FESTA) */}
      {gameState === 'VICTORY' && (
        <div className="absolute inset-0 flex flex-col justify-between z-20 pointer-events-none">
           {/* Fundo degradê para contraste do texto */}
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent"></div>

           {/* Header: Frase com Ícones nas Bordas */}
           <div className="relative w-full flex items-center justify-center gap-3 md:gap-6 pt-4 md:pt-6 animate-in zoom-in duration-500">
              <Sparkles className="text-[#FFD700] w-6 h-6 md:w-10 md:h-10 animate-spin-slow" />
              
              <div className="flex flex-col items-center text-center">
                <h2 className="font-display text-2xl md:text-5xl uppercase leading-none text-[#FF9E1B] drop-shadow-[0_2px_0_rgba(0,0,0,1)]">
                  HORA DO ROLE
                </h2>
                <p className="font-display text-sm md:text-xl text-white uppercase tracking-widest drop-shadow-[0_2px_0_rgba(0,0,0,1)] bg-black/20 px-2 rounded">
                   CHEGOU NA FESTAAAA!
                </p>
              </div>

              <Music className="text-[#FF66C4] w-6 h-6 md:w-10 md:h-10 animate-bounce" />
           </div>
           
           {/* Botão Inferior */}
           <div className="w-full flex justify-center pb-4 md:pb-8 pointer-events-auto">
             <button 
                onClick={(e) => { e.stopPropagation(); handleTap(); }}
                className="bg-[#FF66C4] text-[#005C53] px-6 py-2 md:px-8 md:py-3 text-sm md:text-xl font-display uppercase border-4 border-white hover:bg-white hover:text-[#D12E4B] transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_#000] animate-pulse"
              >
                <RefreshCw className="w-4 h-4 md:w-6 md:h-6" /> Jogar Novamente
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default FooterGame;
