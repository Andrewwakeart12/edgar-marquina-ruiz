import { experience, education } from "../data/content";
import TimelineItem from "./TimelineItem";

export default function Experience() {
  return (
    <section id="experience" className="section">
      <h2>Experiencia</h2>
      <div className="timeline">
        {experience.map(job => (
          <TimelineItem
            key={job.company}
            title={job.role}
            subtitle={job.company}
            period={`${job.period} · ${job.location}`}
            bullets={job.bullets}
          />
        ))}
      </div>

      <h2 className="mt">Formación</h2>
      <div className="timeline">
        <TimelineItem
          title={education.title}
          period={education.subtitle}
          description={education.description}
        />
      </div>
    </section>
  );
}