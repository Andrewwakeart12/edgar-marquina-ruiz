import { motion } from "framer-motion";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  return (
    <motion.article
      className="project-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <img src={project.image} alt={project.title} loading="lazy" />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="tags">
        {project.tags.map(t => <span key={t}>{t}</span>)}
      </div>
    </motion.article>
  );
}