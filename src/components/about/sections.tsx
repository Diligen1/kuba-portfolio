"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Josefin_Sans, Bitter } from "next/font/google";
import { Reveal } from "@/components/common/fx/fx";
import { TransitionLink } from "@/components/common/transition/transition";

const josefin = Josefin_Sans({
  weight: ["300", "400"],
  display: "swap",
  subsets: ["latin"],
});
const bitter = Bitter({
  weight: ["300", "400"],
  display: "swap",
  subsets: ["latin", "cyrillic"],
});

const WHAT = [
  {
    title: "1С и интеграции",
    text: "Back Office и Front Office (кассы) крупной розничной сети. Обработки 1С, HTTP-API, обмены.",
  },
  {
    title: "Front-end",
    text: "React, Next.js, TypeScript. Сайты для онлайн-курсов и туризма.",
  },
  {
    title: "ИИ и свои проекты",
    text: "Claude Code, мультиагентные процессы, генерация видео и картинок. Игры на Godot и Rust.",
  },
];

const INTEGRATIONS = [
  "Wildberries",
  "Ozon",
  "Яндекс Маркет",
  "Kaspi.kz",
  "eMAG",
  "склады",
  "службы доставки",
  "интернет-магазины",
];

const PATH = [
  { n: "01", title: "Front-end", text: "Стажировка в Megalab, первые проекты на React." },
  { n: "02", title: "Сайты", text: "BOOSTER — онлайн-курсы, HORSE — туризм." },
  { n: "03", title: "1С", text: "Разработка и интеграции в рознице: маркетплейсы, склады, доставка, несколько стран." },
  { n: "04", title: "Сейчас", text: "Свои игры и инструменты, работа с ИИ-агентами." },
];

export default function AboutSections() {
  return (
    <div className="w-full flex flex-col items-center gap-[120px] md:gap-[160px] px-[24px] pt-[40px] pb-[160px] md:pb-[140px]">
      {/* Чем занимаюсь */}
      <section className="w-full max-w-[1000px]">
        <Reveal>
          <p className={`${josefin.className} section-title mb-[40px]`}>Чем занимаюсь</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] md:gap-[48px]">
          {WHAT.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.08}>
              <div className="border-t border-[color-mix(in_srgb,var(--text-color)_35%,transparent)] pt-[20px]">
                <h3 className={`${josefin.className} text-[22px] tracking-[2px] text-[var(--text-color)] mb-[12px]`}>
                  {w.title}
                </h3>
                <p className={`${bitter.className} font-light text-[15px] leading-[1.7] text-[var(--text-color)] opacity-85`}>
                  {w.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-[10px] mt-[40px]">
            {INTEGRATIONS.map((x) => (
              <span key={x} className="chip">
                {x}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Путь */}
      <Timeline />

      {/* Проекты */}
      <section className="w-full max-w-[1000px] flex flex-col items-start gap-[20px]">
        <Reveal>
          <p className={`${josefin.className} section-title`}>Проекты</p>
        </Reveal>
        <Reveal delay={0.08}>
          <TransitionLink
            href="/work"
            className={`${josefin.className} group inline-flex items-center gap-[16px] text-[28px] md:text-[44px] tracking-[4px] text-[var(--text-color)]`}
          >
            <span className="text-underline">смотреть работы</span>
            <i className="fi fi-rr-arrow-right text-[22px] md:text-[30px] h-[30px] transition-transform duration-500 group-hover:translate-x-[8px]"></i>
          </TransitionLink>
        </Reveal>
      </section>
    </div>
  );
}

function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <section className="w-full max-w-[1000px]">
      <Reveal>
        <p className={`${josefin.className} section-title mb-[40px]`}>Путь</p>
      </Reveal>
      <div ref={ref} className="relative pl-[32px] md:pl-[48px]">
        <div className="absolute left-[5px] md:left-[13px] top-[6px] bottom-[6px] w-[1px] bg-[color-mix(in_srgb,var(--text-color)_25%,transparent)]" />
        <motion.div
          style={{ scaleY }}
          className="absolute left-[5px] md:left-[13px] top-[6px] bottom-[6px] w-[1px] origin-top bg-[var(--text-color)]"
        />
        <div className="flex flex-col gap-[48px]">
          {PATH.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05} className="relative">
              <span className="absolute left-[-32px] md:left-[-40px] top-[6px] w-[11px] h-[11px] rounded-full bg-[var(--background-color)] border border-[var(--text-color)]" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-[6px] md:gap-[32px]">
                <span className={`${josefin.className} text-[13px] tracking-[3px] text-[var(--text-color)] opacity-60 md:w-[40px]`}>
                  {p.n}
                </span>
                <h3 className={`${josefin.className} text-[22px] tracking-[2px] text-[var(--text-color)] md:w-[160px]`}>
                  {p.title}
                </h3>
                <p className={`${bitter.className} font-light text-[15px] leading-[1.7] text-[var(--text-color)] opacity-85 max-w-[560px]`}>
                  {p.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
