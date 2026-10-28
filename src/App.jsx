import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import HalftoneBg from "./components/HalftoneBg";
import CharacterSheet from "./components/CharacterSheet";

const sections = {
  home: <Home />,
  skills: <Skills />,
  projects: <Projects />,
  experience: <Experience />,
  'character-sheet': <CharacterSheet/>
};

export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onNav = (e) => {
      if (e.detail && sections[e.detail]) setActive(e.detail);
    };
    window.addEventListener("navigate", onNav);
    return () => window.removeEventListener("navigate", onNav);
  }, []);

  return (
    <>
      <HalftoneBg />
      <a href="#view" className="skip-link">Saltar al contenido</a>
      <Navbar active={active} onNavigate={setActive} />
      <main id="view" className="view">
        {sections[active] || <Home />}
      </main>
      <Footer />
    </>
  );
}