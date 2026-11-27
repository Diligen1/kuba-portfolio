"use client";
import style from "@/styles/headermobile/headermobile.module.css";
import { motion } from "framer-motion";
import { Oswald } from "next/font/google";
const oswald = Oswald({
  weight: ["300", "400", "500"],
  display: "swap",
  subsets: ["latin", "cyrillic"],
});

const STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Framer Motion",
  "1С (BSL)",
  "Python",
  "Godot",
  "Rust",
  "Blender",
  "ИИ-агенты",
];

export default function Skills() {
  return (
    <main className="mx-auto">
      <div className="w-[100%] px-[20px] md:w-[85%] min-h-[55vh] flex flex-wrap justify-center md:justify-start content-center gap-[10px] md:gap-[14px]">
        {STACK.map((name, index) => (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            key={name}
            className={`${style.ugol_6} skill-hex flex justify-center items-center w-[92px] h-[92px] md:w-[120px] md:h-[120px] bg-[var(--text-color)] text-[var(--background-color)] transition-transform duration-500 hover:-translate-y-[4px]`}
          >
            <p
              className={`${oswald.className} px-[8px] text-center text-[14px] md:text-[17px] font-light cursor-default leading-tight`}
            >
              {name}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
