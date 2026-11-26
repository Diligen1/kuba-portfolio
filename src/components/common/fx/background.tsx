"use client";
import { useEffect, useRef } from "react";

// Лёгкий фон: мягкие градиентные пятна (CSS) + частицы-созвездие на canvas.
export default function Background() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0,
      h = 0,
      raf = 0,
      frame = 0;
    let color = "255,255,255";
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let ps: P[] = [];

    const readColor = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue("--text-color")
        .trim();
      const m = v.match(/\d+(\.\d+)?/g);
      if (v.startsWith("rgb") && m) color = `${m[0]},${m[1]},${m[2]}`;
      else if (v.startsWith("#")) {
        let hex = v.slice(1);
        if (hex.length === 3) hex = hex.split("").map((x) => x + x).join("");
        const n = parseInt(hex.slice(0, 6), 16);
        color = `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
      }
    };

    let lastW = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = w + "px";
      c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw();
      if (ps.length && w === lastW) return; // мобильная адресная строка — не пересоздаём
      lastW = w;
      const count = Math.max(18, Math.min(60, Math.floor((w * h) / 26000)));
      ps = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6,
      }));
    };

    const LINK = 130;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        if (!reduce) {
          // лёгкое отталкивание от курсора
          const dx = p.x - mouse.x,
            dy = p.y - mouse.y,
            d2 = dx * dx + dy * dy;
          if (d2 < 14000) {
            const f = (1 - d2 / 14000) * 0.6;
            p.x += (dx / Math.sqrt(d2 + 0.01)) * f;
            p.y += (dy / Math.sqrt(d2 + 0.01)) * f;
          }
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }
        ctx.fillStyle = `rgba(${color},0.22)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j];
          const dx = p.x - q.x,
            dy = p.y - q.y;
          if (Math.abs(dx) > LINK || Math.abs(dy) > LINK) continue;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${color},${(1 - d / LINK) * 0.08})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      // цвет читаем не каждый кадр — так плавная смена темы видна и на частицах
      if (frame++ % 8 === 0) readColor();
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) raf = requestAnimationFrame(loop);
    };
    // при reduced-motion перерисовываем только при смене темы
    const mo = new MutationObserver(() => {
      if (reduce) setTimeout(() => (readColor(), draw()), 50);
    });

    resize();
    readColor();
    if (reduce) draw();
    else raf = requestAnimationFrame(loop);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="bg-fx" aria-hidden>
      <div className="bg-blob bg-blob-1" />
      <div className="bg-blob bg-blob-2" />
      <canvas ref={canvas} className="absolute inset-0" />
      <div className="bg-noise" />
    </div>
  );
}
