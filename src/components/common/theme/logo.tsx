"use client";
import { motion } from "framer-motion";
import { Major_Mono_Display, Bebas_Neue } from "next/font/google";
import { useTheme } from "./theme";
import { THEMES } from "./themes";
const bebas = Bebas_Neue({ weight: ["400"], display: "swap", subsets: ["latin"] });
const major = Major_Mono_Display({ weight: ["400"], display: "swap", subsets: ["latin"] });

// Лого "CK": клик — следующая тема.
export default function ThemeLogo({ size = "lg" }: { size?: "lg" | "sm" }) {
  const { index, nextTheme } = useTheme();
  const onClick = () => nextTheme();
  const t = THEMES[index];
  const big = size === "lg";
  return (
    <div className="group relative flex flex-col items-center">
      <motion.button
        type="button"
        onClick={onClick}
        whileTap={{ scale: 0.94 }}
        aria-label={`Сменить тему (сейчас ${t.name})`}
        title="Сменить тему · клавиша T"
        className={`${bebas.className} cursor-pointer ${
          big ? "w-[70px] h-[70px] text-[46px]" : "w-[48px] h-[48px] text-[30px]"
        } bg-[var(--third-color)] rounded-[8px] text-[var(--on-third)] flex justify-center items-center
          hover:bg-[var(--text-color)] hover:text-[var(--background-color)] duration-500`}
      >
        ck
      </motion.button>
      {big && (
        <span
          className={`${major.className} pointer-events-none absolute top-[78px] whitespace-nowrap text-[11px] text-[var(--text-color)] opacity-0 translate-y-[-4px] group-hover:opacity-80 group-hover:translate-y-0 transition-all duration-300`}
        >
          theme · {t.name.toLowerCase()}
        </span>
      )}
    </div>
  );
}

