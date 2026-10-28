import { profile } from "../data/content";
import "./Hero.css";
import { FiMapPin, FiClock, FiGlobe } from "react-icons/fi";

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <p className="eyebrow">{profile.title}</p>
      <h1>Hola, soy [<span className="highlight">{profile.name}</span>]</h1>
      <p className="tagline">{profile.stack}</p>
      <p className="subtitle">{profile.summary}</p>
      <div className="cta">
        <a href="#projects" className="btn primary">Ver proyectos</a>
        <a href={profile.cvUrl} className="btn secondary" download>Descargar CV</a>
      </div>
      <ul className="hero-meta">
        <li><FiMapPin aria-hidden="true" /> <span>{profile.location}</span></li>
        <li><FiClock aria-hidden="true" /> <span>{profile.availability}</span></li>
        <li><FiGlobe aria-hidden="true" /> <span>{profile.languages}</span></li>
      </ul>
    </section>
  );
}