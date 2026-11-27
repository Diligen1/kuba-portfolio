"use client";
import Image, { StaticImageData } from "next/image";
import image from "../../../public/assets/img/booster.jpg";
import image_2 from "../../../public/assets/img/travelr.jpg";
import { Josefin_Sans, PT_Sans_Narrow } from "next/font/google";
import { Reveal } from "@/components/common/fx/fx";
const josefin = Josefin_Sans({
  weight: ["300", "400", "500"],
  display: "swap",
  subsets: ["latin"],
});
const narrow = PT_Sans_Narrow({
  weight: ["400"],
  display: "swap",
  subsets: ["latin", "cyrillic"],
});

type Project = {
  id: string;
  title: string;
  text: string;
  stack: string[];
  url?: string;
  urlLabel?: string;
  image?: StaticImageData;
  icon?: keyof typeof ICONS;
};

const SITES: Project[] = [
  {
    id: "booster",
    title: "BOOSTER",
    text: "Сайт онлайн-курсов по программированию, сделан в команде.",
    stack: ["React", "Next.js"],
    url: "https://booster-school.vercel.app/",
    image: image,
  },
  {
    id: "horse",
    title: "HORSE",
    text: "Сайт для туризма — весь front-end один, без дизайнера.",
    stack: ["React", "Tailwind"],
    url: "https://horse-travel.com/",
    image: image_2,
  },
];

const OWN: Project[] = [
  {
    id: "nexus",
    title: "Nexus",
    text: "Десктоп-компаньон для Claude и ChatGPT.",
    stack: ["Desktop", "ИИ"],
    url: "https://diligen1.github.io/nexus/",
    urlLabel: "сайт",
    icon: "nexus",
  },
  {
    id: "kaskad",
    title: "Каскад чисел",
    text: "Головоломка в духе 2048: поля до 20×28, ходы в 8 направлениях.",
    stack: ["Godot", "Android"],
    icon: "kaskad",
  },
  {
    id: "lantern",
    title: "Хранитель фонаря",
    text: "Survivors + idle игра для Android и ПК.",
    stack: ["Godot", "Blender"],
    icon: "lantern",
  },
  {
    id: "aether",
    title: "Aether",
    text: "Roguelike-survivors: дерево навыков, боссы, бесконечный режим.",
    stack: ["Rust", "macroquad"],
    icon: "aether",
  },
  {
    id: "aibot",
    title: "Ai_Bot",
    text: "Торговый бот для Binance: paper и live режимы.",
    stack: ["Python"],
    url: "https://github.com/Diligen1/Ai_Bot",
    urlLabel: "github",
    icon: "bot",
  },
  {
    id: "kuznya",
    title: "Кузня 1С",
    text: "Инструмент разработчика 1С. Приватный проект.",
    stack: ["Python", "1С"],
    icon: "kuznya",
  },
];

// Минималистичные иконки: тонкие линии в цвете темы
const ICONS = {
  nexus: (
    <>
      <rect x="10" y="12" width="30" height="20" rx="5" />
      <path d="M18 32 l-4 7 l10 -7" />
      <rect x="26" y="24" width="28" height="18" rx="5" className="fill" />
    </>
  ),
  kaskad: (
    <>
      <rect x="12" y="12" width="18" height="18" rx="3" />
      <rect x="34" y="12" width="18" height="18" rx="3" className="fill" />
      <rect x="12" y="34" width="18" height="18" rx="3" />
      <rect x="34" y="34" width="18" height="18" rx="3" />
    </>
  ),
  lantern: (
    <>
      <path d="M26 10 h12 M32 6 v4" />
      <path d="M22 16 h20 l-2 30 h-16 z" />
      <path d="M20 50 h24" />
      <ellipse cx="32" cy="32" rx="4" ry="6" className="fill" />
    </>
  ),
  aether: (
    <>
      <path d="M32 6 l12 16 l-12 36 l-12 -36 z" />
      <path d="M20 22 h24 M32 6 v52" className="thin" />
      <path d="M32 6 l12 16 h-24 z" className="fill" />
    </>
  ),
  bot: (
    <>
      <path d="M10 52 h44 M10 52 V10" />
      <path d="M16 42 l10 -10 l8 6 l14 -18" />
      <circle cx="48" cy="20" r="3.5" className="fill" />
    </>
  ),
  kuznya: (
    <>
      <path d="M22 18 l-10 14 l10 14" />
      <path d="M42 18 l10 14 l-10 14" />
      <path d="M36 14 l-8 36" className="thin" />
      <circle cx="32" cy="32" r="4" className="fill" />
    </>
  ),
};

function ProjectIcon({ name }: { name: keyof typeof ICONS }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className="project-icon w-[56px] h-[56px]"
      fill="none"
      stroke="var(--on-second)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <style>{`.fill{fill:var(--background-color);stroke:var(--on-second)}.thin{stroke-width:1;opacity:.6}`}</style>
      {ICONS[name]}
    </svg>
  );
}

function Card({ p, index, baseDelay = 0 }: { p: Project; index: number; baseDelay?: number }) {
  const Wrapper: any = p.url ? "a" : "div";
  return (
    <Reveal delay={baseDelay + index * 0.06} className="h-full">
      <Wrapper
        {...(p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {})}
        className="project-card group h-full flex flex-col bg-[var(--second-color)] border-x-[2px] border-[var(--text-color)] overflow-hidden"
      >
        {p.image ? (
          <div className="h-[170px] overflow-hidden">
            <Image src={p.image} alt={p.title} className="w-full h-full object-cover" placeholder="empty" />
          </div>
        ) : (
          <div className="h-[110px] px-[24px] flex items-end">
            {p.icon && <ProjectIcon name={p.icon} />}
          </div>
        )}
        <div className="flex flex-col gap-[10px] p-[24px] flex-1">
          <div className="flex items-baseline justify-between gap-[12px]">
            <h3 className={`${josefin.className} text-[22px] tracking-[2px] text-[var(--on-second)]`}>
              {p.title}
            </h3>
            {p.url && (
              <span className={`${josefin.className} text-[12px] tracking-[2px] uppercase text-[var(--on-second)] opacity-70 flex items-center gap-[4px] whitespace-nowrap`}>
                {p.urlLabel || "открыть"}
                <i className="fi fi-rr-arrow-small-right h-[16px] text-[16px] transition-transform duration-300 group-hover:translate-x-[4px]"></i>
              </span>
            )}
          </div>
          <p className={`${narrow.className} text-[16px] leading-[1.5] text-[var(--on-second)] opacity-85`}>
            {p.text}
          </p>
          <div className="flex flex-wrap gap-[6px] mt-auto pt-[8px]">
            {p.stack.map((s) => (
              <span
                key={s}
                className="text-[12px] tracking-[1px] px-[10px] py-[3px] rounded-full border border-[color-mix(in_srgb,var(--on-second)_35%,transparent)] text-[var(--on-second)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="h-[3px] w-1/4 mx-auto mb-[8px] bg-[var(--background-color)] transition-all duration-500 group-hover:w-[60%]"></div>
      </Wrapper>
    </Reveal>
  );
}

export default function PromoWorks() {
  return (
    <main className="mx-auto w-full min-h-screen">
      <div className="w-full max-w-[1100px] mx-auto px-[24px] pt-[110px] md:pt-[150px] pb-[160px] md:pb-[120px] flex flex-col gap-[90px]">
        <section>
          <Reveal delay={1.5}>
            <p className={`${josefin.className} section-title mb-[28px]`}>Сайты</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[28px]">
            {SITES.map((p, i) => (
              <Card key={p.id} p={p} index={i} baseDelay={1.55} />
            ))}
          </div>
        </section>
        <section>
          <Reveal>
            <p className={`${josefin.className} section-title mb-[28px]`}>Свои проекты</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[28px]">
            {OWN.map((p, i) => (
              <Card key={p.id} p={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
