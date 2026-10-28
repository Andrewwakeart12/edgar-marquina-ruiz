import { useEffect, useRef } from "react";
import "./HalftoneBg.css";
import clickSound from './../assets/audio/water-drop.mp3'

export default function HalftoneBg() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const themeRef = useRef("light");
  const ripplesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    const spacing = 14;
    const baseTime = performance.now();

    const updateTheme = () => {
      themeRef.current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    };

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    updateTheme();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      mouseRef.current.tx = e.clientX / window.innerWidth;
      mouseRef.current.ty = e.clientY / window.innerHeight;
    };

    const onLeave = () => {
      mouseRef.current.tx = 0.5;
      mouseRef.current.ty = 0.5;
    };

    let audioCtx = null;
    let audioBuffer = null;

    const initAudio = async () => {
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        audioCtx = new AudioContextClass();
        
        const response = await fetch(clickSound);
        const arrayBuffer = await response.arrayBuffer();
        audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
      } catch (e) {
        console.log("No se pudo precargar el audio:", e);
      }
    };

    initAudio();

    const onClick = (e) => {
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        start: performance.now(),
        life: 900,
      });
      if (ripplesRef.current.length > 6) ripplesRef.current.shift();
      
      if (audioCtx && audioBuffer) {
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }

        try {
          const source = audioCtx.createBufferSource();
          source.buffer = audioBuffer;

          // Filtro para cambiar el matiz/timbre sin alterar la duración
          const filter = audioCtx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 400 + Math.random() * 2500;
          filter.Q.value = 1.5;

          // Compresor para mantener el volumen absolutamente constante y nivelado
          const compressor = audioCtx.createDynamicsCompressor();
          compressor.threshold.setValueAtTime(-24, audioCtx.currentTime);
          compressor.knee.setValueAtTime(30, audioCtx.currentTime);
          compressor.ratio.setValueAtTime(12, audioCtx.currentTime);
          compressor.attack.setValueAtTime(0.003, audioCtx.currentTime);
          compressor.release.setValueAtTime(0.25, audioCtx.currentTime);

          const gainNode = audioCtx.createGain();
          gainNode.gain.value = 0.25;

          // Conexión: Origen -> Filtro -> Compresor (Volumen Constante) -> Ganancia -> Salida
          source.connect(filter);
          filter.connect(compressor);
          compressor.connect(gainNode);
          gainNode.connect(audioCtx.destination);

          source.start(0);
        } catch (err) {
          console.log(err);
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("click", onClick);

    const draw = (now) => {
      const t = (now - baseTime) * 0.0008;
      const m = mouseRef.current;
      m.x += (m.tx - m.x) * 0.08;
      m.y += (m.ty - m.y) * 0.08;

      const cx = m.x * width;
      const cy = m.y * height;
      const maxR = Math.hypot(width, height) * 0.7;

      const isDark = themeRef.current === "dark";
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = isDark ? "#0D1117" : "#FAFAFC";
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / spacing) + 4;
      const rows = Math.ceil(height / spacing) + 4;
      const ox = (width % spacing) / 2;
      const oy = (height % spacing) / 2;

      ripplesRef.current = ripplesRef.current.filter((r) => now - r.start < r.life);

      for (let y = -2; y < rows; y++) {
        for (let x = -2; x < cols; x++) {
          const px = x * spacing + ox;
          const py = y * spacing + oy;
          const dx = px - cx;
          const dy = py - cy;
          const distMouse = Math.hypot(dx, dy);
          const falloff = Math.max(0, 1 - distMouse / maxR);
          if (falloff <= 0.01) continue;
          const wave = Math.sin(t * 0.5 + distMouse * 0.008) * 0.1 + 0.9;
          const mousePull = Math.max(0, 1 - distMouse / (maxR * 0.2));
          let rippleBoost = 0;
          for (let i = 0; i < ripplesRef.current.length; i++) {
            const r = ripplesRef.current[i];
            const age = (now - r.start) / r.life;
            const rdx = px - r.x;
            const rdy = py - r.y;
            const rdist = Math.hypot(rdx, rdy);
            const ring = Math.abs(rdist - age * Math.max(width, height) * 0.7);
            const ringFall = Math.max(0, 1 - ring / (spacing * 5));
            rippleBoost += ringFall * (1 - age) * 1.0;
          }
          const radius = spacing * 0.1 * falloff * wave * (1 + mousePull * 0.8 + rippleBoost);
          if (radius < 0.22) continue;

          const base = isDark ? 230 : 18;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${base}, ${base}, ${base}, ${0.06 + falloff * 0.14 + mousePull * 0.1 + rippleBoost * 0.22})`;
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalCompositeOperation = isDark ? "screen" : "multiply";
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.55);
      if (isDark) {
        grad.addColorStop(0, `rgba(96, 165, 250, ${0.04 + Math.sin(t * 0.3) * 0.015})`);
        grad.addColorStop(0.6, "rgba(96, 165, 250, 0.02)");
        grad.addColorStop(1, "rgba(96, 165, 250, 0)");
      } else {
        grad.addColorStop(0, `rgba(37, 99, 235, ${0.02 + Math.sin(t * 0.3) * 0.01})`);
        grad.addColorStop(0.6, "rgba(37, 99, 235, 0.012)");
        grad.addColorStop(1, "rgba(37, 99, 235, 0)");
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = "source-over";

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("click", onClick);
      if (audioCtx) audioCtx.close();
    };
  }, []);

  return <canvas ref={canvasRef} className="halftone-bg" aria-hidden="true" />;
}