"use client";
import { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  'a, button, [role="button"], [data-cursor], .cursor-pointer, label';

// Кастомный курсор: точка + кольцо с инерцией.
// Только для мыши (hover + fine pointer) и без prefers-reduced-motion.
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mq.matches && !rm.matches);
    update();
    mq.addEventListener("change", update);
    rm.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      rm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    let mx = -100,
      my = -100,
      rx = -100,
      ry = -100;
    let scale = 1,
      targetScale = 1,
      visible = false,
      raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        rx = mx;
        ry = my;
        ring.current?.classList.add("is-visible");
        dot.current?.classList.add("is-visible");
      }
      const t = e.target as Element | null;
      const field = t?.closest?.("input, textarea");
      const hit = t?.closest?.(INTERACTIVE);
      targetScale = field ? 0.5 : hit ? 1.9 : 1;
      ring.current?.classList.toggle("is-hover", !!hit && !field);
    };
    const onDown = () => (targetScale *= 0.75);
    const onUp = () => (targetScale /= 0.75);
    const onLeave = () => {
      visible = false;
      ring.current?.classList.remove("is-visible");
      dot.current?.classList.remove("is-visible");
    };

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      scale += (targetScale - scale) * 0.2;
      if (ring.current)
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      if (dot.current)
        dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div ref={ring} className="cursor-ring" aria-hidden />
      <div ref={dot} className="cursor-dot" aria-hidden />
    </>
  );
}
