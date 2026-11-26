"use client";
import { Info, Skills, Contact } from "@/components";
import { useEffect, useState } from "react";
import style from "@/styles/headermobile/headermobile.module.css";
import { AnimatePresence, motion } from "framer-motion";

const TABS = ["Info", "Skills", "Contact"];

export default function AllAbout() {
  const [activeComponent, setActiveComponent] = useState("Info");
  // свайп между вкладками — только на тач-экранах
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleSetActiveComponent = (component: any) => {
    setActiveComponent(component);
  };
  return (
    <main className="mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6, type: "spring" }}
        className=" w-full h-[100vh] relative flex flex-col-reverse md:flex-row justify-center items-center gap-[20px]"
      >
        <div
          role="tablist"
          className={`${style.navigator}  z-10 w-[55%] md:w-[45%] flex flex-row justify-center items-center md:items-start gap-[20px] pb-[80px]`}
        >
          {TABS.map((tab) => (
            <div
              key={tab}
              role="tab"
              tabIndex={0}
              aria-selected={activeComponent === tab}
              aria-label={tab}
              className={`${style.navItem} ${
                activeComponent === tab ? style.active : ""
              } group w-[40px] md:w-[50px] h-[30px] `}
              onClick={() => handleSetActiveComponent(tab)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleSetActiveComponent(tab);
                }
              }}
            >
              <span className="absolute left-1/2 -translate-x-1/2 top-[10px] text-[10px] tracking-[3px] uppercase text-[var(--text-color)] opacity-0 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none">
                {tab}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full md:w-[60%] z-10 ">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeComponent}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              drag={touch ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              dragSnapToOrigin
              onDragEnd={(_, info) => {
                const i = TABS.indexOf(activeComponent);
                if (info.offset.x < -70 && i < TABS.length - 1)
                  handleSetActiveComponent(TABS[i + 1]);
                if (info.offset.x > 70 && i > 0)
                  handleSetActiveComponent(TABS[i - 1]);
              }}
            >
              {activeComponent === "Info" && <Info />}
              {activeComponent === "Skills" && <Skills />}
              {activeComponent === "Contact" && <Contact />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2.6, type: "spring" }}
        className={`hidden md:flex absolute z-[-2] left-[-250px] bottom-[-550px] w-[700px] h-[700px] rounded-[50%] bg-[var(--third-color)] border-[2px] border-[var(--text-color)]`}
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 2.6, type: "spring" }}
        className={`hidden md:flex absolute z-[-1] left-[50px] bottom-[120px] w-[150px] h-[150px] rounded-[50%] bg-[var(--third-color)] border-[2px] border-[var(--text-color)]`}
      ></motion.div>
    </main>
  );
}
