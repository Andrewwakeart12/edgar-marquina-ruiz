import { profile } from "../data/content";
import { FiMail, FiLinkedin, FiGithub, FiArrowRight } from "react-icons/fi";
import "./Contact.css";

export default function Contact() {
  return (
    <section id="contact" className="section contact">
      <header className="contact-header">
        <h2>Hablemos</h2>
        <p className="muted">Disponible para oportunidades remotas, colaboraciones y proyectos freelance.</p>
      </header>

      <div className="contact-grid">
        <div className="contact-card">
          <h3>Envíame un mensaje</h3>
          <p className="muted">Te respondo lo antes posible.</p>
          <form
            id="contact-form"
            action="https://formspree.io/f/REPLACE_ME"
            method="POST"
            aria-label="Formulario de contacto"
          >
            <div className="field">
              <label htmlFor="contact-name">Nombre</label>
              <input id="contact-name" type="text" name="name" placeholder="Tu nombre" autoComplete="name" required />
            </div>
            <div className="field">
              <label htmlFor="contact-email">Correo</label>
              <input id="contact-email" type="email" name="email" placeholder="tu@correo.com" autoComplete="email" inputMode="email" required />
            </div>
            <div className="field">
              <label htmlFor="contact-message">Mensaje</label>
              <textarea id="contact-message" name="message" placeholder="Cuéntame sobre tu proyecto..." required />
            </div>
            <button type="submit" className="btn primary">
              Enviar mensaje <FiArrowRight aria-hidden="true" />
            </button>
          </form>
        </div>

        <aside className="contact-side">
          <div className="contact-card">
            <h3>Otras formas de contacto</h3>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${profile.email}`}>
                <span className="icon"><FiMail aria-hidden="true" /></span>
                <div>
                  <p>Correo</p>
                  <span className="muted">{profile.email}</span>
                </div>
                <FiArrowRight aria-hidden="true" />
              </a>
              <a className="contact-link" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <span className="icon"><FiLinkedin aria-hidden="true" /></span>
                <div>
                  <p>LinkedIn</p>
                  <span className="muted">Conectemos</span>
                </div>
                <FiArrowRight aria-hidden="true" />
              </a>
              {profile.github && (
                <a className="contact-link" href={profile.github} target="_blank" rel="noopener noreferrer">
                  <span className="icon"><FiGithub aria-hidden="true" /></span>
                  <div>
                    <p>GitHub</p>
                    <span className="muted">Ver repositorios</span>
                  </div>
                  <FiArrowRight aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}