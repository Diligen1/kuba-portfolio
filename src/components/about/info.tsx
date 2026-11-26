"use client";
import { Josefin_Sans, Bitter } from "next/font/google";
import { motion } from "framer-motion";
import { Counter } from "@/components/common/fx/fx";
const bitter = Bitter({
  weight: ["200", "300", "400", "500"],
  display: "swap",
  subsets: ["latin", "cyrillic"],
});
const josefin = Josefin_Sans({
  weight: ["200", "300", "400", "500"],
  display: "swap",
  subsets: ["latin"],
});

const item = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 160, damping: 20 },
  },
};

const STATS = [
  { to: 1, suffix: "+", label: "год опыта" },
  { to: 2, suffix: "", label: "проекта" },
  { to: 9, suffix: "", label: "технологий" },
];

export default function Info() {
  return (
    <main className="mx-auto">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
        className=" w-full h-[55vh] px-[20px] flex flex-col justify-center items-center gap-[20px] md:text-left text-center"
      >
        <motion.p
          variants={item}
          className={`${josefin.className} tracking-[5px] md:tracking-[10px] text-[var(--text-color)] text-[20px] md:text-[24px] font-light `}
        >
          Realm Sayan
        </motion.p>
        <motion.p
          variants={item}
          className={`${bitter.className} info-name tracking-[5px]  text-[var(--second-color)] text-[32px] md:text-[56px]  `}
        >
          Казыбеков Кубаныч
        </motion.p>
        <motion.p
          variants={item}
          className={` ${bitter.className} font-light  px-[20px] w-[110%] md:w-[90%]  text-[var(--text-color)] translate-x-0 md:tracking-[3px] `}
        >
          Привет! Я - Front-end разработчик, программист с годом опыта,
          прошедший стажировку в Megalabe, постоянно изучаю новое и работаю над
          реальными проектами в команде, стремясь делать мир программирования
          лучше каждый день
        </motion.p>
        <motion.div
          variants={item}
          className="flex flex-row gap-[28px] md:gap-[48px] justify-center"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center">
              <span
                className={`${josefin.className} text-[30px] md:text-[40px] leading-none text-[var(--second-color)]`}
              >
                <Counter to={s.to} suffix={s.suffix} delay={0.5 + i * 0.15} />
              </span>
              <span
                className={`${bitter.className} text-[12px] md:text-[13px] tracking-[2px] text-[var(--text-color)] opacity-80`}
              >
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
