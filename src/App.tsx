import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Users, FileText, Briefcase, Settings, Crosshair, 
  Trophy, Ghost, Play, RotateCcw, CheckCircle, 
  XCircle, Coffee, Code, AlertTriangle, Cpu, Mail, Zap, Brain, Terminal,
  Maximize, DollarSign, Hand
} from 'lucide-react';

// --- TYPES GLOBAUX ---

type Screen = 'ATS' | 'ARCADE';
type GameMode = 'NONE' | 'SHOOTER' | 'BINGO' | 'SNAKE' | 'MEMORY' | 'TYPER' | 'SLIDER' | 'REACTION';

// --- MAIN COMPONENT ---

export default function HiddenRecruitmentApp() {
  const [screen, setScreen] = useState<Screen>('ATS');
  const [secretCount, setSecretCount] = useState(0);

  const handleSecretClick = () => {
    const newCount = secretCount + 1;
    setSecretCount(newCount);
    if (newCount >= 5) {
      setScreen('ARCADE');
      setSecretCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden select-none">
      {screen === 'ATS' ? (
        <DashboardATS onSecretClick={handleSecretClick} />
      ) : (
        <ArcadeRoom onExit={() => setScreen('ATS')} />
      )}
    </div>
  );
}

// --- PARTIE 1 : LE DASHBOARD ATS (LEURRE) ---

function DashboardATS({ onSecretClick }: { onSecretClick: () => void }) {
  return (
    <div className="flex h-screen w-full">
      <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0">
        <div className="p-6 text-xl font-bold flex items-center gap-2">
          <Briefcase className="text-blue-400" /> RecruitPro
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<Users />} label="Candidats" active />
          <NavItem icon={<FileText />} label="Offres" />
          <NavItem icon={<CheckCircle />} label="Entretiens" />
          <NavItem icon={<Settings />} label="Paramètres" />
        </nav>
        <div 
          className="p-4 text-xs text-slate-600 hover:text-slate-500 cursor-pointer transition-colors text-center" 
          onClick={onSecretClick}
        >
          v4.1.0 (Fix)
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto bg-slate-50">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Vue d'ensemble</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm">
            + Créer une offre
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Nouveaux CVs" value="128" color="bg-blue-50 text-blue-700" />
          <StatCard title="En attente manager" value="14" color="bg-orange-50 text-orange-700" />
          <StatCard title="Offres actives" value="5" color="bg-emerald-50 text-emerald-700" />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 font-semibold text-slate-700">Candidatures Récentes</div>
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="p-4">Candidat</th>
                <th className="p-4">Poste visé</th>
                <th className="p-4">Date</th>
                <th className="p-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <CandidateRow name="Alice Martin" role="UX Designer" date="Auj. 10:42" status="Nouveau" />
              <CandidateRow name="Paul Dubois" role="Backend Dev" date="Hier" status="Review" />
              <CandidateRow name="Sarah Conner" role="Security Lead" date="2 jours" status="Rejeté" />
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

// --- PARTIE 2 : HUB ARCADE ---

function ArcadeRoom({ onExit }: { onExit: () => void }) {
  const [game, setGame] = useState<GameMode>('NONE');

  return (
    <div className="h-screen w-full bg-gray-950 text-white flex flex-col relative overflow-hidden font-mono">
      <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 z-20 shadow-lg">
        <div className="flex items-center gap-2 text-green-400">
          <Terminal size={20} />
          <span className="font-bold tracking-widest text-sm md:text-base">SECRET_DEV_CONSOLE_V4.1</span>
        </div>
        <button onClick={onExit} className="text-xs bg-red-600/20 text-red-400 border border-red-500/50 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition">
          EXIT (BOSS KEY)
        </button>
      </div>

      <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
        {game === 'NONE' && (
          <div className="absolute inset-0 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                CHOOSE YOUR MISSION
              </h2>
              <p className="text-gray-400 mb-8">Sélectionnez un module d'entraînement.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <GameCard 
                  title="CV BLASTER" subtitle="Shoot 'em up" desc="Détruisez les mauvais CVs avant l'invasion." icon={<Crosshair size={32} />} color="from-blue-600 to-blue-800" onClick={() => setGame('SHOOTER')} 
                />
                <GameCard 
                  title="COFFEE SNAKE" subtitle="Classic Snake" desc="Buvez le café. Évitez les murs. Gérez la file d'attente." icon={<Coffee size={32} />} color="from-green-600 to-emerald-800" onClick={() => setGame('SNAKE')} 
                />
                <GameCard 
                  title="BULLSH*T BINGO" subtitle="Reflex Clicker" desc="Cliquez sur les buzzwords corporatifs vides de sens." icon={<AlertTriangle size={32} />} color="from-orange-600 to-red-800" onClick={() => setGame('BINGO')} 
                />
                <GameCard 
                  title="TALENT MATCH" subtitle="Memory Card" desc="Trouvez les paires de technologies compatibles." icon={<Brain size={32} />} color="from-purple-600 to-indigo-800" onClick={() => setGame('MEMORY')} 
                />
                 <GameCard 
                  title="INBOX TYPER" subtitle="Typing Defense" desc="Tapez les mots pour détruire les emails urgents." icon={<Mail size={32} />} color="from-pink-600 to-rose-800" onClick={() => setGame('TYPER')} 
                />
                <GameCard 
                  title="BUDGET BALANCER" subtitle="Timing Slider" desc="Négociez la bonne offre ! Arrêtez le curseur sur la zone verte." icon={<DollarSign size={32} />} color="from-yellow-500 to-amber-700" onClick={() => setGame('SLIDER')} 
                />
                <GameCard 
                  title="RED FLAG BLOCKER" subtitle="Reaction Test" desc="Triez rapidement les bons candidats et évitez les drapeaux rouges." icon={<Hand size={32} />} color="from-cyan-500 to-teal-700" onClick={() => setGame('REACTION')} 
                />
              </div>
            </div>
          </div>
        )}

        {/* Game Containers */}
        {game !== 'NONE' && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-5xl h-[85vh] bg-gray-900 border-4 border-gray-700 rounded-xl shadow-2xl relative overflow-hidden">
                    {game === 'SHOOTER' && <ShooterGame onBack={() => setGame('NONE')} />}
                    {game === 'SNAKE' && <SnakeGame onBack={() => setGame('NONE')} />}
                    {game === 'BINGO' && <BingoGame onBack={() => setGame('NONE')} />}
                    {game === 'MEMORY' && <MemoryGame onBack={() => setGame('NONE')} />}
                    {game === 'TYPER' && <TyperGame onBack={() => setGame('NONE')} />}
                    {game === 'SLIDER' && <SalarySliderGame onBack={() => setGame('NONE')} />}
                    {game === 'REACTION' && <RedFlagBlockerGame onBack={() => setGame('NONE')} />}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// --- JEU 6 : SALARY SLIDER (CORRIGÉ) ---
// ============================================================================

function SalarySliderGame({ onBack }: { onBack: () => void }) {
    const [barPosition, setBarPosition] = useState(0); 
    const [isMoving, setIsMoving] = useState(true);
    const [score, setScore] = useState(0);
    const [targetRange, setTargetRange] = useState({ start: 45, end: 55 });
    const [gameOver, setGameOver] = useState(false);
    
    // NEW: Use Ref to store mutable logic (speed and direction) for the interval
    const gameLogic = useRef({ speed: 4, direction: 1 });
    const timerRef = useRef<number>();

    const startNewRound = useCallback(() => {
        const start = Math.floor(Math.random() * 80) + 10;
        setTargetRange({ start, end: start + 10 });
        setBarPosition(0);
        setIsMoving(true);
        setGameOver(false);

        // Update Ref state for next round difficulty/direction reset
        gameLogic.current.direction = 1;
        gameLogic.current.speed = Math.min(15, gameLogic.current.speed + 1);
    }, []);

    useEffect(() => {
        if (gameOver || !isMoving) {
            clearInterval(timerRef.current);
            return;
        }

        // The interval closure now only relies on the mutable ref
        timerRef.current = setInterval(() => {
            setBarPosition(p => {
                const logic = gameLogic.current;
                // Calculate next position
                let nextPos = p + logic.direction * logic.speed / 2;
                
                // Check bounds and reverse direction
                if (nextPos >= 100 || nextPos <= 0) {
                    logic.direction *= -1; // Change direction in the mutable ref
                    nextPos = nextPos >= 100 ? 100 : 0;
                }
                return nextPos;
            });
        }, 30); 

        return () => clearInterval(timerRef.current);
    }, [isMoving, gameOver]); // Dependencies are clean

    const handleStop = () => {
        if (gameOver || !isMoving) return;
        setIsMoving(false);

        const pos = barPosition;
        if (pos >= targetRange.start && pos <= targetRange.end) {
            setScore(s => s + 1);
            setTimeout(startNewRound, 500);
        } else {
            setGameOver(true);
        }
    };

    const handleRestart = () => {
        setScore(0);
        gameLogic.current.speed = 4; // Reset difficulty
        startNewRound();
    };

    return (
        <div className="w-full h-full bg-slate-900 relative p-12 flex flex-col items-center justify-center font-mono" onClick={handleStop}>
            <GameUI 
                score={score} 
                title="BUDGET BALANCER" 
                onBack={onBack} 
                gameOver={gameOver} 
                onRestart={handleRestart}
                customMsg="Rondes réussies"
            />

            <div className="w-full max-w-4xl h-16 bg-slate-700 rounded-lg relative overflow-hidden border-4 border-slate-600 shadow-xl cursor-pointer">
                {/* Target Zone */}
                <div 
                    className="absolute h-full transition-all duration-300"
                    style={{ 
                        left: `${targetRange.start}%`, 
                        width: `${targetRange.end - targetRange.start}%`, 
                        backgroundColor: isMoving ? 'rgba(52, 211, 153, 0.4)' : (gameOver ? 'rgba(239, 68, 68, 0.8)' : 'rgba(52, 211, 153, 0.8)')
                    }}
                >
                    <DollarSign className="absolute inset-0 m-auto text-white/50 animate-pulse" />
                </div>
                
                {/* Moving Bar (Curseur) */}
                <div 
                    className={`absolute top-0 w-4 h-full bg-yellow-400 shadow-[0_0_10px_#facc15] transform -translate-x-1/2 transition-all duration-50 ${isMoving ? 'ease-linear' : 'ease-out'}`}
                    style={{ left: `${barPosition}%` }}
                />

                {/* Markers */}
                <div className="absolute top-0 h-full w-0.5 bg-red-500" style={{ left: `${targetRange.start}%` }} />
                <div className="absolute top-0 h-full w-0.5 bg-red-500" style={{ left: `${targetRange.end}%` }} />
            </div>

            <p className="mt-8 text-xl text-yellow-300/80">
                {isMoving ? "CLIQUEZ POUR NÉGOCIER" : (gameOver ? "OFFRE NON CONCLUE !" : "SUCCESS, PRÉPAREZ-VOUS...")}
            </p>
        </div>
    );
}

// ============================================================================
// --- JEU 7 : RED FLAG BLOCKER (CORRIGÉ) ---
// ============================================================================

const MESSAGES = [
    { text: "Demande de congés illimitée", type: 'FLAG' }, { text: "Compétences parfaites", type: 'OK' },
    { text: "Critique les anciens employeurs", type: 'FLAG' }, { text: "Rigueur et autonomie", type: 'OK' },
    { text: "Ne connaît pas le poste postulé", type: 'FLAG' }, { text: "Passionné par la mission", type: 'OK' },
    { text: "Mente sur son CV", type: 'FLAG' }, { text: "Références excellentes", type: 'OK' },
];

function RedFlagBlockerGame({ onBack }: { onBack: () => void }) {
    const [message, setMessage] = useState(MESSAGES[1]);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [delay, setDelay] = useState(1500);
    const [gameOver, setGameOver] = useState(false);
    
    const timerRef = useRef<number>(); // To hold the current auto-fail timeout ID

    const startNewRound = useCallback((currentMessage: typeof message) => {
        const nextMessage = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
        setMessage(nextMessage);
        
        // Clear previous timeout before setting a new one
        clearTimeout(timerRef.current);
        
        // Timer for auto-fail (captures the type of the currently running round)
        const currentDelay = delay;
        timerRef.current = setTimeout(() => {
            // If the timer expires, it means the user failed to react to the current message
            if (nextMessage.type === 'OK') {
                handleGuess('FLAG', nextMessage); // Simulates failure (missing an OK click)
            } else {
                handleGuess('OK', nextMessage); // Simulates failure (missing a FLAG click)
            }
        }, currentDelay);

        // Update difficulty only after a successful round
        setDelay(d => Math.max(500, d - 20));

    }, [delay]); // Recalculate if delay changes

    // We need this effect to start the game and handle game over
    useEffect(() => {
        if (lives <= 0) {
            setGameOver(true);
            clearTimeout(timerRef.current);
        } else if (!gameOver) {
            // Only start the first round here, subsequent rounds are started in handleGuess
            startNewRound(message); 
        }
        return () => clearTimeout(timerRef.current);
    }, [lives, gameOver]);

    const handleGuess = useCallback((guessType: 'OK' | 'FLAG', msg: typeof message = message) => {
        // CORRECTION: Clear the current timeout immediately to prevent double penalties
        clearTimeout(timerRef.current);
        
        if (gameOver) return;

        let isCorrect = false;
        
        if (msg.type === 'OK' && guessType === 'OK') {
            isCorrect = true;
        } else if (msg.type === 'FLAG' && guessType === 'FLAG') {
             isCorrect = true;
        }
        
        if (isCorrect) {
            setScore(s => s + 1);
        } else {
            setLives(l => l - 1);
        }

        // Start the next round only if the game is not over
        if (lives > 1) startNewRound(msg);

    }, [lives, gameOver, startNewRound, message]);

    const handleRestart = () => {
        setScore(0);
        setLives(3);
        setDelay(1500);
        setGameOver(false);
    };

    return (
        <div className="w-full h-full bg-teal-900 relative p-8 flex flex-col items-center justify-between font-mono">
            <GameUI score={score} title="RED FLAG BLOCKER" onBack={onBack} gameOver={gameOver} onRestart={handleRestart} />

            <div className="absolute top-4 right-40 flex items-center gap-2 text-xl text-red-400 font-bold">
                Vies: {Array(lives).fill(0).map((_, i) => <Zap key={i} size={24} fill="currentColor" />)}
            </div>

            <div className="flex flex-col items-center gap-6 mt-20">
                <h3 className="text-2xl text-teal-300">ÉVALUATION CANDIDAT EN COURS...</h3>
                <div className="p-8 bg-slate-800 rounded-xl shadow-2xl border-4 border-teal-700 w-full max-w-lg min-h-[150px] flex items-center justify-center">
                    <p className={`text-3xl font-black ${gameOver ? 'text-red-500' : 'text-white'}`}>
                        {gameOver ? "ENTRETIEN TERMINÉ" : message.text}
                    </p>
                </div>
            </div>

            <div className="flex gap-8 w-full max-w-xl mb-10">
                <button 
                    onClick={() => handleGuess('OK')} 
                    disabled={gameOver}
                    className="flex-1 p-6 bg-green-600 rounded-xl text-white font-bold text-2xl hover:bg-green-500 transition disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg"
                >
                    <CheckCircle size={32} /> C'EST BON
                </button>
                <button 
                    onClick={() => handleGuess('FLAG')} 
                    disabled={gameOver}
                    className="flex-1 p-6 bg-red-600 rounded-xl text-white font-bold text-2xl hover:bg-red-500 transition disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg"
                >
                    <XCircle size={32} /> DRAPEAU ROUGE
                </button>
            </div>
        </div>
    );
}

// ============================================================================
// --- AUTRES JEUX (Non Modifiés) ---
// (Le code des 5 autres jeux n'est pas affiché ici pour la concision, mais il est dans le fichier complet fourni au client.)
// ============================================================================


// --- JEU 1 : CV BLASTER (SHOOTER) ---
function ShooterGame({ onBack }: { onBack: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const gameState = useRef({
      playerX: 50, projectiles: [] as { id: number; x: number; y: number }[],
      enemies: [] as { id: number; x: number; y: number; type: 'CV' | 'TOXIC' }[],
      lastShot: 0, score: 0, gameOver: false
    });
    const [, forceUpdate] = useState(0);
  
    useEffect(() => {
      let animationId: number;
      let spawnTimer = 0;
      const loop = () => {
        const state = gameState.current;
        if (!state.gameOver) {
          state.projectiles = state.projectiles.map(p => ({ ...p, y: p.y - 1.5 })).filter(p => p.y > -5);
          spawnTimer++;
          if (spawnTimer > Math.max(30, 80 - Math.floor(state.score / 50))) {
            state.enemies.push({ id: Math.random(), x: Math.random() * 90 + 5, y: -10, type: Math.random() > 0.8 ? 'TOXIC' : 'CV' });
            spawnTimer = 0;
          }
          state.enemies = state.enemies.map(e => ({ ...e, y: e.y + 0.5 }));
          
          const survivors = [];
          for (const enemy of state.enemies) {
              let hit = false;
              const pIdx = state.projectiles.findIndex(p => Math.abs(p.x - enemy.x) < 5 && Math.abs(p.y - enemy.y) < 5);
              if (pIdx !== -1) { state.projectiles.splice(pIdx, 1); state.score += (enemy.type === 'TOXIC' ? 50 : 10); hit = true; }
              if (enemy.y > 95) state.gameOver = true;
              if (!hit) survivors.push(enemy);
          }
          state.enemies = survivors;
          forceUpdate(n => n + 1);
        }
        animationId = requestAnimationFrame(loop);
      };
      animationId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(animationId);
    }, []);
  
    const handleMouseMove = (e: React.MouseEvent) => {
      if (gameState.current.gameOver || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      gameState.current.playerX = Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 5), 95);
    };
  
    const handleClick = () => {
      const state = gameState.current;
      if (state.gameOver || Date.now() - state.lastShot < 200) return;
      state.projectiles.push({ id: Date.now(), x: state.playerX, y: 88 });
      state.lastShot = Date.now();
    };
  
    return (
      <div ref={containerRef} className="w-full h-full bg-slate-900 relative cursor-crosshair" onMouseMove={handleMouseMove} onClick={handleClick}>
        <GameUI score={gameState.current.score} title="CV BLASTER" onBack={onBack} gameOver={gameState.current.gameOver} onRestart={() => { gameState.current = { ...gameState.current, projectiles: [], enemies: [], score: 0, gameOver: false }; forceUpdate(0); }} />
        <div className="absolute bottom-2 -translate-x-1/2" style={{ left: `${gameState.current.playerX}%` }}><div className="w-10 h-10 bg-blue-500 rounded-t flex items-center justify-center"><Briefcase size={20} className="text-white" /></div></div>
        {gameState.current.projectiles.map(p => <div key={p.id} className="absolute w-2 h-4 bg-yellow-400 rounded -translate-x-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }} />)}
        {gameState.current.enemies.map(e => <div key={e.id} className="absolute -translate-x-1/2" style={{ left: `${e.x}%`, top: `${e.y}%` }}>{e.type === 'TOXIC' ? <Ghost className="text-red-500 animate-pulse" /> : <FileText className="text-slate-300" />}</div>)}
      </div>
    );
}

// --- JEU 2 : COFFEE SNAKE (SNAKE) ---
const GRID_SIZE = 20;
function SnakeGame({ onBack }: { onBack: () => void }) {
    const [snake, setSnake] = useState([{x: 10, y: 10}]);
    const [food, setFood] = useState({x: 15, y: 5});
    const [dir, setDir] = useState({x: 0, y: -1});
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const gameLoopRef = useRef<any>();

    const moveSnake = useCallback(() => {
        if (gameOver) return;
        setSnake(prev => {
            const newHead = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };
            if (newHead.x < 0 || newHead.x >= 30 || newHead.y < 0 || newHead.y >= 20 || prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
                setGameOver(true); return prev;
            }
            const newSnake = [newHead, ...prev];
            if (newHead.x === food.x && newHead.y === food.y) {
                setScore(s => s + 1);
                setFood({ x: Math.floor(Math.random() * 30), y: Math.floor(Math.random() * 20) });
            } else {
                newSnake.pop();
            }
            return newSnake;
        });
    }, [dir, food, gameOver]);

    useEffect(() => {
        gameLoopRef.current = setInterval(moveSnake, 150 - Math.min(score * 2, 100)); 
        return () => clearInterval(gameLoopRef.current);
    }, [moveSnake, score]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            e.preventDefault(); 
            if (gameOver) return;
            switch(e.key) {
                case 'ArrowUp': case 'z': case 'w': if(dir.y !== 1) setDir({x:0, y:-1}); break;
                case 'ArrowDown': case 's': if(dir.y !== -1) setDir({x:0, y:1}); break;
                case 'ArrowLeft': case 'q': case 'a': if(dir.x !== 1) setDir({x:-1, y:0}); break;
                case 'ArrowRight': case 'd': if(dir.x !== -1) setDir({x:1, y:0}); break;
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [dir, gameOver]);

    return (
        <div className="w-full h-full bg-slate-900 relative flex items-center justify-center">
            <GameUI score={score} title="COFFEE SNAKE" onBack={onBack} gameOver={gameOver} onRestart={() => { setSnake([{x:10,y:10}]); setScore(0); setGameOver(false); setDir({x:0,y:-1}); }} />
            
            <div className="relative bg-black/50 border border-slate-700" style={{ width: 30 * GRID_SIZE, height: 20 * GRID_SIZE }}>
                {snake.map((s, i) => (
                    <div key={i} className="absolute bg-green-500 border border-green-600 rounded-sm" 
                         style={{ width: GRID_SIZE-1, height: GRID_SIZE-1, left: s.x*GRID_SIZE, top: s.y*GRID_SIZE }} />
                ))}
                <div className="absolute text-yellow-400 flex items-center justify-center" 
                     style={{ width: GRID_SIZE, height: GRID_SIZE, left: food.x*GRID_SIZE, top: food.y*GRID_SIZE }}>
                    <Coffee size={16} />
                </div>
            </div>
            <div className="absolute bottom-4 text-slate-500 text-sm">Utilisez les flèches (ou ZQSD/WASD)</div>
        </div>
    );
}

// --- JEU 3 : BULLSH*T BINGO (CLICKER) ---
const WORDS = ["ASAP", "Synergie", "Disruptif", "Proactif", "Ninja", "Rockstar", "Agile", "KPI", "Feedback", "Challenge", "Pipeline", "Scalable", "Corporate", "Ping", "Deep Dive"];
function BingoGame({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<any[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => setTimeLeft(t => t <= 1 ? (setIsPlaying(false), 0) : t - 1), 1000);
    const spawner = setInterval(() => {
        setItems(prev => {
            const clean = prev.filter(i => Date.now() - i.created < 2000);
            if(Math.random() > 0.3) clean.push({ id: Math.random(), text: WORDS[Math.floor(Math.random()*WORDS.length)], x: Math.random()*80+10, y: Math.random()*80+10, created: Date.now() });
            return clean;
        });
    }, 600);
    return () => { clearInterval(timer); clearInterval(spawner); };
  }, [isPlaying]);

  return (
    <div className="w-full h-full bg-indigo-950 relative overflow-hidden">
      <GameUI score={score} title="BULLSH*T BINGO" onBack={onBack} gameOver={!isPlaying} onRestart={() => { setScore(0); setTimeLeft(30); setItems([]); setIsPlaying(true); }} />
      <div className="absolute top-4 right-40 text-2xl font-mono text-white">Temps: {timeLeft}s</div>
      {items.map(i => (
        <button key={i.id} onMouseDown={() => { setScore(s=>s+1); setItems(p=>p.filter(x=>x.id!==i.id)); }}
          className="absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-bold rounded-full shadow-lg hover:scale-110 active:scale-95 animate-in zoom-in duration-200"
          style={{ left: `${i.x}%`, top: `${i.y}%` }}>{i.text}</button>
      ))}
    </div>
  );
}

// --- JEU 4 : TALENT MEMORY ---
const TECHS = [
    { name: 'React', icon: <Code />, color: 'text-blue-400' },
    { name: 'Python', icon: <Terminal />, color: 'text-yellow-400' },
    { name: 'Server', icon: <Cpu />, color: 'text-green-400' },
    { name: 'Power', icon: <Zap />, color: 'text-orange-400' },
    { name: 'Java', icon: <Coffee />, color: 'text-red-400' },
    { name: 'AI', icon: <Brain />, color: 'text-purple-400' },
];
function MemoryGame({ onBack }: { onBack: () => void }) {
    const [cards, setCards] = useState<any[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [solved, setSolved] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        const items = [...TECHS, ...TECHS].map((t, i) => ({ ...t, id: i }));
        setCards(items.sort(() => Math.random() - 0.5));
    }, []);

    const handleCardClick = (idx: number) => {
        if (flipped.length === 2 || flipped.includes(idx) || solved.includes(idx)) return;
        const newFlipped = [...flipped, idx];
        setFlipped(newFlipped);
        
        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            if (cards[newFlipped[0]].name === cards[newFlipped[1]].name) {
                setSolved(prev => [...prev, ...newFlipped]);
                setFlipped([]);
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    const isGameOver = cards.length > 0 && solved.length === cards.length;

    return (
        <div className="w-full h-full bg-slate-800 flex flex-col items-center justify-center p-8 relative">
             <GameUI score={moves} title="TALENT MEMORY" onBack={onBack} gameOver={isGameOver} onRestart={() => { setCards([...cards].sort(() => Math.random() - 0.5)); setSolved([]); setFlipped([]); setMoves(0); }} customMsg="Coups joués" />
             <div className="grid grid-cols-4 gap-4 w-full max-w-2xl aspect-square">
                 {cards.map((card, i) => (
                     <div key={i} onClick={() => handleCardClick(i)}
                          className={`relative cursor-pointer rounded-xl transition-all duration-300 transform ${flipped.includes(i) || solved.includes(i) ? 'rotate-y-180 bg-slate-700' : 'bg-blue-900 hover:bg-blue-800'}`}>
                         <div className="absolute inset-0 flex items-center justify-center">
                             {(flipped.includes(i) || solved.includes(i)) ? (
                                 <div className={`transform scale-150 ${card.color}`}>{card.icon}</div>
                             ) : (
                                 <div className="text-blue-500/30 text-4xl font-black">?</div>
                             )}
                         </div>
                     </div>
                 ))}
             </div>
        </div>
    );
}

// --- JEU 5 : INBOX TYPER (TYPING) ---
const EMAILS = ["Urgent", "Budget", "Meeting", "ASAP", "Client", "Bug", "Prod", "Deploy", "Salary", "Bonus", "Hiring", "Java", "React", "Boss"];
function TyperGame({ onBack }: { onBack: () => void }) {
    const [words, setWords] = useState<any[]>([]);
    const [input, setInput] = useState("");
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [health, setHealth] = useState(100);

    useEffect(() => {
        if (gameOver) return;
        const spawner = setInterval(() => {
            if (Math.random() > 0.6) {
                setWords(p => [...p, { id: Math.random(), text: EMAILS[Math.floor(Math.random()*EMAILS.length)], x: Math.random()*80+10, y: -10 }]);
            }
        }, 800);
        const mover = setInterval(() => {
            setWords(prev => {
                const next = prev.map(w => ({ ...w, y: w.y + 0.5 }));
                const hits = next.filter(w => w.y > 90);
                if (hits.length > 0) setHealth(h => Math.max(0, h - hits.length * 20));
                return next.filter(w => w.y <= 90);
            });
        }, 50);
        return () => { clearInterval(spawner); clearInterval(mover); };
    }, [gameOver]);

    useEffect(() => { if (health <= 0) setGameOver(true); }, [health]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInput(val);
        const match = words.find(w => w.text.toLowerCase() === val.toLowerCase());
        if (match) {
            setWords(prev => prev.filter(w => w.id !== match.id));
            setScore(s => s + 10);
            setInput("");
        }
    };

    return (
        <div className="w-full h-full bg-slate-900 relative overflow-hidden flex flex-col items-center">
            <GameUI score={score} title="INBOX TYPER" onBack={onBack} gameOver={gameOver} onRestart={() => { setWords([]); setScore(0); setHealth(100); setGameOver(false); setInput(""); }} />
            
            <div className="w-full max-w-md h-4 bg-slate-700 mt-20 rounded-full overflow-hidden border border-slate-600">
                <div className="h-full bg-green-500 transition-all duration-300" style={{ width: `${health}%`, backgroundColor: health < 30 ? 'red' : 'green' }} />
            </div>
            
            <div className="absolute bottom-10 w-full max-w-md">
                <input autoFocus value={input} onChange={handleChange} placeholder="TYPE TO DESTROY EMAILS..." 
                       className="w-full bg-slate-800 text-white border-2 border-blue-500 p-4 rounded-xl text-center text-xl font-mono outline-none uppercase placeholder:text-slate-600" />
            </div>

            {words.map(w => (
                <div key={w.id} className="absolute text-white font-mono font-bold bg-red-600/80 px-2 rounded -translate-x-1/2" style={{ left: `${w.x}%`, top: `${w.y}%` }}>
                    {w.text}
                </div>
            ))}
        </div>
    );
}


// --- UTILS UI ---

function GameUI({ score, title, onBack, gameOver, onRestart, customMsg = "SCORE", message = "" }: any) {
    return (
        <>
            <div className="absolute top-4 left-4 z-10 font-mono pointer-events-none">
                <div className="text-3xl text-yellow-400 font-bold drop-shadow-md">{customMsg}: {score}</div>
                <div className="text-sm text-slate-400 opacity-75">{title}</div>
            </div>
            <button onClick={onBack} className="absolute top-4 right-4 z-30 p-2 bg-slate-800/80 rounded hover:bg-red-900 text-white border border-slate-700">
                <XCircle />
            </button>
            {gameOver && (
                <div className="absolute inset-0 bg-black/85 z-50 flex flex-col items-center justify-center animate-in fade-in">
                    <h2 className="text-5xl text-red-500 font-black mb-4 tracking-tighter">GAME OVER</h2>
                    <p className="text-white text-2xl mb-2 font-mono">{message || "VOUS AVEZ ÉCHOUÉ"}</p>
                    <p className="text-white text-xl mb-8 font-mono">{customMsg}: {score}</p>
                    <div className="flex gap-4">
                        <button onClick={onRestart} className="px-8 py-4 bg-green-600 rounded font-bold hover:bg-green-500 flex items-center gap-2 text-xl shadow-lg hover:scale-105 transition">
                            <RotateCcw /> REJOUER
                        </button>
                        <button onClick={onBack} className="px-8 py-4 bg-slate-700 rounded hover:bg-slate-600 text-xl transition">
                            QUITTER
                        </button>
                    </div>
                </div>
            )}
             {!gameOver && message && (
                <div className="absolute top-20 z-10 p-2 bg-slate-800/80 rounded-lg text-yellow-400 font-mono text-lg transition-opacity duration-300">
                    {message}
                </div>
            )}
        </>
    )
}

function NavItem({ icon, label, active = false }: any) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${active ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
      {React.cloneElement(icon, { size: 18 })}
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div className={`p-6 rounded-xl border border-slate-100 ${color}`}>
      <h3 className="opacity-80 text-sm font-medium mb-1 uppercase tracking-wide">{title}</h3>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  );
}

function CandidateRow({ name, role, date, status }: any) {
  let statusColor = "bg-slate-100 text-slate-600";
  if (status === 'Nouveau') statusColor = "bg-blue-100 text-blue-700";
  if (status === 'Rejeté') statusColor = "bg-red-100 text-red-700";
  return (
    <tr className="hover:bg-slate-50 transition border-b border-slate-50 last:border-0">
      <td className="p-4 font-semibold text-slate-700">{name}</td>
      <td className="p-4 text-slate-600">{role}</td>
      <td className="p-4 text-slate-400 text-sm">{date}</td>
      <td className="p-4"><span className={`px-2 py-1 text-xs rounded font-bold uppercase ${statusColor}`}>{status}</span></td>
    </tr>
  );
}

function GameCard({ title, subtitle, desc, icon, color, onClick }: any) {
  return (
    <div onClick={onClick} className="bg-gray-800 border border-gray-700 hover:border-gray-500 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group flex flex-col h-full">
      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>{icon}</div>
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-xs text-green-400 font-mono mb-2 uppercase tracking-wide">{subtitle}</p>
      <p className="text-sm text-gray-400 flex-1">{desc}</p>
      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center text-xs font-mono text-gray-500">
        <span>INSERT COIN</span>
        <Play size={14} className="group-hover:text-green-400 transition-colors" />
      </div>
    </div>
  );
}