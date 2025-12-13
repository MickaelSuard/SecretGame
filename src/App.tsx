import React, { useState, useEffect, useRef } from 'react';
import {
    Users, FileText, Briefcase, Settings, CheckCircle,
} from 'lucide-react';



export default function HiddenRecruitmentApp() {

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden select-none">
            <DashboardATS />
        </div>
    );
}

// --- PARTIE 1 : LE DASHBOARD ATS (LEURRE) ---

function DashboardATS() {
    const rippleRef = useRef<HTMLDivElement>(null);
    const $rRef = useRef<any>(null);

    const [effectsActive, setEffectsActive] = useState(false);
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const triggerEasterEgg = () => {
        setShowEasterEgg(true);
        setEffectsActive(true);
        initRipples();
        setTimeout(() => setShowEasterEgg(false), 3000);
    };

    useEffect(() => {
        const loadScripts = async () => {
            if (!(window as any).jQuery) {
                await new Promise<void>((resolve) => {
                    const scriptJQ = document.createElement("script");
                    scriptJQ.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
                    scriptJQ.onload = () => resolve();
                    document.body.appendChild(scriptJQ);
                });
            }

            await new Promise<void>((resolve) => {
                const scriptRipple = document.createElement("script");
                scriptRipple.src =
                    "https://cdn.jsdelivr.net/npm/jquery.ripples@0.6.3/dist/jquery.ripples.min.js";
                scriptRipple.onload = () => resolve();
                document.body.appendChild(scriptRipple);
            });

            // if (rippleRef.current && (window as any).jQuery) {
            //     initRipples();
            // }
        };

        loadScripts();

        return () => {
            destroyRipples();
        };
    }, []);

    const initRipples = () => {
        if (!rippleRef.current || !(window as any).jQuery) return;
        const $r = (window as any).jQuery(rippleRef.current);

        $r.ripples({
            resolution: 512,
            dropRadius: 30,
            perturbance: 0.08,
            interactive: true,
        });

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

        $rRef.current = $r;
    };

    const destroyRipples = () => {
        if ($rRef.current) {
            $rRef.current.ripples("destroy");
            // supprimer le canvas pour pouvoir recréer à la réactivation
            const canvas = rippleRef.current?.querySelector("canvas");
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
            $rRef.current = null;
        }
    };

    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!effectsActive) return;

        const handleMouseMove = (e: MouseEvent) => {
            const buttons = document.querySelectorAll<HTMLButtonElement>("button[data-flee]");
            buttons.forEach((btn) => {
                const rect = btn.getBoundingClientRect();
                const dx = e.clientX - (rect.left + rect.width / 2);
                const dy = e.clientY - (rect.top + rect.height / 2);
                const dist = Math.sqrt(dx * dx + dy * dy);
                const fleeDistance = 120;

                if (dist < fleeDistance) {
                    let newX = rect.left - (dx / dist) * (fleeDistance - dist);
                    let newY = rect.top - (dy / dist) * (fleeDistance - dist);

                    newX = Math.max(0, Math.min(window.innerWidth - rect.width, newX));
                    newY = Math.max(0, Math.min(window.innerHeight - rect.height, newY));

                    btn.style.position = "fixed";
                    btn.style.left = `${newX}px`;
                    btn.style.top = `${newY}px`;
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [effectsActive]);

    useEffect(() => {
        // Remplacer document.getElementById par les refs
        const canvas = canvasRef.current;
        const img = imgRef.current;

        // C'est maintenant la vérification principale
        if (!showEasterEgg || !canvas || !img) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // --- Variables de l'Animation ---
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const gravity = 0.12;

        const rockets: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            targetY: number;
            color: string;
            exploded: boolean;
        }[] = [];

        const particles: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            alpha: number;
            color: string;
        }[] = [];

        let animationFrame: number;
        let interval: number;

        const colors = ["#ff4d4d", "#ffd93d", "#4dd2ff", "#b84dff"];

        // FONCTION MODIFIÉE : N'a plus besoin de prendre rect en paramètre car elle utilise img.getBoundingClientRect()
        const createRocket = () => {
            // L'image a maintenant des dimensions garanties
            const rect = img.getBoundingClientRect();

            rockets.push({
                x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 80,
                y: rect.bottom,
                vx: (Math.random() - 0.5) * 0.6,
                vy: -(4 + Math.random() * 2),
                targetY: rect.top - 120 - Math.random() * 60,
                color: colors[Math.floor(Math.random() * colors.length)],
                exploded: false,
            });
        };

        const explode = (x: number, y: number, color: string) => {
            const explosionColors = [color, "#ffffff", "#cccccc"];
            for (let i = 0; i < 70; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = 2 + Math.random() * 3;

                particles.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    alpha: 1,
                    color: explosionColors[Math.floor(Math.random() * explosionColors.length)],
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Rockets
            for (let i = rockets.length - 1; i >= 0; i--) {
                const r = rockets[i];
                r.x += r.vx;
                r.y += r.vy;
                r.vy += gravity * 0.15;
                ctx.shadowBlur = 10;
                ctx.shadowColor = r.color;
                ctx.fillStyle = r.color;
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 0.5;
                ctx.fillRect(r.x - 1, r.y, 2, r.vy * -5);
                ctx.shadowBlur = 0;

                if (!r.exploded && r.y <= r.targetY) {
                    explode(r.x, r.y, r.color);
                    r.exploded = true;
                    rockets.splice(i, 1);
                }
            }

            // Particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vy += gravity;
                p.alpha -= 0.015;

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.globalAlpha = p.alpha;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            animationFrame = requestAnimationFrame(animate);

            // Mettre fin à l'animation si showEasterEgg est false et que tout est vide
            if (!showEasterEgg && rockets.length === 0 && particles.length === 0) {
                cancelAnimationFrame(animationFrame);
                clearInterval(interval);
                return;
            }
        };

        // NOUVELLE LOGIQUE : Démarre l'animation seulement après le chargement de l'image
        const startFireworks = () => {
            // Empêcher l'exécution si l'effet se déclenche à nouveau
            if (interval) return;

            // 1. Salve initiale (8 à 12 roquettes)
            const initialRocketCount = 8 + Math.floor(Math.random() * 5);
            for (let i = 0; i < initialRocketCount; i++) {
                window.setTimeout(() => {
                    createRocket();
                }, i * 150 + Math.random() * 100);
            }

            // Démarrer la boucle d'animation
            animate();

            // 2. Tir continu 
            interval = window.setInterval(() => {
                createRocket();
            }, 500 + Math.random() * 1000);
        };

        // GESTION DU CHARGEMENT:
        // Si l'image est déjà chargée (c'est souvent le cas si elle est mise en cache)
        if (img.complete) {
            startFireworks();
        } else {
            // Sinon, attendre l'événement 'load'
            img.addEventListener('load', startFireworks);
        }

        return () => {
            cancelAnimationFrame(animationFrame);
            clearInterval(interval);
            // Nettoyage de l'écouteur d'événement si nous l'avons ajouté
            img.removeEventListener('load', startFireworks);
        };
    }, [showEasterEgg]);


    useEffect(() => {
        if (showEasterEgg) {
            document.body.classList.add("cursor-easter-egg");
        } else if (!effectsActive) {
            document.body.classList.remove("cursor-easter-egg");
        }

        return () => {
            if (!effectsActive) {
                document.body.classList.remove("cursor-easter-egg");
            }
        };
    }, [showEasterEgg, effectsActive]);



    return (
        <div
            ref={rippleRef}
            style={{
                width: "100%",
                height: "100vh",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(to bottom, #a0e9ff, #00cfff)",
            }}
            className="flex h-full w-full relative"
        >
            {/* Dashboard contenu */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 bg-opacity-70 backdrop-blur-sm">
                <div className="p-6 text-xl font-bold flex items-center gap-2">
                    <Briefcase className="text-blue-400" /> RecruitPro
                </div>
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <NavItem icon={<Users />} label="Candidats" active buttonRef={buttonRef} />
                    <NavItem icon={<FileText />} label="Offres" buttonRef={buttonRef} />
                    <NavItem icon={<CheckCircle />} label="Entretiens" buttonRef={buttonRef} />
                    <NavItem icon={<Settings />} label="Paramètres" buttonRef={buttonRef} />
                    <button data-flee
                        ref={buttonRef}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-50"
                    >
                        + Créer une offre
                    </button>
                </nav>
                <div
                    className="p-4 text-xs text-slate-600 hover:text-slate-500 cursor-pointer transition-colors text-center"
                    onClick={triggerEasterEgg}
                >
                    v4.5.1 (12 Games)
                </div>
            </aside>

            <main className="flex-1 p-8 overflow-y-auto bg-blue-800 rounded-tl-xl">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-100">Vue d'ensemble</h1>
                    <div className="flex gap-2">
                        <button data-flee
                            ref={buttonRef}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all duration-50"
                        >
                            + Créer une offre
                        </button>
                    </div>
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
            {showEasterEgg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <canvas
                        ref={canvasRef} // Utiliser la ref ici
                        id="fireworks"
                        className="fixed inset-0 pointer-events-none"
                    />

                    <div className="relative z-10">
                        <img
                            ref={imgRef} // Utiliser la ref ici
                            id="easter-egg-img"
                            src="/easterEggs.png"
                            className="easter-egg-img"
                            alt="Easter Egg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}




function NavItem({ icon, label, active = false, buttonRef }: any) {
    return (
        <button ref={buttonRef} data-flee className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition ${active ? 'bg-slate-800 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
            {React.cloneElement(icon, { size: 18 })}
            <span className="font-medium text-sm">{label}</span>
        </button>
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
