"use client";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";

/* ---------- Прогресс прокрутки ---------- */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 h-[3px] origin-left z-[55] bg-[var(--third-color)]"
    />
  );
}

/* ---------- Магнитная обёртка ---------- */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 15, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Пасхалка: набери "kuba" или код Konami ---------- */
const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function EasterEgg() {
  const [boom, setBoom] = useState(0);

  useEffect(() => {
    let typed = "";
    let seq: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      typed = (typed + (k.length === 1 ? k : "")).slice(-4);
      seq = [...seq, k].slice(-KONAMI.length);
      if (typed === "kuba" || typed === "куба" || seq.join() === KONAMI.join()) {
        typed = "";
        seq = [];
        setBoom((b) => b + 1);
      }
    };
    const onEgg = () => setBoom((b) => b + 1);
    window.addEventListener("keydown", onKey);
    window.addEventListener("ck-egg", onEgg);
    // маленький привет для тех, кто открыл консоль
    console.log(
      "%c CREATOR KUBA %c psst… набери на сайте «kuba» ",
      "background:#001524;color:#00a19a;font:700 14px monospace;padding:4px 8px",
      "color:inherit;font:12px monospace"
    );
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("ck-egg", onEgg);
    };
  }, []);

  return (
    <AnimatePresence>
      {boom > 0 && <Confetti key={boom} onDone={() => setBoom(0)} />}
    </AnimatePresence>
  );
}

function Confetti({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const ctx = c.getContext("2d")!;
    const w = (c.width = window.innerWidth);
    const h = (c.height = window.innerHeight);
    const cs = getComputedStyle(document.documentElement);
    const cols = ["--text-color", "--second-color", "--third-color", "--background-color"].map(
      (v) => cs.getPropertyValue(v).trim() || "#fff"
    );
    const parts = Array.from({ length: 160 }, () => {
      const a = Math.random() * Math.PI * 2;
      const s = Math.random() * 9 + 4;
      return {
        x: w / 2,
        y: h / 2,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s - 4,
        r: Math.random() * 6 + 3,
        rot: Math.random() * 6,
        vr: (Math.random() - 0.5) * 0.4,
        c: cols[Math.floor(Math.random() * cols.length)],
        hex: Math.random() > 0.5,
      };
    });
    let raf = 0;
    const start = performance.now();
    const loop = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.vy += 0.22;
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.c;
        ctx.beginPath();
        if (p.hex) {
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i;
            ctx.lineTo(Math.cos(a) * p.r, Math.sin(a) * p.r);
          }
        } else ctx.rect(-p.r, -p.r / 2, p.r * 2, p.r);
        ctx.fill();
        ctx.restore();
      }
      if (t - start < 2800) raf = requestAnimationFrame(loop);
      else onDone();
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] pointer-events-none"
    >
      <canvas ref={ref} className="absolute inset-0" />
      <motion.p
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="egg-text absolute inset-0 flex items-center justify-center text-center tracking-[10px] text-[28px] md:text-[64px]"
      >
        YOU FOUND KUBA
      </motion.p>
    </motion.div>
  );
}

/* ---------- Анимированный счётчик ---------- */
export function Counter({
  to,
  duration = 1.6,
  delay = 0,
  suffix = "",
}: {
  to: number;
  duration?: number;
  delay?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      el.textContent = to + suffix;
      return;
    }
    const c = animate(0, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = Math.round(v) + suffix),
    });
    return () => c.stop();
  }, [to, duration, delay, suffix, reduce]);
  return <span ref={ref}>0{suffix}</span>;
}
