"use client";
import { usePathname } from "next/navigation";
import style from "@/styles/headermobile/headermobile.module.css";
import { motion } from "framer-motion";
import { TransitionLink } from "../transition/transition";
import ThemeLogo from "../theme/logo";

const LINKS = [
  { href: "/about", icon: "fi fi-rr-user", text: "ABOUT" },
  { href: "/work", icon: "fi fi-rr-apps", text: "WORK" },
  { href: "/", icon: "fi fi-rr-home", text: "HOME" },
  { href: "/contact", icon: "fi fi-rr-phone-call", text: "CONTACT" },
];

export default function HeaderMobile() {
  const pathname = (usePathname() || "/").replace(/(.)\/+$/, "$1");
  const activeIndex = LINKS.findIndex((l) => l.href === pathname);

  return (
    <>
      {/* Кнопка темы для мобильных (на десктопе — лого в шапке) */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2, type: "spring" }}
        className="fixed top-[14px] right-[14px] z-[40]"
      >
        <ThemeLogo size="sm" />
      </motion.div>
      <main className="mx-auto w-full h-full flex items-end justify-center fixed z-[6] overflow-hidden pointer-events-none">
        <motion.div
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className={`${style.navigation} w-[100%] h-[90px] rounded-t-[8px] bg-[var(--text-color)] flex flex-row justify-around items-center`}
        >
          <div
            className={` ${style.block} w-full h-[90px] flex flex-row justify-around items-center pointer-events-auto relative`}
          >
            {activeIndex > -1 && (
              <motion.div
                aria-hidden
                className={`${style.indicator} w-[70px] h-[70px] bg-[var(--third-color)]`}
                initial={false}
                animate={{ left: `calc(${(activeIndex + 0.5) * 25}% - 35px)` }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
              ></motion.div>
            )}
            {LINKS.map((l, i) => (
              <TransitionLink
                key={l.href}
                href={l.href}
                aria-label={l.text}
                aria-current={i === activeIndex ? "page" : undefined}
                className={` ${style.block_1} ${
                  i === activeIndex ? style.current : ""
                } flex-1 flex flex-col justify-center items-center relative`}
              >
                <i className={l.icon}></i>
                <p>{l.text}</p>
              </TransitionLink>
            ))}
          </div>
        </motion.div>
      </main>
    </>
  );
}
