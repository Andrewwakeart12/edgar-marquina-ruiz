import { motion } from "framer-motion";
import "./TimelineItem.css";

export default function TimelineItem({ title, subtitle, period, bullets, description }) {
  return (
    <motion.div
      className="timeline-item"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
    >
      <h3>
        {title}
        {subtitle && <> · <span>{subtitle}</span></>}
      </h3>
      {period && <span className="date">{period}</span>}
      {bullets && (
        <ul>
          {bullets.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      )}
      {description && <p className="muted">{description}</p>}
    </motion.div>
  );
}