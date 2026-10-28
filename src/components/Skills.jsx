import React, { useState, useEffect, useRef } from "react";
import { skills } from "../data/content";
import {
  FiServer,
  FiLayout,
  FiTerminal,
  FiActivity,
  FiCheckCircle,
  FiCommand,
  FiSquare,
  FiType,
  FiMousePointer,
  FiLayers,
  FiUsers
} from "react-icons/fi";
import "./Skills.css";

// Perfiles predefinidos para la rotación automática y el clic manual
const figmaProfiles = [
  {
    chip: "Component · Auto Layout",
    title: "Vue.js & React Ecosystem",
    desc: "Diseño de interfaces escalables, componentes reactivos y estados sincronizados.",
    tags: ["ES6+", "Responsive", "State Management"],
    edgarPos: { x: 35, y: 35 },
    erikaPos: { x: 70, y: 75 }
  },
  {
    chip: "Frame · Canvas Engine",
    title: "Svelte 5 & Pixi.js Canvas",
    desc: "Renderizado gráfico 2D de alto rendimiento, vectores y layouts dinámicos.",
    tags: ["Canvas 2D", "Performance", "Svelte"],
    edgarPos: { x: 50, y: 40 },
    erikaPos: { x: 30, y: 70 }
  },
  {
    chip: "Design System · Multiplatform",
    title: "Kotlin & Android Architecture",
    desc: "Desarrollo de aplicaciones multiplataforma con flujos asíncronos y Ktor.",
    tags: ["KMP", "Compose", "Coroutines"],
    edgarPos: { x: 60, y: 35 },
    erikaPos: { x: 45, y: 80 }
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState("backend");
  
  // --- ESTADOS TERMINAL ---
  const [terminalInput, setTerminalInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    { type: "sys", text: "[remote-ssh] Connecting to edgar@cachyos-station..." },
    { type: "ok", text: "[remote-ssh] Connection established successfully." },
    { type: "sys", text: "Linux v6.12-cachyos kernel initialized." }
  ]);
  const terminalBodyRef = useRef(null);

  // --- ESTADOS FIGMA COLABORATIVO INTERACTIVO ---
  const [figmaTool, setFigmaTool] = useState("select");
  const [profileIndex, setProfileIndex] = useState(0);
  const [typedTitle, setTypedTitle] = useState("");
  const [isManualOverride, setIsManualOverride] = useState(false);

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
    const isUserActive = isInputFocused || terminalInput.trim().length > 0;
    if (isUserActive) return;

    const commandsQueue = ["docker ps", "git status", "php artisan queue:work --once", "systemctl status server"];
    let isCancelled = false;

    const simulateHumanTyping = async (commandString) => {
      for (let i = 0; i <= commandString.length; i++) {
        if (isCancelled || isInputFocused) return;
        setTerminalInput(commandString.substring(0, i));
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
  // EFECTO DE TECLEO Y SINCRONIZACIÓN DE CURSORES EN FIGMA
  // -------------------------------------------------------------
  useEffect(() => {
    if (activeTab !== "frontend" || isManualOverride) return;

    let isCancelled = false;
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));

    const runFigmaSequence = async () => {
      while (!isCancelled) {
        const profile = figmaProfiles[profileIndex];
        setFigmaTool("text");

        // Simular tipeo letra por letra del título sincronizado con Edgar
        setTypedTitle("");
        for (let i = 0; i <= profile.title.length; i++) {
          if (isCancelled || isManualOverride) return;
          setTypedTitle(profile.title.substring(0, i));
          await delay(45);
        }

        setFigmaTool("select");
        await delay(4000); // Pausa para que el usuario lea el perfil activo

        if (isCancelled || isManualOverride) break;
        // Pasar al siguiente perfil cíclicamente
        setProfileIndex((prev) => (prev + 1) % figmaProfiles.length);
      }
    };

    runFigmaSequence();
    return () => { isCancelled = true; };
  }, [activeTab, profileIndex, isManualOverride]);

  // Manejo de clic manual por parte del usuario en el componente de Figma
  const handleFigmaCardClick = () => {
    setIsManualOverride(true); // Pausa la animación automática temporalmente
    const nextIndex = (profileIndex + 1) % figmaProfiles.length;
    setProfileIndex(nextIndex);
    setTypedTitle(figmaProfiles[nextIndex].title);
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
            className={`tab-btn ${activeTab === "backend" ? "active" : ""}`}
            onClick={() => setActiveTab("backend")}
          >
            <FiServer /> Backend & Servidor
          </button>
          <button
            className={`tab-btn ${activeTab === "frontend" ? "active" : ""}`}
            onClick={() => setActiveTab("frontend")}
          >
            <FiLayout /> Frontend (Figma Frame)
          </button>
          <button
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
                  MacBook Air - 1 <span className="collab-indicator"><FiUsers /> 2 activos (Edgar & Erika)</span>
                </div>

                <div className="figma-frame-canvas">
                  {/* Cursor Edgar (Sincronizado al título) */}
                  <div
                    className="figma-animated-cursor edgar"
                    style={{ top: `${currentProfile.edgarPos.y}%`, left: `${currentProfile.edgarPos.x}%` }}
                  >
                    <FiMousePointer className="cursor-icon" />
                    <span className="cursor-badge">Edgar</span>
                  </div>

                  {/* Cursor Erika (Sincronizado a las etiquetas o inspección) */}
                  <div
                    className="figma-animated-cursor erika"
                    style={{ top: `${currentProfile.erikaPos.y}%`, left: `${currentProfile.erikaPos.x}%` }}
                  >
                    <FiMousePointer className="cursor-icon" />
                    <span className="cursor-badge">Erika</span>
                  </div>

                  {/* Guías del frame */}
                  <div className="figma-handle tl"></div>
                  <div className="figma-handle tr"></div>
                  <div className="figma-handle bl"></div>
                  <div className="figma-handle br"></div>

                  {/* TarjetaInteractiva con evento onClick para alternar habilidades manualmente */}
                  <div className="figma-inner-content">
                    <div
                      className="figma-component-card figma-interactive-card"
                      onClick={handleFigmaCardClick}
                      title="Haz clic para cambiar de habilidad interactivamente"
                    >
                      <div className="figma-card-header-row">
                        <span className="figma-chip-label">{currentProfile.chip}</span>
                        <span className="figma-auto-layout-badge">⚡ Click para cambiar</span>
                      </div>
                      <h4>
                        {typedTitle}
                        <span className="figma-caret">|</span>
                      </h4>
                      <p className="muted">{currentProfile.desc}</p>
                      <div className="figma-spec-tags">
                        {currentProfile.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="figma-resolution-pill">1280 × 832 (Interactive Canvas)</div>
                </div>

                {/* Toolbar */}
                <div className="figma-floating-toolbar">
                  <button className={`tool-btn ${figmaTool === "select" ? "active" : ""}`} title="Move"><FiMousePointer /></button>
                  <button className={`tool-btn ${figmaTool === "frame" ? "active" : ""}`} title="Frame"><FiLayers /></button>
                  <button className={`tool-btn ${figmaTool === "rect" ? "active" : ""}`} title="Rectangle"><FiSquare /></button>
                  <button className={`tool-btn ${figmaTool === "text" ? "active" : ""}`} title="Text"><FiType /></button>
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
                        onChange={(e) => setTerminalInput(e.target.value)}
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