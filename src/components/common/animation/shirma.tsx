"use client";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { transitionState } from "../transition/transition";
export default function Shirma() {
  const reduce = useReducedMotion();
  // Пришли со шторкой перехода — стартуем уже закрытыми и сразу уезжаем.
  const [fromTransition] = useState(() => transitionState.covering);
  const [showShirma, setShowShirma] = useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setShowShirma(false);
      },
      fromTransition ? 250 : 1000
    );

    return () => clearTimeout(timer);
  }, [fromTransition]);

  const ShirmaAnimate = {
    initial: {
      x: "0%",
      width: "0%",
    },
    animate: {
      x: "100%",
      width: "100%",
    },
    exit: {
      x: ["100%", "0%"],
      width: ["100%", "0%"],
    },
  };
  if (reduce) return null;
  const initial = fromTransition ? false : "initial";
  return (
    <AnimatePresence>
      {showShirma && (
        <>
          <motion.div
            initial={initial}
            animate="animate"
            exit="exit"
            variants={ShirmaAnimate}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            className="fixed top-0 bottom-0 right-full h-screen z-30 bg-[var(--third-color)]"
          ></motion.div>
          <motion.div
            initial={initial}
            animate="animate"
            exit="exit"
            variants={ShirmaAnimate}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            className="fixed top-0 bottom-0 right-full h-screen z-20 bg-[var(--text-color)]"
          ></motion.div>
          <motion.div
            initial={initial}
            animate="animate"
            exit="exit"
            variants={ShirmaAnimate}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            className="fixed top-0 bottom-0 right-full h-screen z-10 bg-[var(--third-color)]"
          ></motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
