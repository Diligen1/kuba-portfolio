"use client";
import { Fragment, useEffect } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Josefin_Sans } from "next/font/google";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Lines from "@/components/common/animation/lines";
import { useTheme } from "@/components/common/theme/theme";
const josefin = Josefin_Sans({
  weight: ["400", "500"],
  display: "swap",
  subsets: ["latin"],
});

const TITLE = "CREATOR KUBA";

export default function Promo() {
  const { nextTheme } = useTheme();
  const reduce = useReducedMotion();
  const [text] = useTypewriter({
    words: ["DEVELOPER", "DESIGNER", "RELAXING"],
    loop: 0,
    typeSpeed: 120,
    deleteSpeed: 80,
    delaySpeed: 10000,
  });

  // Параллакс: круг плывёт за мышью, текст — чуть в обратную сторону
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const circleX = useTransform(sx, (v) => v * 40);
  const circleY = useTransform(sy, (v) => v * 40);
  const textX = useTransform(sx, (v) => v * -14);
  const textY = useTransform(sy, (v) => v * -10);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <main className="mx-auto ">
      <div className="w-full h-[100vh] flex justify-center items-center relative">
        <motion.div
          style={{ x: circleX, y: circleY }}
          className="md:top-[20%] top-[10%] absolute z-10 md:z-[-10]"
        >
          <motion.div
            onClick={nextTheme}
            role="button"
            aria-label="Сменить тему"
            data-cursor
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.6, delay: 1.6, type: "spring" }}
            className={`promo-circle cursor-pointer w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-[var(--third-color)] rounded-[50%] border-[2px] border-[var(--text-color)]`}
          >
            <span className="promo-orbit" aria-hidden />
          </motion.div>
        </motion.div>
        <motion.div
          style={{ x: textX, y: textY }}
          className="flex flex-col-reverse md:flex-col h-[60%] md:h-[40%] gap-[20px] justify-start items-center overflow-hidden"
        >
          <motion.p
            initial="hidden"
            animate="show"
            variants={{
              show: { transition: { staggerChildren: 0.05, delayChildren: 1.6 } },
            }}
            aria-label={TITLE}
            className={`${josefin.className} promo-title text-center tracking-[15px] cursor-default text-[36px] md:text-[96px] text-[var(--text-color)]`}
          >
            {TITLE.split(" ").map((word, w) => (
              <Fragment key={w}>
              {w > 0 && " "}
              <span className="inline-block whitespace-nowrap">
                {word.split("").map((ch, i) => (
                  <motion.span
                    key={i}
                    aria-hidden
                    variants={{
                      hidden: { y: -200, opacity: 0 },
                      show: {
                        y: 0,
                        opacity: 1,
                        transition: { type: "spring", stiffness: 260, damping: 18 },
                      },
                    }}
                    whileHover={{ y: -14, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                    className="promo-char inline-block"
                  >
                    {ch}
                  </motion.span>
                ))}
              </span>
              </Fragment>
            ))}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className={` ${josefin.className} text-[16px] md:text-[42px] text-[var(--text-color)] tracking-[10px]`}
          >
            {text}
            <span>
              <Cursor cursorStyle="<" cursorColor="var(--third-color)" />
            </span>
          </motion.p>
        </motion.div>
        <div className="hidden absolute top-[50%] md:top-auto left-[50%] translate-x-[-50%] md:left-[100px] md:flex">
          <Lines />
        </div>
        <motion.div className="h-[50px] overflow-hidden absolute top-[80px] left-[50%] translate-x-[-50%] md:top-auto md:left-auto md:bottom-[20px] md:right-[20px] hidden md:flex flex-row gap-[10px] justify-center items-center">
          {[...Array(3)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ y: 100, scale: 0 }}
              animate={{ y: 0, scale: 1 }}
              transition={{
                duration: index * 0.2 + 0.4,
                delay: 1.6,
                type: "spring",
              }}
              className={`w-[15px] h-[15px]`}
            >
              <span
                className="dot-bob block w-full h-full rounded-[50%] bg-[var(--second-color)]"
                style={{ animationDelay: `${2.4 + index * 0.18}s` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
