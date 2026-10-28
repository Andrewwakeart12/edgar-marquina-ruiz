import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../data/content";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

// Eagerly import every image in assets/images/ so we can look them up by filename
const imageModules = import.meta.glob("../assets/images/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const imageFor = (filename) => {
  const path = Object.keys(imageModules).find((k) => k.endsWith(`/${filename}`));
  return path ? imageModules[path] : "";
};

const filters = [
  { key: "all", label: "Todos" },
  { key: "laravel", label: "Laravel" },
  { key: "react", label: "React / Vue" },
  { key: "realtime", label: "Tiempo real" },
  { key: "tooling", label: "Herramientas" },
];

export default function Projects() {
  const [active, setActive] = useState("all");

  const visible = projects.filter(
    (p) => active === "all" || p.categories.includes(active)
  );

  return (
    <section id="projects" className="section">
      <h2>Proyectos</h2>
      <div className="filters">
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={active === f.key ? "active" : ""}
            onClick={() => setActive(f.key)}
            aria-pressed={active === f.key}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="projects-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard
              key={p.id}
              project={{ ...p, image: imageFor(p.image) }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}