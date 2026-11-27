"use client";
import { Josefin_Sans, Bitter } from "next/font/google";
import { motion } from "framer-motion";
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
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Info() {
  return (
    <main className="mx-auto">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className=" w-full h-[55vh] px-[20px] flex flex-col justify-center items-center md:items-start gap-[20px] md:text-left text-center"
      >
        <motion.p
          variants={item}
          className={`${josefin.className} tracking-[5px] md:tracking-[10px] text-[var(--text-color)] text-[18px] md:text-[22px] font-light `}
        >
          Realm Sayan
        </motion.p>
        <motion.p
          variants={item}
          className={`${bitter.className} tracking-[4px] text-[var(--second-color)] text-[32px] md:text-[52px] leading-[1.15]`}
        >
          Казыбеков Кубаныч
        </motion.p>
        <motion.p
          variants={item}
          className={`${josefin.className} tracking-[4px] text-[var(--text-color)] text-[13px] md:text-[15px] uppercase opacity-80`}
        >
          1С-разработчик · интегратор · front-end
        </motion.p>
        <motion.p
          variants={item}
          className={` ${bitter.className} font-light w-full md:w-[85%] text-[15px] md:text-[17px] leading-[1.8] text-[var(--text-color)]`}
        >
          Начинал как Front-end разработчик со стажировки в Megalab. Сейчас
          занимаюсь 1С и интеграциями в рознице, делаю свои игры и
          инструменты, работаю с ИИ-агентами.
        </motion.p>
      </motion.div>
    </main>
  );
}
