import { useTheme } from "../hook/useTheme";
import "./Navbar.css";
import { MorphIcon } from "morphicons/react";
import { Moon, Sun } from "lucide";

const links = [
  { id: "home", label: "Inicio" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Proyectos" },
  { id: "experience", label: "Experiencia" },
];

export default function Navbar({ active, onNavigate }) {
  const { theme, toggle } = useTheme();

  return (
    <>
      {/* Timeline vertical a la derecha con puntos conectados */}
      <nav className="timeline-nav" aria-label="Navegación principal">
        <div className="timeline-line" />
        <ul className="timeline-links">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <button
                  type="button"
                  className={isActive ? "active" : ""}
                  onClick={() => onNavigate(l.id)}
                  aria-label={l.label}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="label">{l.label}</span>
                  <span className="dot" />
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
        <div className="logo">
        EMR<span className="dinstic">.</span>
        </div>
      {/* Botón flotante de tema */}
      <button
        type="button"
        className="floating-theme-toggle"
        onClick={toggle}
        aria-label={theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
      >
        <MorphIcon 
          icon={theme === "light" ? Moon : Sun} 
          // 🎨 Control dinámico de color según el tema activo
          color={theme === "light" ? "#4f46e5" : "#f59e0b"} 
          // 📏 Tamaño del icono (opcional, ajusta si lo necesitas)
          size={24}
          // 🦘 Configuración de la animación física tipo "Bounce" (Rebote)
          config={{
            tension: 300,   // Mayor tensión = movimiento inicial más rápido
            friction: 12,   // Menor fricción = más oscilaciones/rebote al final
            mass: 1         // Peso del objeto animado
          }}
        />
      </button>
    </>
  );
}


