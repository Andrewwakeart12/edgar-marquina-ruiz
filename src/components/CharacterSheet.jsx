import React, { useState, useEffect } from "react";
import { profile, experience, about } from "../data/content";
import {
  FiArrowLeft,
  FiBriefcase,
  FiPlus,
  FiX,
  FiSun,
  FiMoon
} from "react-icons/fi";
import "./CharacterSheet.css";

export default function CharacterSheet() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("obs_theme") || "dark";
  });

  // Sync theme changes to <html> and broadcast to other components
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("obs_theme", theme);
    window.dispatchEvent(new CustomEvent("themeChange", { detail: theme }));
  }, [theme]);

  // Listen for theme changes triggered elsewhere in the app
  useEffect(() => {
    const handleExternalThemeChange = (e) => {
      if (e.detail && e.detail !== theme) {
        setTheme(e.detail);
      }
    };
    window.addEventListener("themeChange", handleExternalThemeChange);
    return () => window.removeEventListener("themeChange", handleExternalThemeChange);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div id="character-sheet" className="obsiryte-app">
      {/* Top Navbar / Header Bar */}
      <header className="obsiryte-topbar">
        <div className="left-controls">
          <button
            className="icon-btn back-btn"
            title="Volver al Inicio"
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("navigate", { detail: "home" })
              )
            }
          >
            <FiArrowLeft />
          </button>
          <div className="active-tab">
            <span>{profile.name}</span>
            <span className="close-tab-icon">×</span>
          </div>
        </div>

        {/* Theme Toggle Button Added */}
        <div className="right-controls">
          <button
            className="icon-btn theme-toggle-btn"
            onClick={toggleTheme}
            title={`Cambiar a modo ${theme === "dark" ? "claro" : "oscuro"}`}
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="obsiryte-body">
        <main className="obsiryte-editor">
          <div className="doc-subheader">
            <span className="doc-title-small">{profile.name}</span>
            <span className="doc-status">Guardado</span>
          </div>

          {/* Character Card Box */}
          <div className="character-card-box">
            <div className="badge-header">
              <FiBriefcase className="badge-icon" />
              <span>FICHA DE TRAYECTORIA</span>
            </div>

            <div className="character-name-heading">
              <span className="purple-dot">●</span>
              <h1>{profile.name}</h1>
            </div>

            <div className="card-section">
              <span className="section-label">ROLES PRINCIPALES</span>
              <div className="chips-container">
                <span className="chip">
                  {profile.title} <FiX className="chip-remove" />
                </span>
                <button className="chip-add-btn">
                  <FiPlus /> Añadir rol
                </button>
              </div>
            </div>

            <div className="properties-grid">
              <div className="property-row">
                <span className="prop-bullet">•</span>
                <span className="prop-key">TIPO</span>
                <span className="prop-value highlight-badge">PERFIL PROFESIONAL</span>
              </div>
              <div className="property-row">
                <span className="prop-bullet">•</span>
                <span className="prop-key">UBICACIÓN</span>
                <span className="prop-value">{profile.location}</span>
              </div>
              <div className="property-row">
                <span className="prop-bullet">•</span>
                <span className="prop-key">STACK</span>
                <span className="prop-value">{profile.stack}</span>
              </div>
              <div className="property-row">
                <span className="prop-bullet">•</span>
                <span className="prop-key">TIPO DE TRABAJO PREFERIDO</span>
                <span className="prop-value">{profile.availability}</span>
              </div>
            </div>

            <div className="card-footer-action">
              <button className="quitar-ficha-btn">Quitar ficha</button>
            </div>
          </div>

          {/* Fixed Invalid HTML Nesting */}
          <div className="editor-content-area">
            <h3 className="editor-heading">Resumen Ejecutivo</h3>
            {about.paragraphs.map((p, i) => (
              <p key={i} className="editor-paragraph">
                {p}
              </p>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="obsiryte-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-icon">🗂</span>
            <span className="sidebar-title">REFERENCIAS / EMPLEADORES</span>
          </div>
          <div className="sidebar-content">
            {experience && experience.length > 0 ? (
              <div className="references-list">
                {experience.map((job, index) => (
                  <div key={index} className="reference-card-item">
                    <div className="ref-company-title">
                      <span className="ref-dot">▪</span>
                      <strong>{job.company}</strong>
                    </div>
                    <div className="ref-role">{job.role}</div>
                    <div className="ref-period">
                      {job.period} · {job.location}
                    </div>
                    {job.referenceContact && (
                      <div className="ref-contact">
                        Contacto: {job.referenceContact}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-references">
                Esta página no menciona referencias todavía.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}