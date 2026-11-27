"use client";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { Josefin_Sans } from "next/font/google";
import { motion } from "framer-motion";
import Lines from "@/components/common/animation/lines";
import { useTheme } from "@/components/common/theme/theme";
const josefin = Josefin_Sans({
  weight: ["300", "400", "500"],
  display: "swap",
  subsets: ["latin"],
});

export default function Promo() {
  const { nextTheme } = useTheme();
  const [text] = useTypewriter({
    words: ["DEVELOPER", "1C INTEGRATOR", "DESIGNER", "RELAXING"],
    loop: 0,
    typeSpeed: 110,
    deleteSpeed: 60,
    delaySpeed: 3000,
  });
  return (
    <main className="mx-auto ">
      <div className="w-full h-[100vh] flex justify-center items-center relative">
        <motion.div
          onClick={nextTheme}
          role="button"
          aria-label="Сменить тему"
          title="Сменить тему"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 1.6, type: "spring" }}
          className={`cursor-pointer w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] bg-[var(--third-color)] rounded-[50%] md:top-[20%] top-[10%] absolute z-10 md:z-[-10] border-[1px] border-[var(--text-color)]`}
        ></motion.div>
        <div className="flex flex-col-reverse md:flex-col h-[60%] md:h-[40%] gap-[20px] justify-start items-center overflow-hidden">
          <motion.p
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.6, type: "spring" }}
            className={`${josefin.className} text-center tracking-[15px] cursor-default text-[36px] md:text-[96px] text-[var(--text-color)]`}
          >
            CREATOR KUBA
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className={` ${josefin.className} font-light text-[16px] md:text-[36px] text-[var(--text-color)] tracking-[10px] min-h-[1.4em]`}
          >
            {text}
            <span>
              <Cursor cursorStyle="<" cursorColor="var(--text-color)" />
            </span>
          </motion.p>
        </div>
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
              className={`w-[10px] h-[10px] rounded-[50%] bg-[var(--second-color)] `}
            ></motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
