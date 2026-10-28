import { about } from "../data/content";
import profileImg from "../assets/images/edgar.jpg";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section">
      <h2>Sobre mí</h2>
      <div className="about-grid">
        <img src={profileImg} alt="Edgar Marquina Ruiz" className="profile-img" />
        <div>
          {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}