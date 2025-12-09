import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Users, FileText, Briefcase, Settings, Crosshair, Ghost, Play, RotateCcw, CheckCircle,
    XCircle, Coffee, Code, AlertTriangle, Cpu, Mail, Zap, Brain, Terminal, DollarSign, Package, Frown, Flag, Bomb, Clock,
    ListChecks, Lock, Smile, ListPlus, ArrowLeftRight, Flame
} from 'lucide-react';

// --- TYPES GLOBAUX ---

type Screen = 'ATS' | 'ARCADE';
type GameMode = 'NONE' | 'SHOOTER' | 'BINGO' | 'SNAKE' | 'MEMORY' | 'TYPER' | 'SLIDER' | 'DROPPER' | 'CHECK' | 'JUMPER' | 'SWIPER' | 'SIMON' | 'BALANCE' | 'CLASH' | 'FLIP';

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
    const rippleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadScripts = async () => {
            // Charger jQuery si nécessaire
            if (!(window as any).jQuery) {
                await new Promise<void>((resolve) => {
                    const scriptJQ = document.createElement("script");
                    scriptJQ.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
                    scriptJQ.onload = () => resolve();
                    document.body.appendChild(scriptJQ);
                });
            }

            // Charger jQuery Ripples
            await new Promise<void>((resolve) => {
                const scriptRipple = document.createElement("script");
                scriptRipple.src ="https://cdn.jsdelivr.net/npm/jquery.ripples@0.6.3/dist/jquery.ripples.min.js";
                scriptRipple.onload = () => resolve();
                document.body.appendChild(scriptRipple);
            });

            // Initialiser l’effet sur le div
            if (rippleRef.current && (window as any).jQuery) {
                const $r = (window as any).jQuery(rippleRef.current);

                $r.ripples({
                    resolution: 512,
                    dropRadius: 30,      // taille des vagues comme sur Webflow
                    perturbance: 0.08,   // amplitude faible comme sur Webflow
                    interactive: true,   // suit la souris
                });

                // Mettre le canvas au-dessus
                const canvas = rippleRef.current.querySelector("canvas") as HTMLCanvasElement;
                if (canvas) {
                    canvas.style.position = "absolute";
                    canvas.style.top = "0";
                    canvas.style.left = "0";
                    canvas.style.width = "100%";
                    canvas.style.height = "100%";
                    canvas.style.zIndex = "0";
                    canvas.style.pointerEvents = "none";
                }
            }
        };

        loadScripts();

        return () => {
            if (rippleRef.current && (window as any).jQuery) {
                (window as any).jQuery(rippleRef.current).ripples("destroy");
            }
        };
    }, []);

    return (
        <div
            ref={rippleRef}
            style={{
                width: "100%",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
                backgroundColor: "#a0e9ff",
            }}
            className="flex h-full w-full relative"
        >
            {/* Dashboard contenu */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 bg-opacity-70 backdrop-blur-sm ">
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
                    v4.5.1 (12 Games)
                </div>
            </aside>

            <main
                className="flex-1 p-8 overflow-y-auto bg-blue-800  rounded-tl-xl">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-100">Vue d'ensemble</h1>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm">
                        + Créer une offre
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Nouveaux CVs" value="128" color="bg-blue-50 text-blue-700" />
                    <StatCard title="En attente manager" value="14" color="bg-orange-50 text-orange-700" />
                    <StatCard title="Offres actives" value="5" color="bg-emerald-50 text-emerald-700" />
                </div>

                <div className="bg-white/70 rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="p-4 border-b border-slate-100 font-semibold text-slate-700">
                        Candidatures Récentes
                    </div>
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

// --- PARTIE 2 : HUB ARCADE (MIS A JOUR AVEC 12 JEUX) ---

function ArcadeRoom({ onExit }: { onExit: () => void }) {
    const [game, setGame] = useState<GameMode>('NONE');

    return (
        <div className="h-screen w-full bg-gray-950 text-white flex flex-col relative overflow-hidden font-mono">
            <div className="h-14 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 z-20 shadow-lg">
                <div className="flex items-center gap-2 text-green-400">
                    <Terminal size={20} />
                    <span className="font-bold tracking-widest text-sm md:text-base">SECRET_DEV_BG_DU_69</span>
                </div>
                <button onClick={onExit} className="text-xs bg-red-600/20 text-red-400 border border-red-500/50 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition">
                    SORTIR
                </button>
            </div>

            <div className="flex-1 relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                {game === 'NONE' && (
                    <div className="absolute inset-0 overflow-y-auto p-8">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-4xl font-black mb-2 text-transparent bg-clip-text bg-linear-to-r from-green-400 to-blue-500">
                                Choisis ton jeu
                            </h2>
                            <p className="text-gray-400 mb-8">Sélectionnez un module (13 disponibles).</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                                {/* JEUX 1-6 (EXISTANTS) */}
                                <GameCard title="CV BLASTER" subtitle="Shoot 'em up" desc="Détruisez les mauvais CVs avant l'invasion." icon={<Crosshair size={32} />} color="from-blue-600 to-blue-800" onClick={() => setGame('SHOOTER')} />
                                <GameCard title="COFFEE SNAKE" subtitle="Classic Snake" desc="Buvez le café. Évitez les murs. Gérez la file d'attente." icon={<Coffee size={32} />} color="from-green-600 to-emerald-800" onClick={() => setGame('SNAKE')} />
                                <GameCard title="BULLSH*T BINGO" subtitle="Reflex Clicker" desc="Cliquez sur les buzzwords corporatifs vides de sens." icon={<AlertTriangle size={32} />} color="from-orange-600 to-red-800" onClick={() => setGame('BINGO')} />
                                <GameCard title="TALENT MATCH" subtitle="Memory Card" desc="Trouvez les paires de technologies compatibles." icon={<Brain size={32} />} color="from-purple-600 to-indigo-800" onClick={() => setGame('MEMORY')} />
                                <GameCard title="INBOX TYPER" subtitle="Typing Defense" desc="Tapez les mots pour détruire les emails urgents." icon={<Mail size={32} />} color="from-pink-600 to-rose-800" onClick={() => setGame('TYPER')} />
                                <GameCard title="BUDGET BALANCER" subtitle="Timing Slider" desc="Négociez la bonne offre ! Arrêtez le curseur sur la zone verte." icon={<DollarSign size={32} />} color="from-yellow-500 to-amber-700" onClick={() => setGame('SLIDER')} />

                                {/* JEUX 7-9 (RÉCENTS) */}
                                <GameCard title="DEP DROPPER" subtitle="Precision Timing" desc="Déposez le module de dépendance sur la bonne plateforme. La cible rétrécit !" icon={<Package size={32} />} color="from-cyan-500 to-teal-700" onClick={() => setGame('DROPPER')} />
                                <GameCard title="HEALTH CHECK HERO" subtitle="Deduction Puzzle (Démineur)" desc="Localisez les serveurs avec erreur critique ('Mines') en utilisant les indices de proximité." icon={<Bomb size={32} />} color="from-lime-500 to-green-700" onClick={() => setGame('CHECK')} />
                                <GameCard title="JIRA JUMPER" subtitle="Endless Runner" desc="Sautez par-dessus les tickets 'bloquants' et les demandes de dernière minute. Timing !" icon={<ListChecks size={32} />} color="from-red-700 to-red-900" onClick={() => setGame('JUMPER')} />

                                {/* JEUX 10-12 (SIMON, BALANCE) */}
                                <GameCard
                                    title="CV SWIPER" subtitle="Tinder for Recruiters" desc="Triez les CVs à la vitesse de l'éclair ! Droite = OK (Tech), Gauche = KO (Bullshit)." icon={<ArrowLeftRight size={32} />} color="from-amber-600 to-yellow-800" onClick={() => setGame('SWIPER')}
                                />
                                <GameCard
                                    title="SECURITY PING" subtitle="Simon Says Memory" desc="Répétez la séquence de sécurité grandissante. Une seule erreur et le serveur est verrouillé." icon={<Lock size={32} />} color="from-blue-700 to-cyan-900" onClick={() => setGame('SIMON')}
                                />
                                <GameCard
                                    title="EGO LIFTER" subtitle="Balance Manager" desc="Maintenez l'équilibre de l'égo du manager. Contrez les mouvements avant la chute." icon={<Smile size={32} />} color="from-fuchsia-600 to-pink-800" onClick={() => setGame('BALANCE')}
                                />

                                {/* JEU 13 - RECRUITMENT CLASH */}
                                <GameCard
                                    title="RECRUITMENT CLASH" subtitle="Angry Birds RH" desc="Lancez des candidats contre les boss du recrutement ! Visez, tirez, gérez les entretiens." icon={<Flame size={32} />} color="from-red-700 to-orange-900" onClick={() => setGame('CLASH')}
                                />

                                {/* JEU 13 - THE FLIP */}
                                <GameCard
                                    title="THE FLIP" subtitle="Pile ou Face RH" desc="Le stress de la décision. Choisissez : Garder (P) ou Virer (F) ? Le hasard décide." icon={<ArrowLeftRight size={32} />} color="from-yellow-400 to-amber-600" onClick={() => setGame('FLIP')}
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
                            {game === 'DROPPER' && <DepDropperGame onBack={() => setGame('NONE')} />}
                            {game === 'CHECK' && <HealthCheckHeroGame onBack={() => setGame('NONE')} />}
                            {game === 'JUMPER' && <JiraJumperGame onBack={() => setGame('NONE')} />}
                            {/* NOUVEAU JEU SWIPER */}
                            {game === 'SWIPER' && <CvSwiperGame onBack={() => setGame('NONE')} />}
                            {game === 'SIMON' && <SecurityPingGame onBack={() => setGame('NONE')} />}
                            {game === 'BALANCE' && <EgoLifterGame onBack={() => setGame('NONE')} />}
                            {game === 'CLASH' && <RecruitmentClashGame onBack={() => setGame('NONE')} />}
                            {game === 'FLIP' && <TheFlipGame onBack={() => setGame('NONE')} />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ============================================================================
// --- NOUVEAU JEU 10 : CV SWIPER (SWIPER) ---
// ============================================================================

type CvType = {
    id: number;
    name: string;
    keywords: string[];
    isGood: boolean; // True = Swipe Right (Good Match), False = Swipe Left (Bad Match)
};

const GOOD_KEYWORDS = ['Python', 'Kubernetes', 'Cloud', 'Agile', 'Microservices', 'Clean Code', 'CI/CD', 'Security', 'Rust', 'TDD'];
const BAD_KEYWORDS = ['Rockstar', 'Synergie', 'Disruptif', '10x Engineer', 'Proactif', 'Ninja', 'Visionnaire', 'Pensée Latérale', 'Gourou', 'Full Stack (Junior)'];
const NAMES = ["Jean Dupont", "Alice Martin", "Paul Dubois", "Sophie Leclerc", "Thomas Robert", "Julie Moreau"];

function generateCv(): CvType {
    const isGood = Math.random() > 0.5;
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    let keywords: string[] = [];

    const numKeywords = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numKeywords; i++) {
        if (isGood) {
            keywords.push(GOOD_KEYWORDS[Math.floor(Math.random() * GOOD_KEYWORDS.length)]);
        } else {
            keywords.push(BAD_KEYWORDS[Math.floor(Math.random() * BAD_KEYWORDS.length)]);
        }
    }
    // Assurer que les bons CVs n'ont pas de "bullshit" et inversement
    if (isGood && Math.random() < 0.2) { // 20% des bons CVs ont un mot-clé douteux
        keywords[Math.floor(Math.random() * keywords.length)] = BAD_KEYWORDS[Math.floor(Math.random() * 5)];
    }
    if (!isGood && Math.random() < 0.2) { // 20% des mauvais CVs ont un bon mot-clé
        keywords[Math.floor(Math.random() * keywords.length)] = GOOD_KEYWORDS[Math.floor(Math.random() * 5)];
    }

    // Retirer les doublons
    keywords = Array.from(new Set(keywords));

    return { id: Date.now() + Math.random(), name, keywords, isGood };
}

function CvSwiperGame({ onBack }: { onBack: () => void }) {
    const [currentCv, setCurrentCv] = useState<CvType>(generateCv());
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0);
    const [timer, setTimer] = useState(600); // Temps en centièmes de seconde
    const [gameOver, setGameOver] = useState(false);
    const timerRef = useRef<number>();
    const speedRef = useRef(600); // Temps initial pour classer un CV

    const startTimer = useCallback(() => {
        if (gameOver) return;
        timerRef.current = window.setInterval(() => {
            setTimer(t => {
                if (t <= 0) {
                    setGameOver(true);
                    return 0;
                }
                return t - 1;
            });
        }, 10); // Intervalle de 10ms
    }, [gameOver]);

    useEffect(() => {
        startTimer();
        return () => window.clearInterval(timerRef.current);
    }, [startTimer]);

    const handleSwipe = useCallback((swipeRight: boolean) => {
        if (gameOver) return;

        const isCorrect = (currentCv.isGood === swipeRight);

        if (isCorrect) {
            setScore(s => s + 10 + Math.min(streak * 2, 50)); // Bonus de streak
            setStreak(s => s + 1);

            // Augmente la difficulté: réduit le temps et augmente la vitesse
            speedRef.current = Math.max(80, speedRef.current - 2);

            setTimer(speedRef.current);
            setCurrentCv(generateCv());

        } else {
            setStreak(0);
            setScore(s => Math.max(0, s - 15)); // Pénalité pour mauvaise classification

            // Petite pénalité de temps ou de difficulté pour une erreur
            speedRef.current = Math.min(300, speedRef.current + 10);
            setTimer(speedRef.current);
            setCurrentCv(generateCv());
        }
    }, [gameOver, currentCv, streak]);

    // Contrôles Clavier
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'd') {
                e.preventDefault();
                handleSwipe(true); // Right = Good Match
            } else if (e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'a') {
                e.preventDefault();
                handleSwipe(false); // Left = Bad Match
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleSwipe]);

    const handleRestart = () => {
        setScore(0);
        setStreak(0);
        setGameOver(false);
        speedRef.current = 250;
        setTimer(speedRef.current);
        setCurrentCv(generateCv());
        startTimer();
    };

    // Affichage du temps
    const displayTime = (timer / 100).toFixed(2);
    const timeColor = timer / speedRef.current < 0.25 ? 'text-red-500' : 'text-yellow-400';

    // UI du CV
    const renderCv = () => (
        <div className="w-96 p-6 bg-white rounded-xl shadow-2xl border-4 border-yellow-400 relative">
            <FileText size={48} className="absolute top-4 left-4 text-gray-300 opacity-70" />
            <h3 className="text-3xl font-black text-slate-800 border-b pb-2 mb-4 mt-8">{currentCv.name}</h3>
            <p className="text-sm text-gray-600 mb-4">Profil: Développeur Senior / Architecte</p>

            <div className="text-left">
                <p className="text-lg font-bold text-slate-700 mb-2">Compétences Clés:</p>
                <div className="flex flex-wrap gap-2">
                    {currentCv.keywords.map((kw, index) => {
                        const isGood = GOOD_KEYWORDS.includes(kw);
                        const isBad = BAD_KEYWORDS.includes(kw);
                        let style = "px-3 py-1 rounded-full text-xs font-semibold";
                        if (isGood) style += " bg-green-100 text-green-800";
                        else if (isBad) style += " bg-red-100 text-red-800 line-through";
                        else style += " bg-gray-100 text-gray-600";
                        return <span key={index} className={style}>{kw}</span>;
                    })}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t text-sm text-gray-500 italic">
                A déjà trié: {score / 10} CVs
            </div>
        </div>
    );

    return (
        <div className="w-full h-full bg-slate-900 relative p-8 flex flex-col items-center font-mono">
            <GameUI score={score} title="CV SWIPER" onBack={onBack} gameOver={gameOver} onRestart={handleRestart} customMsg="Score" />

            {/* Barre de Temps & Streak */}
            <div className="absolute top-4 right-4 z-10 flex flex-col items-end">
                <div className="text-xl font-bold p-2 bg-gray-800/80 rounded-lg shadow-xl mb-2">
                    🔥 STREAK: <span className="text-orange-400">{streak}</span>
                </div>
                <div className="text-3xl font-black p-2 bg-gray-800/80 rounded-lg shadow-xl">
                    Temps : <span className={timeColor}>{displayTime}s</span>
                </div>
            </div>

            <div className="mt-20 flex flex-col items-center">
                <h3 className="text-xl text-gray-300 mb-6 uppercase tracking-widest">
                    CLASSIFIEZ LE CANDIDAT :
                </h3>

                {renderCv()}

                <div className="flex gap-10 mt-12">
                    <button
                        onClick={() => handleSwipe(false)}
                        disabled={gameOver}
                        className="flex items-center gap-3 p-4 bg-red-600 hover:bg-red-700 transition-colors rounded-xl text-white font-black text-2xl shadow-lg border-2 border-red-400 active:scale-95"
                    >
                        <ArrowLeftRight size={32} className="rotate-180" /> REJETER (KO)
                    </button>
                    <button
                        onClick={() => handleSwipe(true)}
                        disabled={gameOver}
                        className="flex items-center gap-3 p-4 bg-green-600 hover:bg-green-700 transition-colors rounded-xl text-white font-black text-2xl shadow-lg border-2 border-green-400 active:scale-95"
                    >
                        MATCH (OK) <ArrowLeftRight size={32} />
                    </button>
                </div>

                <p className="mt-8 text-lg text-yellow-300/80">
                    Utilisez [Flèche Gauche] (KO) et [Flèche Droite] (OK)
                </p>
            </div>
        </div>
    );
}


// --- JEU 9 : JIRA JUMPER (JUMPER) ---
function JiraJumperGame({ onBack }: { onBack: () => void }) {
    // État géré par useState pour l'affichage (moins de mises à jour)
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [, forceUpdate] = useState(0);

    // État interne géré par useRef pour la boucle de jeu (plus rapide)
    const gameState = useRef({
        playerY: 0,
        playerVelocity: 0,
        isJumping: false,
        obstacles: [] as { id: number; x: number; height: number; type: 'TICKET'; passed: boolean }[], // Ajout de 'passed'
        gameSpeed: 5,
        obstacleSpawnTimer: 0,
        gameOver: false
    });
    const gameLoopRef = useRef<number>();

    // Constantes du jeu
    const GRAVITY = 1;
    const JUMP_FORCE = 18;
    const PLAYER_X = 10;

    const handleJump = useCallback(() => {
        const state = gameState.current;
        if (gameOver || state.isJumping) return;

        state.isJumping = true;
        state.playerVelocity = JUMP_FORCE;
    }, [gameOver]);

    const updateGame = useCallback(() => {
        const state = gameState.current;
        if (state.gameOver) return;

        // 1. Logique de Saut et Gravité (inchangé)
        if (state.isJumping) {
            state.playerY += state.playerVelocity;
            state.playerVelocity -= GRAVITY;

            if (state.playerY <= 0) {
                state.playerY = 0;
                state.playerVelocity = 0;
                state.isJumping = false;
            }
        }

        // 2. Logique des Obstacles et Collision
        let newObstacles = state.obstacles.map(o => ({
            ...o,
            x: o.x - state.gameSpeed * 0.15
        }));

        let hit = false;
        const playerBottom = state.playerY + 8;
        const playerTop = state.playerY + 32;

        for (const obstacle of newObstacles) {
            const obsWidth = 5;

            // Vérification simple de collision X
            if (obstacle.x > PLAYER_X - obsWidth && obstacle.x < PLAYER_X + 2) {
                if (playerBottom <= obstacle.height && playerTop > obstacle.height) {
                    hit = true;
                    break;
                }
            }

            // NOUVEAU: Logique de score (ticket passé)
            if (!obstacle.passed && obstacle.x < PLAYER_X - 5) {
                obstacle.passed = true;
                setScore(s => s + 1); // Incrémentation du score
            }
        }

        if (hit) {
            state.gameOver = true;
            setGameOver(true);
            return;
        }

        // Filtrage des obstacles sortis de l'écran
        state.obstacles = newObstacles.filter(o => o.x > 0);

        // 3. Spawner (inchangé)
        state.obstacleSpawnTimer++;
        const spawnRate = Math.max(80, 200 - Math.floor(score / 5));

        if (state.obstacleSpawnTimer > spawnRate) {
            const height = 10 + Math.floor(Math.random() * 20);
            state.obstacles.push({ id: Math.random(), x: 100, height: height, type: 'TICKET', passed: false }); // Ajout de passed: false
            state.obstacleSpawnTimer = 0;
        }

        // 4. Vitesse Corrigée (progression plus douce)
        state.gameSpeed = Math.min(10, 5 + Math.sqrt(score) / 10);

        forceUpdate(n => n + 1);
    }, [score]); // score est maintenant une dépendance car il est utilisé pour la vitesse

    useEffect(() => {
        const gameLoop = () => {
            updateGame();
            if (!gameState.current.gameOver) {
                gameLoopRef.current = requestAnimationFrame(gameLoop);
            }
        };

        if (!gameOver) {
            gameLoopRef.current = requestAnimationFrame(gameLoop);
        }

        return () => cancelAnimationFrame(gameLoopRef.current!);
    }, [gameOver, updateGame]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                handleJump();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleJump]);

    const handleRestart = () => {
        setScore(0);
        setGameOver(false);
        gameState.current = {
            playerY: 0,
            playerVelocity: 0,
            isJumping: false,
            obstacles: [],
            gameSpeed: 5,
            obstacleSpawnTimer: 0,
            gameOver: false
        };
        forceUpdate(0);
    };

    return (
        <div className="w-full h-full bg-slate-900 relative p-8 flex flex-col items-center font-mono">
            <GameUI score={score} title="JIRA JUMPER" onBack={onBack} gameOver={gameOver} onRestart={handleRestart} customMsg="Tickets évités" />

            {/* ... Reste de l'UI du jeu ... */}

            <div className="w-full max-w-4xl h-64 border-4 border-slate-700 bg-black/50 relative overflow-hidden mt-20">
                {/* Sol */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-slate-700/80" />

                {/* Joueur */}
                <div
                    className="absolute w-8 h-8 bg-red-500 rounded-lg transform transition-colors duration-100 ease-out"
                    style={{
                        left: `${PLAYER_X}%`,
                        bottom: `${gameState.current.playerY}px`,
                        width: '32px',
                        height: '32px'
                    }}
                >
                    <ListChecks size={20} className="text-white m-auto mt-1" />
                </div>

                {/* Obstacles (Tickets) */}
                {gameState.current.obstacles.map(o => (
                    <div
                        key={o.id}
                        className="absolute w-5 bg-red-700/80 border-2 border-red-500 rounded-t-sm"
                        style={{
                            left: `${o.x}%`,
                            height: `${o.height}px`,
                            bottom: '4px',
                            width: '20px'
                        }}
                    >
                        <ListPlus size={10} className="text-white m-auto mt-0.5" />
                    </div>
                ))}
            </div>

            <p className="mt-8 text-xl text-yellow-300/80">
                APPUYEZ SUR [ESPACE] POUR SAUTER LES TICKETS
            </p>
        </div>
    );
}

// --- JEU 11 : SECURITY PING (SIMON SAYS) ---

const PING_COLORS = ['bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-600'];
function SecurityPingGame({ onBack }: { onBack: () => void }) {
    const [sequence, setSequence] = useState<number[]>([]);
    const [inputIndex, setInputIndex] = useState(0);
    const [isFlashing, setIsFlashing] = useState(false);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [activeFlash, setActiveFlash] = useState<number | null>(null);

    const startSequence = useCallback(() => {
        setSequence(p => [...p, Math.floor(Math.random() * 4)]);
        setInputIndex(0);
    }, []);

    useEffect(() => {
        if (gameOver) return;
        if (sequence.length === 0) {
            setTimeout(startSequence, 1000);
            return;
        }

        if (inputIndex === sequence.length) {
            setScore(sequence.length);
            setTimeout(startSequence, 1500);
            return;
        }

        if (inputIndex === 0) {
            // Déclenche la séquence de flash si on attend une nouvelle entrée
            let i = 0;
            const flashInterval = setInterval(() => {
                if (i >= sequence.length) {
                    clearInterval(flashInterval);
                    setIsFlashing(false);
                    return;
                }
                setIsFlashing(true);
                setActiveFlash(sequence[i]);
                setTimeout(() => setActiveFlash(null), 300);
                i++;
            }, 700);
        }

    }, [sequence, inputIndex, gameOver, startSequence]);

    const handleButtonClick = useCallback((buttonIndex: number) => {
        if (isFlashing || gameOver) return;

        // Flash de réponse (petit feedback)
        setActiveFlash(buttonIndex);
        setTimeout(() => setActiveFlash(null), 100);

        if (buttonIndex === sequence[inputIndex]) {
            setInputIndex(i => i + 1);
        } else {
            setGameOver(true);
        }
    }, [isFlashing, gameOver, sequence, inputIndex]);

    const handleRestart = () => {
        setSequence([]);
        setScore(0);
        setGameOver(false);
        setInputIndex(0);
        setIsFlashing(false);
        setActiveFlash(null);
    };

    return (
        <div className="w-full h-full bg-slate-900 relative p-8 flex flex-col items-center justify-center font-mono">
            <GameUI score={score} title="SECURITY PING" onBack={onBack} gameOver={gameOver} onRestart={handleRestart} customMsg="Longueur séquence" />

            <div className="text-xl text-gray-300 mb-6 uppercase tracking-widest flex items-center gap-4">
                <Lock size={30} className="text-cyan-400" />
                {isFlashing ? 'MÉMORISATION...' : (gameOver ? 'SÉQUENCE ERRONÉE !' : 'ENTRÉE REQUISE')}
            </div>

            <div className="grid grid-cols-2 gap-8 p-8 bg-gray-800 rounded-2xl shadow-2xl border-4 border-gray-700">
                {PING_COLORS.map((color, index) => (
                    <button
                        key={index}
                        onClick={() => handleButtonClick(index)}
                        className={`w-32 h-32 rounded-lg transition-all duration-100 
                                    ${color} 
                                    ${isFlashing ? 'cursor-not-allowed' : 'hover:scale-105 active:scale-95 cursor-pointer'}
                                    ${activeFlash === index ? 'shadow-[0_0_25px_8px_#fff] scale-105 opacity-100' : 'opacity-80'}
                                    ${gameOver && 'opacity-30 cursor-not-allowed'}
                        `}
                        disabled={isFlashing || gameOver}
                    />
                ))}
            </div>

            <p className="mt-8 text-lg text-yellow-300/80">
                Répétez la séquence. Longueur actuelle: <span className="text-white font-bold">{sequence.length - 1}</span>
            </p>
        </div>
    );
}

// --- JEU 12 : EGO LIFTER (BALANCE) ---
function EgoLifterGame({ onBack }: { onBack: () => void }) {
    const [balance, setBalance] = useState(0); // -100 (Gauche) à 100 (Droite)
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const gameLogic = useRef({ direction: 1, speed: 1, maxShift: 2 });
    const timerRef = useRef<number>();

    const updateBalance = useCallback((shift: number) => {
        setBalance(b => {
            let newBalance = b + shift;
            if (Math.abs(newBalance) >= 100) {
                setGameOver(true);
                return newBalance >= 100 ? 100 : -100;
            }
            return newBalance;
        });
    }, []);

    const applyCounterForce = useCallback((direction: 'LEFT' | 'RIGHT') => {
        if (gameOver) return;
        const force = direction === 'LEFT' ? -15 : 15;
        updateBalance(force);
    }, [gameOver, updateBalance]);

    // Mouvement automatique (Ego)
    useEffect(() => {
        if (gameOver) {
            clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            const logic = gameLogic.current;
            updateBalance(logic.direction * logic.speed);

            // Change aléatoirement la direction et augmente la difficulté
            if (Math.random() < 0.1) {
                logic.direction *= -1;
                logic.speed = Math.random() * logic.maxShift + 0.5;
            }

            // Augmente la difficulté avec le score (temps passé)
            logic.maxShift = Math.min(5, 2 + score / 500);

            setScore(s => s + 1); // Score basé sur le temps de survie
        }, 100);

        return () => clearInterval(timerRef.current);
    }, [gameOver, updateBalance, score]);

    // Contrôles Clavier
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' || e.key === 'q' || e.key === 'a') {
                e.preventDefault();
                applyCounterForce('LEFT');
            } else if (e.key === 'ArrowRight' || e.key === 'd') {
                e.preventDefault();
                applyCounterForce('RIGHT');
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [applyCounterForce]);

    const handleRestart = () => {
        setScore(0);
        setGameOver(false);
        setBalance(0);
        gameLogic.current = { direction: 1, speed: 1, maxShift: 2 };
    };

    const clamp = (num: number) => Math.min(100, Math.max(-100, num));
    const pivotStyle = { transform: `rotate(${clamp(balance / 3)}deg)` };

    return (
        <div className="w-full h-full bg-slate-900 relative p-8 flex flex-col items-center justify-center font-mono">
            <GameUI score={score} title="EGO LIFTER" onBack={onBack} gameOver={gameOver} onRestart={handleRestart} customMsg="Temps survie" />

            <div className="w-full max-w-2xl h-64 relative mt-20">
                {/* Support (Base) */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-10 bg-slate-700 rounded-b-xl" />
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-600 rounded-full border-2 border-gray-500" />

                {/* La Barre d'Équilibre (Pivot) */}
                <div
                    className="absolute bottom-12 left-1/2 w-full max-w-2xl h-4 bg-yellow-500 shadow-[0_0_10px_#f59e0b] rounded-md transform -translate-x-1/2 transition-transform duration-100 ease-out origin-center"
                    style={pivotStyle}
                >
                    {/* Le Poids (Ego) */}
                    <div
                        className="absolute w-12 h-12 bg-fuchsia-600 rounded-full border-4 border-fuchsia-400 shadow-xl flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${50 + balance / 2}%`, top: '50%' }} // Balance 0 -> 50%
                    >
                        <Smile size={24} className="text-white" />
                    </div>
                </div>
            </div>

            <p className="mt-12 text-xl text-yellow-300/80">
                UTILISEZ [FLÈCHE GAUCHE] ET [FLÈCHE DROITE] POUR CONTRE-BALANCER
            </p>
        </div>
    );
}

// --- JEU 8 : HEALTH CHECK HERO (DÉMINEUR) ---
const ROWS = 8;
const COLS = 8;
const MINES = 10;
interface Cell { isMine: boolean; isRevealed: boolean; isFlagged: boolean; count: number; }
const initializeBoard = (): Cell[][] => {
    let board: Cell[][] = Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => ({ isMine: false, isRevealed: false, isFlagged: false, count: 0 })));
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        const row = Math.floor(Math.random() * ROWS);
        const col = Math.floor(Math.random() * COLS);
        if (!board[row][col].isMine) { board[row][col].isMine = true; minesPlaced++; }
    }
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (board[r][c].isMine) continue;
            let mineCount = 0;
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].isMine) { mineCount++; }
                }
            }
            board[r][c].count = mineCount;
        }
    }
    return board;
};

function HealthCheckHeroGame({ onBack }: { onBack: () => void }) {
    const [board, setBoard] = useState<Cell[][]>(initializeBoard());
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [flagsRemaining, setFlagsRemaining] = useState(MINES);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef<number>();

    useEffect(() => {
        if (!startTime || isGameOver || isGameWon) {
            window.clearInterval(timerRef.current);
            return;
        }
        timerRef.current = window.setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime!) / 1000));
        }, 1000);
        return () => window.clearInterval(timerRef.current);
    }, [startTime, isGameOver, isGameWon]);

    const checkWin = useCallback((currentBoard: Cell[][]) => {
        let hiddenNonMines = 0;
        for (let r = 0; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
                if (!currentBoard[r][c].isMine && !currentBoard[r][c].isRevealed) { hiddenNonMines++; }
            }
        }
        if (hiddenNonMines === 0) {
            setIsGameWon(true);
            window.clearInterval(timerRef.current);
            setBoard(currentBoard.map(row => row.map(cell =>
                cell.isMine && !cell.isFlagged ? { ...cell, isFlagged: true } : cell
            )));
        }
    }, []);

    const revealCell = useCallback((r: number, c: number, currentBoard: Cell[][]): Cell[][] => {
        if (r < 0 || r >= ROWS || c < 0 || c >= COLS || currentBoard[r][c].isRevealed || currentBoard[r][c].isFlagged) { return currentBoard; }
        currentBoard[r][c].isRevealed = true;
        if (currentBoard[r][c].count === 0 && !currentBoard[r][c].isMine) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    revealCell(r + dr, c + dc, currentBoard);
                }
            }
        }
        return currentBoard;
    }, []);

    const handleCellClick = useCallback((r: number, c: number, e: React.MouseEvent) => {
        if (isGameOver || isGameWon) return;
        if (startTime === null) setStartTime(Date.now());
        if (e.button === 0) { // Left click (Reveal)
            const cell = board[r][c];
            if (cell.isRevealed || cell.isFlagged) return;
            if (cell.isMine) {
                setIsGameOver(true);
                window.clearInterval(timerRef.current);
                setBoard(prevBoard => prevBoard.map(row => row.map(c => c.isMine ? { ...c, isRevealed: true } : c)));
                return;
            }
            const newBoard = revealCell(r, c, board.map(row => row.map(cell => ({ ...cell }))));
            setBoard(newBoard);
            checkWin(newBoard);
        } else if (e.button === 2) { // Right click (Flag)
            e.preventDefault();
            const cell = board[r][c];
            if (cell.isRevealed) return;
            const newBoard = board.map(row => row.map(c => ({ ...c })));
            if (cell.isFlagged) {
                newBoard[r][c].isFlagged = false;
                setFlagsRemaining(f => f + 1);
            } else if (flagsRemaining > 0) {
                newBoard[r][c].isFlagged = true;
                setFlagsRemaining(f => f - 1);
            }
            setBoard(newBoard);
        }
    }, [board, isGameOver, isGameWon, startTime, revealCell, checkWin, flagsRemaining]);

    const handleRestart = () => {
        setBoard(initializeBoard());
        setIsGameOver(false);
        setIsGameWon(false);
        setFlagsRemaining(MINES);
        setStartTime(null);
        setElapsedTime(0);
        window.clearInterval(timerRef.current);
    };

    useEffect(() => {
        const disableContextMenu = (e: MouseEvent) => {
            if (e.target instanceof HTMLElement && e.target.closest('.grid')) { e.preventDefault(); }
        };
        window.addEventListener('contextmenu', disableContextMenu);
        return () => window.removeEventListener('contextmenu', disableContextMenu);
    }, []);

    const revealedCells = board.flat().filter(cell => cell.isRevealed).length;
    const score = revealedCells;
    const message = isGameWon ? "SYSTÈMES SÉCURISÉS ! Temps: " : "ERREUR CRITIQUE ! Server KO.";

    const MinesweeperUI = (
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700 shadow-xl">
            <div className="text-2xl font-black text-red-500 flex items-center gap-2"> <Flag size={24} /> {flagsRemaining} </div>
            <h2 className="text-3xl font-black text-yellow-400">
                {isGameWon ? 'WIN' : isGameOver ? 'FAIL' : 'SCANNING...'}
            </h2>
            <div className="text-2xl font-black text-blue-400 flex items-center gap-2"> <Clock size={24} /> {elapsedTime.toString().padStart(3, '0')} </div>
        </div>
    );

    const renderCellContent = (cell: Cell) => {
        if (cell.isRevealed) {
            if (cell.isMine) { return <Bomb size={24} className="text-red-600" />; }
            else if (cell.count > 0) {
                const colorMap = ['text-blue-500', 'text-green-500', 'text-yellow-500', 'text-orange-500', 'text-red-500', 'text-purple-500', 'text-pink-500', 'text-slate-200'];
                return <span className={`text-2xl font-black ${colorMap[cell.count - 1]}`}>{cell.count}</span>;
            } else { return <CheckCircle size={18} className="text-green-500/50" />; }
        } else if (cell.isFlagged) { return <Flag size={20} className="text-yellow-400" />; }
        return null;
    };

    return (
        <div className="w-full h-full bg-slate-900 relative p-8 flex flex-col items-center justify-center font-mono">
            {MinesweeperUI}
            <div className="mt-20">
                <div className="grid border-4 border-gray-700 bg-gray-800"
                    style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)`, width: `${COLS * 50}px`, height: `${ROWS * 50}px` }}>
                    {board.map((row, r) =>
                        row.map((cell, c) => (
                            <div key={`${r}-${c}`} className={`w-12 h-12 flex items-center justify-center border border-gray-700 transition-all duration-100 
                                    ${cell.isRevealed ? 'bg-gray-900' : 'bg-slate-700 hover:bg-slate-600 active:bg-slate-500 cursor-pointer'}`}
                                onClick={(e) => handleCellClick(r, c, e)}
                                onContextMenu={(e) => handleCellClick(r, c, e)}
                            >
                                {renderCellContent(cell)}
                            </div>
                        ))
                    )}
                </div>
            </div>
            <GameUI score={score} title="HEALTH CHECK HERO" onBack={onBack} gameOver={isGameOver || isGameWon} onRestart={handleRestart} customMsg="Serveurs OK" message={isGameWon ? message + `${elapsedTime}s` : message} />
        </div>
    );
}


// --- JEU 7 : DEP DROPPER (MAINTENU) ---
const INITIAL_WIDTH = 25;
const INITIAL_SPEED = 2.5;
function DepDropperGame({ onBack }: { onBack: () => void }) {
    const [blockX, setBlockX] = useState(50);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [target, setTarget] = useState({ position: 45, width: INITIAL_WIDTH });
    const [isMoving, setIsMoving] = useState(true);
    const gameLogic = useRef({ direction: 1, speed: INITIAL_SPEED });
    const timerRef = useRef<number>();

    const startNewRound = useCallback((success: boolean) => {
        if (success) {
            setScore(s => s + 1);
            const newWidth = Math.max(5, target.width - 1.5);
            gameLogic.current.speed = Math.min(10, INITIAL_SPEED + (score + 1) * 0.5);
            const newPos = Math.random() * (100 - newWidth);
            setTarget({ position: newPos, width: newWidth });
            setBlockX(50);
        } else {
            setGameOver(true);
            setIsMoving(false);
            return;
        }
        setIsMoving(true);
        gameLogic.current.direction *= -1;
    }, [score, target.width]);

    useEffect(() => {
        if (gameOver || !isMoving) { clearInterval(timerRef.current); return; }
        timerRef.current = setInterval(() => {
            setBlockX(x => {
                const logic = gameLogic.current;
                let nextX = x + logic.direction * logic.speed / 2;
                if (nextX >= 100 || nextX <= 0) { logic.direction *= -1; nextX = nextX >= 100 ? 100 : 0; }
                return nextX;
            });
        }, 20);
        return () => clearInterval(timerRef.current);
    }, [isMoving, gameOver]);

    const handleDrop = useCallback(() => {
        if (gameOver || !isMoving) return;
        setIsMoving(false);
        clearInterval(timerRef.current);
        const blockCenter = blockX;
        const targetStart = target.position;
        const targetEnd = target.position + target.width;
        if (blockCenter >= targetStart && blockCenter <= targetEnd) {
            setTimeout(() => startNewRound(true), 300);
        } else {
            setTimeout(() => startNewRound(false), 300);
        }
    }, [gameOver, isMoving, blockX, target.position, target.width, startNewRound]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); handleDrop(); }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleDrop]);

    const handleRestart = () => {
        setScore(0); setGameOver(false); setTarget({ position: 45, width: INITIAL_WIDTH });
        gameLogic.current = { direction: 1, speed: INITIAL_SPEED }; startNewRound(true);
    };

    return (
        <div className="w-full h-full bg-slate-900 relative p-8 flex flex-col items-center justify-center font-mono" onClick={handleDrop}>
            <GameUI score={score} title="DEP DROPPER" onBack={onBack} gameOver={gameOver} onRestart={handleRestart} customMsg="Modules empilés" />

            <div className="w-full max-w-4xl h-80 relative mt-16 cursor-crosshair">
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-700" />
                <div className={`absolute top-0 w-8 h-8 bg-teal-400 rounded-lg shadow-[0_0_15px_#2dd4bf] transform -translate-x-1/2 transition-all duration-30 ${isMoving ? 'ease-linear' : 'ease-out'}`} style={{ left: `${blockX}%` }}>
                    <Package size={20} className="text-slate-900 m-auto mt-1" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-slate-700 rounded-b-lg border-t-2 border-slate-600" />
                <div
                    className={`absolute bottom-0 h-10 bg-green-600/80 transition-all duration-300 rounded-t-lg border-2 border-green-400 shadow-[0_0_10px_#10b981]`}
                    style={{ left: `${target.position}%`, width: `${target.width}%`, opacity: gameOver ? 0.3 : 1 }}
                >
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white/70"> {target.width.toFixed(1)}% </span>
                </div>
                {!isMoving && gameOver && (
                    <Frown size={40} className="absolute text-red-500 animate-pulse transition-opacity duration-300"
                        style={{ left: `${blockX}%`, bottom: '20px', transform: 'translateX(-50%)' }} />
                )}
            </div>
            <p className="mt-8 text-xl text-yellow-300/80"> CLIQUEZ OU APPUYEZ SUR [ESPACE] POUR DÉPOSER LE MODULE </p>
        </div>
    );
}

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
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 5 });
    const [dir, setDir] = useState({ x: 0, y: -1 });
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
            switch (e.key) {
                case 'ArrowUp': case 'z': case 'w': if (dir.y !== 1) setDir({ x: 0, y: -1 }); break;
                case 'ArrowDown': case 's': if (dir.y !== -1) setDir({ x: 0, y: 1 }); break;
                case 'ArrowLeft': case 'q': case 'a': if (dir.x !== 1) setDir({ x: -1, y: 0 }); break;
                case 'ArrowRight': case 'd': if (dir.x !== -1) setDir({ x: 1, y: 0 }); break;
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [dir, gameOver]);

    return (
        <div className="w-full h-full bg-slate-900 relative flex items-center justify-center">
            <GameUI score={score} title="COFFEE SNAKE" onBack={onBack} gameOver={gameOver} onRestart={() => { setSnake([{ x: 10, y: 10 }]); setScore(0); setGameOver(false); setDir({ x: 0, y: -1 }); }} />

            <div className="relative bg-black/50 border border-slate-700" style={{ width: 30 * GRID_SIZE, height: 20 * GRID_SIZE }}>
                {snake.map((s, i) => (
                    <div key={i} className="absolute bg-green-500 border border-green-600 rounded-sm"
                        style={{ width: GRID_SIZE - 1, height: GRID_SIZE - 1, left: s.x * GRID_SIZE, top: s.y * GRID_SIZE }} />
                ))}
                <div className="absolute text-yellow-400 flex items-center justify-center"
                    style={{ width: GRID_SIZE, height: GRID_SIZE, left: food.x * GRID_SIZE, top: food.y * GRID_SIZE }}>
                    <Coffee size={16} />
                </div>
            </div>
            <div className="absolute bottom-4 text-slate-500 text-sm">Utilisez les flèches (ou ZQSD/WASD)</div>
        </div>
    );
}

// --- JEU 3 : BULLSH*T BINGO (CLICKER) ---
const WORDS_BINGO = ["ASAP", "Synergie", "Disruptif", "Proactif", "Ninja", "Rockstar", "Agile", "KPI", "Feedback", "Challenge", "Pipeline", "Scalable", "Corporate", "Ping", "Deep Dive"];
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
                if (Math.random() > 0.3) clean.push({ id: Math.random(), text: WORDS_BINGO[Math.floor(Math.random() * WORDS_BINGO.length)], x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, created: Date.now() });
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
                <button key={i.id} onMouseDown={() => { setScore(s => s + 1); setItems(p => p.filter(x => x.id !== i.id)); }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 px-4 py-2 bg-linear-to-r from-pink-500 to-rose-600 text-white font-bold rounded-full shadow-lg hover:scale-110 active:scale-95 animate-in zoom-in duration-200"
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
                setWords(p => [...p, { id: Math.random(), text: EMAILS[Math.floor(Math.random() * EMAILS.length)], x: Math.random() * 80 + 10, y: -10 }]);
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

// --- JEU 6 : BUDGET BALANCER (SLIDER) ---
function SalarySliderGame({ onBack }: { onBack: () => void }) {
    const [barPosition, setBarPosition] = useState(0);
    const [isMoving, setIsMoving] = useState(true);
    const [score, setScore] = useState(0);
    const [targetRange, setTargetRange] = useState({ start: 45, end: 55 });
    const [gameOver, setGameOver] = useState(false);

    const gameLogic = useRef({ speed: 4, direction: 1 });
    const timerRef = useRef<number>();

    const startNewRound = useCallback(() => {
        const start = Math.floor(Math.random() * 80) + 10;
        setTargetRange({ start, end: start + 10 });
        setBarPosition(0);
        setIsMoving(true);
        setGameOver(false);

        gameLogic.current.direction = 1;
        gameLogic.current.speed = Math.min(15, gameLogic.current.speed + 1);
    }, []);

    useEffect(() => {
        if (gameOver || !isMoving) {
            clearInterval(timerRef.current);
            return;
        }

        timerRef.current = setInterval(() => {
            setBarPosition(p => {
                const logic = gameLogic.current;
                let nextPos = p + logic.direction * logic.speed / 2;

                if (nextPos >= 100 || nextPos <= 0) { logic.direction *= -1; nextPos = nextPos >= 100 ? 100 : 0; }
                return nextPos;
            });
        }, 30);

        return () => clearInterval(timerRef.current);
    }, [isMoving, gameOver]);

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
        gameLogic.current.speed = 4;
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

                <div
                    className={`absolute top-0 w-4 h-full bg-yellow-400 shadow-[0_0_10px_#facc15] transform -translate-x-1/2 transition-all duration-50 ${isMoving ? 'ease-linear' : 'ease-out'}`}
                    style={{ left: `${barPosition}%` }}
                />

                <div className="absolute top-0 h-full w-0.5 bg-red-500" style={{ left: `${targetRange.start}%` }} />
                <div className="absolute top-0 h-full w-0.5 bg-red-500" style={{ left: `${targetRange.end}%` }} />
            </div>

            <p className="mt-8 text-xl text-yellow-300/80">
                {isMoving ? "CLIQUEZ POUR NÉGOCIER" : (gameOver ? "OFFRE NON CONCLUE !" : "SUCCESS, PRÉPAREZ-VOUS...")}
            </p>
        </div>
    );
}


// --- JEU 13 : RECRUITMENT CLASH (ANGRY BIRDS) - DESIGN REFAIT ---

type Candidate = { id: number; x: number; y: number; vx: number; vy: number; radius: number; type: string; active: boolean };
type Boss = { id: number; x: number; y: number; width: number; height: number; health: number; maxHealth: number; type: string; emoji: string };

function RecruitmentClashGame({ onBack }: { onBack: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameStateRef = useRef({
        candidates: [] as Candidate[],
        bosses: [] as Boss[],
        isDragging: false,
        dragStart: { x: 0, y: 0 },
        slingshotX: 100,
        slingshotY: 480,
        gameOver: false,
        won: false,
        score: 0,
        launchCount: 0,
        nextCandidateId: 0,
        animationId: 0,
        particles: [] as { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; type: string }[]
    });

    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [bossesList, setBossesList] = useState<Boss[]>([]);
    const [restartKey, setRestartKey] = useState(0);

    // Initialisation et boucle de jeu
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const state = gameStateRef.current;
        state.slingshotX = 100;
        state.slingshotY = canvas.height - 120;

        // Créer les boss initiaux avec emoji
        const createBosses = () => {
            return [
                { id: 1, x: 650, y: 380, width: 60, height: 70, health: 3, maxHealth: 3, type: 'BUREAUCRAT', emoji: '🤵' },
                { id: 2, x: 850, y: 330, width: 60, height: 70, health: 2, maxHealth: 2, type: 'COMPETITOR', emoji: '😈' }
            ];
        };

        state.bosses = createBosses();
        setBossesList(state.bosses);
        setScore(0);
        setWon(false);
        setGameOver(false);
        state.candidates = [];
        state.gameOver = false;
        state.won = false;
        state.launchCount = 0;

        // Boucle de jeu
        const gameLoop = () => {
            // Fond dégradé (ciel)
            const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, '#1a1f2e');
            bgGradient.addColorStop(0.6, '#2d4059');
            bgGradient.addColorStop(1, '#8b9d6f');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Nuages décoratifs
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.beginPath();
            ctx.ellipse(150, 80, 60, 30, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(850, 120, 80, 40, 0, 0, Math.PI * 2);
            ctx.fill();

            // Sol stylisé
            ctx.fillStyle = '#5c7a29';
            ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

            // Herbe détaillée
            ctx.fillStyle = '#6d8b3a';
            for (let i = 0; i < canvas.width; i += 20) {
                ctx.fillRect(i, canvas.height - 60, 10, 8);
            }

            // Mise à jour des particules
            state.particles = state.particles.filter(p => p.life > 0);
            state.particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.3;
                p.life--;

                const alpha = (p.life / p.maxLife) * 0.7;
                ctx.globalAlpha = alpha;
                ctx.fillStyle = p.type === 'hit' ? '#ff4444' : '#44ff44';
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            // Mise à jour physique des candidats
            state.candidates.forEach((cand, idx) => {
                cand.vy += 0.5;
                cand.x += cand.vx;
                cand.y += cand.vy;
                cand.vx *= 0.99;

                // Collision sol
                if (cand.y + cand.radius >= canvas.height - 60) {
                    cand.y = canvas.height - 60 - cand.radius;
                    cand.vy *= -0.5;
                    cand.vx *= 0.85;

                    if (Math.abs(cand.vx) < 0.5 && Math.abs(cand.vy) < 0.5) {
                        state.candidates.splice(idx, 1);
                    }
                }

                // Collision murs
                if (cand.x - cand.radius < 0) {
                    cand.x = cand.radius;
                    cand.vx *= -0.6;
                }
                if (cand.x + cand.radius > canvas.width) {
                    cand.x = canvas.width - cand.radius;
                    cand.vx *= -0.6;
                }

                if (cand.y > canvas.height + 100) {
                    state.candidates.splice(idx, 1);
                }
            });

            // Détection collisions candidats vs boss
            state.candidates.forEach((cand) => {
                state.bosses.forEach((boss, bidx) => {
                    const bossX = boss.x + boss.width / 2;
                    const bossY = boss.y + boss.height / 2;
                    const dist = Math.hypot(cand.x - bossX, cand.y - bossY);
                    const minDist = cand.radius + Math.max(boss.width, boss.height) / 2;

                    if (dist < minDist && cand.active) {
                        boss.health--;
                        cand.active = false;
                        cand.vx *= 0.3;
                        cand.vy *= 0.3;

                        // Créer particules
                        for (let i = 0; i < 8; i++) {
                            const angle = (i / 8) * Math.PI * 2;
                            state.particles.push({
                                x: bossX,
                                y: bossY,
                                vx: Math.cos(angle) * 3,
                                vy: Math.sin(angle) * 3,
                                life: 20,
                                maxLife: 20,
                                type: 'hit'
                            });
                        }

                        setScore(prev => {
                            const newScore = prev + 50;
                            gameStateRef.current.score = newScore;
                            return newScore;
                        });

                        if (boss.health <= 0) {
                            state.bosses.splice(bidx, 1);
                            setBossesList([...state.bosses]);

                            setScore(prev => {
                                const newScore = prev + 200;
                                gameStateRef.current.score = newScore;
                                return newScore;
                            });
                        }
                    }
                });
            });

            // Vérifier victoire
            if (state.bosses.length === 0 && state.launchCount > 0 && !state.won) {
                state.won = true;
                setWon(true);
            }

            // Dessiner candidats (amélioré)
            state.candidates.forEach(cand => {
                const colors: { [key: string]: { main: string; light: string; emoji: string } } = {
                    'DEV': { main: '#00aa00', light: '#00ff00', emoji: '💻' },
                    'DESIGNER': { main: '#ff8800', light: '#ffaa00', emoji: '🎨' },
                    'MANAGER': { main: '#0066ff', light: '#00aaff', emoji: '👔' }
                };
                const color = colors[cand.type] || colors['DEV'];

                // Ombre
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.beginPath();
                ctx.ellipse(cand.x, canvas.height - 60 + 5, cand.radius * 0.8, 5, 0, 0, Math.PI * 2);
                ctx.fill();

                // Balle dégradée
                const ballGradient = ctx.createRadialGradient(cand.x - 5, cand.y - 5, 0, cand.x, cand.y, cand.radius);
                ballGradient.addColorStop(0, color.light);
                ballGradient.addColorStop(1, color.main);
                ctx.fillStyle = ballGradient;
                ctx.beginPath();
                ctx.arc(cand.x, cand.y, cand.radius, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#000';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Emoji
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(color.emoji, cand.x, cand.y);
            });

            // Dessiner boss (amélioré)
            state.bosses.forEach(boss => {
                // Ombre
                ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.fillRect(boss.x, boss.y + boss.height + 3, boss.width, 8);

                // Boss avec dégradé
                const bossGradient = ctx.createLinearGradient(boss.x, boss.y, boss.x, boss.y + boss.height);
                bossGradient.addColorStop(0, '#ff5555');
                bossGradient.addColorStop(1, '#cc0000');
                ctx.fillStyle = bossGradient;
                ctx.fillRect(boss.x, boss.y, boss.width, boss.height);

                // Bordure
                ctx.strokeStyle = '#000';
                ctx.lineWidth = 3;
                ctx.strokeRect(boss.x, boss.y, boss.width, boss.height);

                // Emoji boss
                ctx.fillStyle = boss.emoji;
                ctx.font = 'bold 32px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(boss.emoji, boss.x + boss.width / 2, boss.y + boss.height / 2 - 5);

                // Barre de santé
                const healthPercent = boss.health / boss.maxHealth;
                ctx.fillStyle = '#222';
                ctx.fillRect(boss.x + 5, boss.y - 15, boss.width - 10, 8);

                const healthColor = healthPercent > 0.5 ? '#00ff00' : healthPercent > 0.25 ? '#ffaa00' : '#ff0000';
                ctx.fillStyle = healthColor;
                ctx.fillRect(boss.x + 5, boss.y - 15, (boss.width - 10) * healthPercent, 8);

                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                ctx.strokeRect(boss.x + 5, boss.y - 15, boss.width - 10, 8);
            });

            // Frondeur amélioré
            drawSlingshotUpgrade(ctx, state);



            // Boss restants
            ctx.textAlign = 'right';
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = '#ffaa00';
            ctx.fillText(`Ennemis: ${state.bosses.length}`, canvas.width - 20, 20);

            state.animationId = requestAnimationFrame(gameLoop);
        };

        state.animationId = requestAnimationFrame(gameLoop);

        return () => cancelAnimationFrame(state.animationId);
    }, [restartKey]);

    const drawSlingshotUpgrade = (ctx: CanvasRenderingContext2D, state: typeof gameStateRef.current) => {
        const { slingshotX, slingshotY, isDragging, dragStart, candidates } = state;

        // Ombre du frondeur
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fillRect(slingshotX - 45, slingshotY - 75, 90, 80);

        // Support du frondeur (bois)
        const woodGradient = ctx.createLinearGradient(slingshotX - 40, slingshotY - 70, slingshotX + 40, slingshotY - 55);
        woodGradient.addColorStop(0, '#8B4513');
        woodGradient.addColorStop(1, '#A0522D');
        ctx.fillStyle = woodGradient;
        ctx.fillRect(slingshotX - 40, slingshotY - 70, 80, 15);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.strokeRect(slingshotX - 40, slingshotY - 70, 80, 15);

        // Pivot (métal)
        const pivotGradient = ctx.createRadialGradient(slingshotX, slingshotY, 0, slingshotX, slingshotY, 12);
        pivotGradient.addColorStop(0, '#ffcc00');
        pivotGradient.addColorStop(1, '#cc9900');
        ctx.fillStyle = pivotGradient;
        ctx.beginPath();
        ctx.arc(slingshotX, slingshotY, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Bandes élastiques dynamiques
        const bandColor = isDragging ? '#ff9900' : '#ff6600';
        ctx.strokeStyle = bandColor;
        ctx.lineWidth = isDragging ? 5 : 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Bande gauche
        ctx.beginPath();
        ctx.moveTo(slingshotX - 35, slingshotY - 70);
        ctx.quadraticCurveTo(slingshotX - 20, slingshotY - 30, isDragging ? dragStart.x : slingshotX, isDragging ? dragStart.y : slingshotY);
        ctx.stroke();

        // Bande droite
        ctx.beginPath();
        ctx.moveTo(slingshotX + 35, slingshotY - 70);
        ctx.quadraticCurveTo(slingshotX + 20, slingshotY - 30, isDragging ? dragStart.x : slingshotX, isDragging ? dragStart.y : slingshotY);
        ctx.stroke();

        // Candidat en attente
        if (candidates.length === 0) {
            const candGradient = ctx.createRadialGradient(slingshotX - 4, slingshotY - 54, 0, slingshotX, slingshotY - 50, 16);
            candGradient.addColorStop(0, '#44ff44');
            candGradient.addColorStop(1, '#00aa00');
            ctx.fillStyle = candGradient;
            ctx.beginPath();
            ctx.arc(slingshotX, slingshotY - 50, 16, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('💻', slingshotX, slingshotY - 50);

            // Cercle de drag
            if (!isDragging) {
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                ctx.lineWidth = 2;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.arc(slingshotX, slingshotY - 50, 35, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas || gameOver || won) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const state = gameStateRef.current;
        const dist = Math.hypot(x - state.slingshotX, y - (state.slingshotY - 50));

        if (dist < 50 && state.candidates.length === 0) {
            state.isDragging = true;
            state.dragStart = { x, y };
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const state = gameStateRef.current;
        if (!state.isDragging) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        state.dragStart.x = Math.max(state.slingshotX - 100, Math.min(state.slingshotX + 50, x));
        state.dragStart.y = Math.max(state.slingshotY - 120, Math.min(state.slingshotY + 30, y));
    };

    const handleMouseUp = () => {
        const state = gameStateRef.current;
        if (!state.isDragging) return;

        state.isDragging = false;

        const forceX = (state.slingshotX - state.dragStart.x) * 0.4;
        const forceY = (state.slingshotY - state.dragStart.y) * 0.4;

        if (Math.abs(forceX) < 1 && Math.abs(forceY) < 1) return;

        const types = ['DEV', 'DESIGNER', 'MANAGER'];
        const newCandidate: Candidate = {
            id: state.nextCandidateId++,
            x: state.slingshotX,
            y: state.slingshotY - 50,
            vx: forceX,
            vy: forceY,
            radius: 16,
            type: types[Math.floor(Math.random() * types.length)],
            active: true
        };

        state.candidates.push(newCandidate);
        state.launchCount++;
    };

    const handleRestart = () => {
        setRestartKey(k => k + 1);
    };

    return (
        <div className="w-full h-full bg-slate-900 relative flex flex-col items-center font-mono">
            <GameUI
                score={score}
                title="RECRUITMENT CLASH"
                onBack={onBack}
                gameOver={gameOver || won}
                onRestart={handleRestart}
                customMsg="Points"
                message={won ? `🎉 NIVEAU TERMINÉ !` : ''}
            />

            <canvas
                ref={canvasRef}
                width={1000}
                height={600}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className="rounded-xl cursor-grab active:cursor-grabbing bg-black hover:border-cyan-400 transition-colors"
            />

            <div className="mt-6 text-center">
                <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-2">🎮 Contrôles</p>
                <p className="text-yellow-300/80 text-xs">
                    Tirez le candidat 💻 vers le bas ↓ • Relâchez pour lancer 🚀
                </p>
            </div>
        </div>
    );
}


// ============================================================================
// --- NOUVEAU JEU 14 : THE FLIP (PILE OU FACE DU LICENCIEMENT) ---
// ============================================================================

type Side = 'PILE' | 'FACE';

const FLIP_OUTCOMES: { [key in Side]: { label: string; icon: React.ReactNode; color: string } } = {
    PILE: { label: "Maintenu (P)", icon: <Smile size={40} />, color: "text-green-500" },
    FACE: { label: "Viré (F)", icon: <Frown size={40} />, color: "text-red-500" },
};

function TheFlipGame({ onBack }: { onBack: () => void }) {
    const START_SCORE = 500;
    const WIN_SCORE = 1000;
    const LOSE_SCORE = 0;
    const POINTS_PER_FLIP = 50;

    const [score, setScore] = useState(START_SCORE);
    const [gameOver, setGameOver] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string>('FAITES VOTRE CHOIX...');
    const [playerChoice, setPlayerChoice] = useState<Side | null>(null);
    const [flipResult, setFlipResult] = useState<Side | null>(null);
    const [isFlipping, setIsFlipping] = useState(false);
    const [candidateName, setCandidateName] = useState('Nouveau Candidat');

    const NAMES = ["Kevin D.", "Sarah C.", "Jean M.", "Alice T.", "Paul N.", "Julie L."];

    const chooseCandidate = useCallback(() => {
        setCandidateName(NAMES[Math.floor(Math.random() * NAMES.length)]);
    }, []);

    useEffect(() => {
        chooseCandidate();
    }, [chooseCandidate]);

    const handleFlip = (choice: Side) => {
        if (isFlipping || gameOver) return;

        setPlayerChoice(choice);
        setFlipResult(null);
        setStatusMessage('TIRAGE AU SORT...');
        setIsFlipping(true);

        const actualResult: Side = Math.random() < 0.5 ? 'PILE' : 'FACE';

        // Délai pour simuler le "flip"
        setTimeout(() => {
            setFlipResult(actualResult);
            setIsFlipping(false);

            const decisionWasCorrect = (choice === actualResult);
            let newScore = score;

            if (decisionWasCorrect) {
                newScore = score + POINTS_PER_FLIP;
                setStatusMessage(`✅ Succès ! Le sort est avec vous. (+${POINTS_PER_FLIP})`);
            } else {
                newScore = score - POINTS_PER_FLIP;
                setStatusMessage(`❌ Échec ! Le sort vous contredit. (-${POINTS_PER_FLIP})`);
            }

            setScore(newScore);

            if (newScore >= WIN_SCORE) {
                setGameOver(true);
                setStatusMessage(`VICTOIRE ! Vous avez atteint ${WIN_SCORE} points. Vous êtes un maître du destin !`);
            } else if (newScore <= LOSE_SCORE) {
                setGameOver(true);
                setStatusMessage(`DÉFAITE ! Vous avez atteint ${LOSE_SCORE} points. Le destin vous a rattrapé.`);
            }

            // Prépare le prochain candidat
            if (!gameOver) {
                setTimeout(() => {
                    setPlayerChoice(null);
                    setFlipResult(null);
                    setStatusMessage('FAITES VOTRE CHOIX...');
                    chooseCandidate();
                }, 2000);
            }

        }, 1500); // 1.5s de flip
    };

    const handleRestart = () => {
        setScore(START_SCORE);
        setGameOver(false);
        setStatusMessage('FAITES VOTRE CHOIX...');
        setPlayerChoice(null);
        setFlipResult(null);
        setIsFlipping(false);
        chooseCandidate();
    };

    // Contrôles Clavier
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOver || isFlipping) return;
            if (e.key === 'p' || e.key === 'P') {
                e.preventDefault();
                handleFlip('PILE'); // P = Garder (PILE)
            } else if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                handleFlip('FACE'); // F = Virer (FACE)
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleFlip, isFlipping, gameOver]);

    // Affichage des icônes de résultats
    const ResultIcon = flipResult ? FLIP_OUTCOMES[flipResult].icon : null;
    const ResultLabel = flipResult ? FLIP_OUTCOMES[flipResult].label : '';
    const ResultColor = flipResult ? FLIP_OUTCOMES[flipResult].color : 'text-white';


    return (
        <div className="w-full h-full bg-gray-900 relative p-8 flex flex-col items-center font-mono">
            <GameUI
                score={score}
                title="THE FLIP"
                onBack={onBack}
                gameOver={gameOver}
                onRestart={handleRestart}
                customMsg={`Points (Max ${WIN_SCORE})`}
            />

            <div className="text-center mt-16">
                <h3 className="text-3xl font-black mb-4 text-cyan-400">
                    <Users size={32} className="inline-block mr-2" />
                    Décision pour : <span className="text-white bg-gray-700 p-2 rounded">{candidateName}</span>
                </h3>

                <p className={`text-2xl font-bold mb-10 p-4 rounded-lg border-2 ${gameOver ? 'text-red-500 border-red-500' : 'text-yellow-300 border-yellow-300'}`}>
                    {statusMessage}
                </p>

                <div className="flex justify-center items-center gap-12 my-10">

                    {/* OPTION PILE (Garder) */}
                    <button
                        onClick={() => handleFlip('PILE')}
                        disabled={isFlipping || gameOver}
                        className={`flex flex-col items-center p-6 w-52 h-52 transition-all duration-300 rounded-xl shadow-2xl font-black text-2xl border-4 ${isFlipping ? 'bg-gray-700/50 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 border-green-400 active:scale-95'}`}
                    >
                        {FLIP_OUTCOMES.PILE.icon}
                        <span className="mt-2">GARDER (P)</span>
                        <span className="text-sm font-normal opacity-70 mt-1">L'issue du sort : {FLIP_OUTCOMES.PILE.label}</span>
                    </button>

                    <div className="text-4xl font-extrabold text-white/50">{isFlipping ? '...' : 'OU'}</div>

                    {/* OPTION FACE (Virer) */}
                    <button
                        onClick={() => handleFlip('FACE')}
                        disabled={isFlipping || gameOver}
                        className={`flex flex-col items-center p-6 w-52 h-52 transition-all duration-300 rounded-xl shadow-2xl font-black text-2xl border-4 ${isFlipping ? 'bg-gray-700/50 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 border-red-400 active:scale-95'}`}
                    >
                        {FLIP_OUTCOMES.FACE.icon}
                        <span className="mt-2">VIRER (F)</span>
                        <span className="text-sm font-normal opacity-70 mt-1">L'issue du sort : {FLIP_OUTCOMES.FACE.label}</span>
                    </button>
                </div>

                {/* Résultat du Tirage */}
                {(flipResult || isFlipping) && (
                    <div className={`mt-10 p-6 rounded-xl border-4 ${flipResult ? 'border-white' : 'border-gray-500/50'} w-96 mx-auto`}>
                        <h4 className="text-xl font-bold mb-2 text-gray-400">RÉSULTAT DU SORT :</h4>
                        {isFlipping ? (
                            <div className="animate-spin inline-block">
                                <RotateCcw size={48} className="text-white" />
                            </div>
                        ) : (
                            <div className={`flex items-center justify-center gap-4 ${ResultColor} text-4xl font-black`}>
                                {ResultIcon}
                                {ResultLabel}
                            </div>
                        )}

                    </div>
                )}

                <p className="mt-8 text-xl text-gray-400">
                    Objectif : Atteindre <span className="text-green-400 font-bold">{WIN_SCORE}</span> points.
                    Éviter de tomber à <span className="text-red-400 font-bold">{LOSE_SCORE}</span> points.
                </p>

            </div>
        </div>
    );
}



function GameUI({ score, title, onBack, gameOver, onRestart, customMsg = "SCORE", message = "" }: any) {
    return (
        <>
            {/* Affichage du score dans le coin supérieur gauche si pas Game Over */}
            {!gameOver && (
                <div className="absolute top-4 left-4 z-10 font-mono pointer-events-none p-2 bg-slate-800/80 rounded-lg">
                    <div className="text-3xl text-yellow-400 font-bold drop-shadow-md">{score}</div>
                    <div className="text-sm text-slate-400 opacity-75">{customMsg}</div>
                </div>
            )}

            <button onClick={onBack} className="absolute top-4 right-4 z-30 p-2 bg-slate-800/80 rounded hover:bg-red-900 text-white border border-slate-700">
                <XCircle />
            </button>
            {(gameOver || message.includes("WIN") || message.includes("SÉCURISÉS") || message.includes("ÉCHEC")) && (
                <div className="absolute inset-0 bg-black/85 z-50 flex flex-col items-center justify-center animate-in fade-in">
                    <h2 className={`text-5xl font-black mb-4 tracking-tighter ${message.includes("WIN") || message.includes("SÉCURISÉS") ? 'text-green-500' : 'text-red-500'}`}>
                        {message.includes("WIN") || message.includes("SÉCURISÉS") ? 'VICTOIRE !' : 'ÉCHEC CRITIQUE'}
                    </h2>
                    <p className="text-white text-2xl mb-2 font-mono">{message}</p>
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
            {!gameOver && message && !message.includes("WIN") && !message.includes("SÉCURISÉS") && (
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