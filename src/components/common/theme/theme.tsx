"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { THEMES, STORAGE_KEY } from "./themes";

type ThemeCtx = {
  index: number;
  setTheme: (i: number) => void;
  nextTheme: () => void;
};

const Ctx = createContext<ThemeCtx>({
  index: 0,
  setTheme: () => {},
  nextTheme: () => {},
});

export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [toast, setToast] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const indexRef = useRef(0);

  // Подхватываем тему, уже применённую скриптом в <head>.
  useEffect(() => {
    const cur = document.documentElement.getAttribute("data-theme");
    const i = THEMES.findIndex((t) => t.id === cur);
    if (i > -1) {
      indexRef.current = i;
      setIndex(i);
    }
    // переходы цветов включаем после первой отрисовки, чтобы не было «въезда» темы при загрузке
    const r = requestAnimationFrame(() =>
      document.documentElement.classList.add("theme-anim")
    );
    return () => cancelAnimationFrame(r);
  }, []);

  const setTheme = useCallback((i: number) => {
    const n = ((i % THEMES.length) + THEMES.length) % THEMES.length;
    document.documentElement.setAttribute("data-theme", THEMES[n].id);
    try {
      localStorage.setItem(STORAGE_KEY, THEMES[n].id);
    } catch {}
    indexRef.current = n;
    setIndex(n);
    setToast(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(false), 2200);
  }, []);

  const nextTheme = useCallback(() => setTheme(indexRef.current + 1), [setTheme]);

  // Клавиша T — следующая тема (если фокус не в поле ввода).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA")) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key === "t" || e.key === "T" || e.key === "е" || e.key === "Е") nextTheme();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextTheme]);

  return (
    <Ctx.Provider value={{ index, setTheme, nextTheme }}>
      {children}
      <ThemeToast
        show={toast}
        index={index}
        onPick={setTheme}
        onHover={() => clearTimeout(timer.current)}
        onLeave={() => {
          clearTimeout(timer.current);
          timer.current = setTimeout(() => setToast(false), 1200);
        }}
      />
    </Ctx.Provider>
  );
}

function ThemeToast({
  show,
  index,
  onPick,
  onHover,
  onLeave,
}: {
  show: boolean;
  index: number;
  onPick: (i: number) => void;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: -8, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -8, x: "-50%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          className="theme-toast fixed left-1/2 top-[110px] md:top-[112px] z-[60] flex flex-col items-center gap-[8px] rounded-[10px] px-[14px] py-[8px]"
        >
          <motion.span
            key={THEMES[index].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[12px] tracking-[5px] uppercase"
          >
            {THEMES[index].name}
          </motion.span>
          <div className="flex gap-[6px]">
            {THEMES.map((t, i) => (
              <button
                key={t.id}
                aria-label={`Тема ${t.name}`}
                title={t.name}
                onClick={() => onPick(i)}
                className="theme-dot"
                data-active={i === index}
                style={{
                  background: `linear-gradient(135deg, ${t.bg} 50%, ${t.third} 50%)`,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
