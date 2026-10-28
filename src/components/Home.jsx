import React from "react";
import { profile } from "../data/content";
import profileImg from "../assets/images/edgar.jpg";
import {
  FiMapPin,
  FiClock,
  FiGlobe,
  FiArrowRight,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiMessageSquare,
  FiSend,
  FiCopy
} from "react-icons/fi";
import "./Hero.css";

export default function Home() {
  // Format WhatsApp URL with a friendly pre-filled message
  const whatsappNumber = profile.whatsapp || profile.phone || "";
  const cleanPhone = whatsappNumber.replace(/\D/g, "");
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
      "¡Hola Edgar! Vi tu portafolio y me gustaría ponerme en contacto contigo."
    )}`
    : null;

  const handleCopyEmail = (e) => {
    e.preventDefault();
    if (profile.email) {
      navigator.clipboard.writeText(profile.email);
      alert("¡Correo copiado al portapapeles!");
    }
  };

  return (
    <section id="home" className="home">
      <div className="home-hero">
        <div className="home-hero-content">
          <p className="eyebrow">{profile.title}</p>
          <h1>
            Hola, soy{" "}
            <a
              href="#character-sheet"
              className="link_to_personal_character_sheet"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent("navigate", { detail: "character-sheet" })
                );
              }}
            >
              <span className="bracket">[</span><span className="highlight">{profile.name}</span> <span className="bracket">]</span>
            </a>
          </h1>
          <p className="tagline">{profile.stack}</p>
          <p className="subtitle">{profile.summary}</p>

          {/* Direct CTA Action Row */}
          <div className="cta">
            <button
              className="btn primary"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent("navigate", { detail: "projects" })
                )
              }
            >
              Ver proyectos <FiArrowRight aria-hidden="true" />
            </button>
            <a href={profile.cvUrl} className="btn secondary" download>
              Descargar CV
            </a>
            <div className="quick-connect-buttons">
              <a
                href={`mailto:${profile.email}`}
                className="btn secondary"
                title="Enviar Correo Directo"
              >
                <FiMail aria-hidden="true" />
              </a>

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                  title="Chat por WhatsApp"
                >
                  <FiMessageSquare aria-hidden="true" />
                </a>
              )}

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn secondary"
                  title="Perfil LinkedIn"
                >
                  <FiLinkedin aria-hidden="true" />
                </a>
              )}
            </div>

            {/* Quick One-Click Contact Row */}
            <div className="quick-connect-bar">


              {profile.github && (
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-btn github-btn"
                  title="Perfil GitHub"
                >
                  <FiGithub aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <ul className="hero-meta">
            <li>
              <FiMapPin aria-hidden="true" /> <span>{profile.location}</span>
            </li>
            <li>
              <FiClock aria-hidden="true" /> <span>{profile.availability}</span>
            </li>
            <li>
              <FiGlobe aria-hidden="true" /> <span>{profile.languages}</span>
            </li>
          </ul>
        </div>

        <div className="home-hero-media">
          <div className="profile-frame">
            <img
              src={profileImg}
              alt={profile.name}
              className="profile-img"
            />
          </div>
        </div>
      </div>


    </section>
  );
}