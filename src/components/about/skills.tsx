"use client";
import style from "@/styles/headermobile/headermobile.module.css";
import { useState } from "react";
import { Counter } from "@/components/common/fx/fx";
import { motion } from "framer-motion";
import { Oswald } from "next/font/google";
const oswald = Oswald({
  weight: ["300", "400", "500"],
  display: "swap",
  subsets: ["latin", "cyrillic"],
});
export default function Skills() {
  const [blocksData] = useState([
    {
      id: 1,
      count: 0,
      target: 90,
      increment: 1,
      intervalTime: 30,
      text: "HTML",
    },
    {
      id: 2,
      count: 0,
      target: 100,
      increment: 1,
      intervalTime: 30,
      text: "CSS",
    },
    {
      id: 3,
      count: 0,
      target: 60,
      increment: 1,
      intervalTime: 30,
      text: "JavaScript",
    },
    {
      id: 4,
      count: 0,
      target: 50,
      increment: 1,
      intervalTime: 30,
      text: "TypeScript",
    },
    {
      id: 5,
      count: 0,
      target: 80,
      increment: 1,
      intervalTime: 30,
      text: "React",
    },
    {
      id: 6,
      count: 0,
      target: 90,
      increment: 1,
      intervalTime: 30,
      text: "Next JS",
    },
    {
      id: 7,
      count: 0,
      target: 90,
      increment: 1,
      intervalTime: 30,
      text: "Redux",
    },
    {
      id: 8,
      count: 0,
      target: 90,
      increment: 1,
      intervalTime: 30,
      text: "Tailwind Css",
    },
    {
      id: 9,
      count: 0,
      target: 90,
      increment: 1,
      intervalTime: 30,
      text: "Framer-motion",
    },
  ]);
  return (
    <main className="mx-auto">
      <div className="w-[100%] px-[20px] md:w-[80%] h-[55vh] flex flex-wrap justify-around items-center md:text-left text-center">
        {blocksData.map((block, index) => (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.1, rotate: 4 }}
            transition={{ duration: 0.3, delay: index * 0.1, type: "spring" }}
            key={block.id}
            className={`${style.ugol_6} skill-hex relative flex flex-col justify-center items-center w-[100px] h-[100px] md:w-[140px] md:h-[140px] bg-[var(--text-color)] text-[var(--background-color)]`}
          >
            {/* заливка снизу вверх по проценту навыка */}
            <motion.span
              aria-hidden
              className="skill-fill absolute inset-x-0 bottom-0 bg-[var(--third-color)]"
              initial={{ height: "0%" }}
              animate={{ height: `${block.target}%` }}
              transition={{
                duration: (block.target * block.intervalTime) / 1000,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            />
            <p
              className={` ${oswald.className} relative text-[14px] md:text-[16px] cursor-default`}
            >
              <Counter
                to={block.target}
                suffix="%"
                delay={index * 0.1}
                duration={(block.target * block.intervalTime) / 1000}
              />
            </p>
            <p
              className={`${oswald.className} relative text-[16px] md:text-[20px] cursor-default`}
            >
              {block.text}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
