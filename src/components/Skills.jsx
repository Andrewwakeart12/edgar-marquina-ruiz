import { useState, useEffect, useRef } from "react";
import { skills } from "../data/content";
import {
  FiServer,
  FiLayout,
  FiTerminal,
  FiActivity,
  FiCheckCircle,
  FiCommand,
  FiMousePointer,
  FiUsers
} from "react-icons/fi";
import "./Skills.css";

const figmaProfiles = [
  {
    chip: "Component · Auto Layout",
    title: "Vue.js & React Ecosystem",
    desc: "Diseño de interfaces escalables, componentes reactivos y estados sincronizados.",
    tags: ["ES6+", "Responsive", "State Management"],
    // Coordenadas donde se posicionan los cursores para este perfil
    edgarPos: { x: 28, y: 38 }, // Sobre el título en edición
    erikaPos: { x: 72, y: 68 }  // Sobre las etiquetas de especificación
  },
  {
    chip: "Frame · Canvas Engine",
    title: "Svelte 5 & Pixi.js Canvas",
    desc: "Renderizado gráfico 2D de alto rendimiento, vectores y layouts dinámicos.",
    tags: ["Canvas 2D", "Performance", "Svelte"],
    edgarPos: { x: 32, y: 38 },
    erikaPos: { x: 65, y: 68 }
  },
  {
    chip: "Design System · Multiplatform",
    title: "Kotlin & Android Architecture",
    desc: "Desarrollo de aplicaciones multiplataforma con flujos asíncronos y Ktor.",
    tags: ["KMP", "Compose", "Coroutines"],
    edgarPos: { x: 35, y: 38 },
    erikaPos: { x: 68, y: 68 }
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("backend");
  
  // --- ESTADOS TERMINAL ---
  const [terminalInput, setTerminalInput] = useState("");
  const terminalInputRef = useRef("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    { type: "sys", text: "[remote-ssh] Connecting to edgar@cachyos-station..." },
    { type: "ok", text: "[remote-ssh] Connection established successfully." },
    { type: "sys", text: "Linux v6.12-cachyos kernel initialized." }
  ]);
  const terminalBodyRef = useRef(null);

  // --- ESTADOS FIGMA INTERACTIVO Y COLABORATIVO ---
  const [profileIndex, setProfileIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [edgarClicking, setEdgarClicking] = useState(false);
  const [erikaClicking, setErikaClicking] = useState(false);

  const currentProfile = figmaProfiles[profileIndex];

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [terminalLogs, terminalInput]);

  // -------------------------------------------------------------
  // RUTINA AUTOMÁTICA TERMINAL
  // -------------------------------------------------------------
  useEffect(() => {
    const isUserActive = isInputFocused || terminalInputRef.current.trim().length > 0;
    if (isUserActive) return;

    const commandsQueue = ["docker ps", "git status", "php artisan queue:work --once", "systemctl status server"];
    let isCancelled = false;

    const simulateHumanTyping = async (commandString) => {
      for (let i = 0; i <= commandString.length; i++) {
        if (isCancelled || isInputFocused) return;
        terminalInputRef.current = commandString.substring(0, i);
        setTerminalInput(terminalInputRef.current);
        await new Promise((r) => setTimeout(r, Math.random() * 80 + 60));
      }
      await new Promise((r) => setTimeout(r, 400));
      if (isCancelled || isInputFocused) return;

      let response = "";
      if (commandString === "docker ps") {
        response = "CONTAINER ID   IMAGE           STATUS\na1b2c3d4e5f    laravel:latest  Up 6 hours (healthy)\nf6e5d4c3b2a    mysql:8.0       Up 6 hours";
      } else if (commandString === "git status") {
        response = "On branch main\nYour branch is up to date with 'origin/main'.\nnothing to commit, working tree clean";
      } else if (commandString === "php artisan queue:work --once") {
        response = "[2026-10-28] Processing: App\\Jobs\\ProcessAmazonScrapeQueue\n[2026-10-28] Processed:  App\\Jobs\\ProcessAmazonScrapeQueue [1,124ms] OK";
      } else if (commandString === "systemctl status server") {
        response = "● server.service - Full Stack Node/PHP Backend\n   Active: active (running) since Wed 2026-10-28";
      }

      setTerminalLogs((prev) => [
        ...prev,
        { type: "cmd", text: `$ ${commandString}` },
        { type: "out", text: response }
      ]);
      terminalInputRef.current = "";
      setTerminalInput("");
    };

    const runRoutine = async () => {
      await new Promise((r) => setTimeout(r, 2000));
      for (let cmd of commandsQueue) {
        if (isCancelled || isInputFocused) break;
        await simulateHumanTyping(cmd);
        await new Promise((r) => setTimeout(r, Math.random() * 4000 + 6000));
      }
    };

    runRoutine();
    return () => { isCancelled = true; };
  }, [isInputFocused]);

  // -------------------------------------------------------------
  // RUTINA DE EDICIÓN Y CURSORES ACTIVOS EN FIGMA
  // -------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== "frontend" || isManualOverride) return;

    let isCancelled = false;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    const runFigmaLiveEditing = async () => {
      while (!isCancelled) {
        const profile = figmaProfiles[profileIndex];
        
        // 1. Edgar hace clic para empezar a editar el texto
        setEdgarClicking(true);
        await delay(300);
        setEdgarClicking(false);

        // 2. Edgar escribe el título letra por letra de forma sincronizada
        setTypedTitle("");
        for (let i = 0; i <= profile.title.length; i++) {
          if (isCancelled || isManualOverride) return;
          setTypedTitle(profile.title.substring(0, i));
          await delay(50);
        }

        // 3. Erika interactúa haciendo clic en las etiquetas simultáneamente
        await delay(400);
        setErikaClicking(true);
        await delay(400);
        setErikaClicking(false);

        await delay(3500); // Pausa para visualización

        if (isCancelled || isManualOverride) break;
        // Rotar al siguiente perfil
        setProfileIndex((prev) => (prev + 1) % figmaProfiles.length);
      }
    };

    runFigmaLiveEditing();
    return () => { isCancelled = true; };
  }, [activeTab, profileIndex, isManualOverride]);

  // Clic manual en la tarjeta por parte del usuario real
  const handleCardClick = () => {
    setIsManualOverride(true);
    const next = (profileIndex + 1) % figmaProfiles.length;
    setProfileIndex(next);
    setTypedTitle(figmaProfiles[next].title);
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim().toLowerCase();
    let response = `bash: command not found: ${cmd}`;

    if (cmd === "docker ps") {
      response = "CONTAINER ID   IMAGE           STATUS\na1b2c3d4e5f    laravel:latest  Up 6 hours (healthy)\nf6e5d4c3b2a    mysql:8.0       Up 6 hours";
    } else if (cmd === "systemctl status server") {
      response = "● server.service - Full Stack Node/PHP Backend\n   Active: active (running) since Wed 2026-10-28";
    } else if (cmd === "git status") {
      response = "On branch main\nYour branch is up to date with 'origin/main'.\nnothing to commit, working tree clean";
    } else if (cmd === "php artisan") {
      response = "Laravel Framework 11.x\n  route:list     List all registered routes\n  queue:work     Start processing jobs";
    } else if (cmd === "clear") {
      setTerminalLogs([]);
      terminalInputRef.current = "";
      setTerminalInput("");
      return;
    } else if (cmd === "help") {
      response = "Available commands: docker ps, systemctl status server, git status, php artisan, clear";
    }

    setTerminalLogs((prev) => [
      ...prev,
      { type: "cmd", text: `$ ${terminalInput}` },
      { type: "out", text: response }
    ]);
    terminalInputRef.current = "";
    setTerminalInput("");
  };

  const backendSkills = skills.find((s) => s.category === "Backend")?.items || [];
  const dbSkills = skills.find((s) => s.category === "Bases de datos")?.items || [];

  return (
    <section id="skills" className="section skills-section">
      <div className="home-section-header">
        <p className="eyebrow">ARQUITECTURA & ENTORNO</p>
        <h2>Competencias & Sandbox</h2>
      </div>

      <div className="skills-workspace">
        <div className="workspace-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "backend" ? "active" : ""}`}
            onClick={() => setActiveTab("backend")}
          >
            <FiServer /> Backend & Servidor
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "frontend" ? "active" : ""}`}
            onClick={() => setActiveTab("frontend")}
          >
            <FiLayout /> Frontend (Figma Frame)
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "ops" ? "active" : ""}`}
            onClick={() => setActiveTab("ops")}
          >
            <FiTerminal /> Linux & Docker CLI
          </button>
        </div>

        <div className="workspace-panel">
          {activeTab === "backend" && (
            <div className="panel-content animate-fade">
              <div className="panel-grid-compact">
                <div className="info-box">
                  <h4><FiActivity /> Núcleo & Protocolos</h4>
                  <p className="muted">APIs RESTful, Laravel y WebSockets asíncronos en tiempo real.</p>
                  <div className="mini-tags">
                    {backendSkills.map((item) => (
                      <span key={item} className="mini-tag">{item}</span>
                    ))}
                  </div>
                </div>
                <div className="info-box">
                  <h4><FiCheckCircle /> Bases de Datos Relacionales</h4>
                  <p className="muted">Modelado relacional, optimización de consultas e indexación MySQL.</p>
                  <div className="mini-tags">
                    {dbSkills.map((item) => (
                      <span key={item} className="mini-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "frontend" && (
            <div className="panel-content animate-fade">
              <div className="figma-artboard-wrapper">
                <div className="figma-frame-title-tag">
                  <span className="collab-indicator"><FiUsers /> 2 cursores activos (Edgar & Usuario)</span>
                </div>

                <div className="figma-frame-canvas">
                  {/* Cursor Edgar (Editando Texto) */}
                  <div
                    className={`figma-animated-cursor edgar ${edgarClicking ? "clicking" : ""}`}
                    style={{ top: `${currentProfile.edgarPos.y}%`, left: `${currentProfile.edgarPos.x}%` }}
                  >
                    <FiMousePointer className="cursor-icon" />
                    <span className="cursor-badge">Edgar (Editing)</span>
                  </div>
                <div className="window-name">Habilidades</div>
                  <div
                    className={`figma-animated-cursor erika ${erikaClicking ? "clicking" : ""}`}
                    style={{ top: `${currentProfile.erikaPos.y}%`, left: `${currentProfile.erikaPos.x}%` }}
                  >
                    <FiMousePointer className="cursor-icon" />
                    <span className="cursor-badge">Usuario (Inspecting)</span>
                  </div>

                  {/* Guías de selección de Figma */}
                  <div className="figma-handle tl"></div>
                  <div className="figma-handle tr"></div>
                  <div className="figma-handle bl"></div>
                  <div className="figma-handle br"></div>

                  <div className="figma-inner-content">
                    <div
                      className="figma-component-card figma-interactive-card"
                      onClick={handleCardClick}
                    >
                      <div className="figma-card-header-row">
                        <span className="figma-chip-label">{currentProfile.chip}</span>
                        <span className="figma-auto-layout-badge">⚡ Live Collab</span>
                      </div>
                      <h4 className={edgarClicking ? "highlight-editing" : ""}>
                        {typedTitle}
                        <span className="figma-caret">|</span>
                      </h4>
                      <p className="muted">{currentProfile.desc}</p>
                      <div className="figma-spec-tags">
                        {currentProfile.tags.map((tag, idx) => (
                          <span
                            key={tag}
                            className={erikaClicking && idx === 0 ? "highlight-tag" : ""}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="figma-resolution-pill">1280 × 832</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "ops" && (
            <div className="panel-content animate-fade">
              <div className="linux-terminal">
                <div className="term-header">
                  <span><FiCommand /> edgar@cachyos-station: ~/production (Remote SSH)</span>
                  <span className="term-hint">
                    {isInputFocused ? "Modo interactivo manual" : "Rutina en vivo activa"}
                  </span>
                </div>
                <div className="term-body" ref={terminalBodyRef}>
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} className={`term-line ${log.type}`}>
                      <pre>{log.text}</pre>
                    </div>
                  ))}
                  <form onSubmit={handleTerminalSubmit} className="term-form">
                    <span className="prompt">$</span>
                    <div className="term-input-line">
                      <span className="typed-text">{terminalInput}</span>
                      <span className="cursor-blink">▋</span>
                      <input
                        type="text"
                        className="hidden-terminal-input"
                        value={terminalInput}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                        onChange={(e) => {
                          terminalInputRef.current = e.target.value;
                          setTerminalInput(e.target.value);
                        }}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}