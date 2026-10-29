import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  const initials = project.title
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("");

  return (
    <motion.article
      className="project-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {project.image ? (
        <img src={project.image} alt={project.title} loading="lazy" />
      ) : (
        <div className="project-image-placeholder" aria-hidden="true">
          <span>{initials}</span>
        </div>
      )}
      <div className="card-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map(t => <span key={t}>{t}</span>)}
        </div>
      </div>
    </motion.article>
  );
}