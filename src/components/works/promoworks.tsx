"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import image from "../../../public/assets/img/booster.jpg";
import image_2 from "../../../public/assets/img/travelr.jpg";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Magnetic } from "@/components/common/fx/fx";
import { Josefin_Sans, PT_Sans_Narrow } from "next/font/google";
const josefin = Josefin_Sans({
  weight: ["300", "400", "500"],
  display: "swap",
  subsets: ["latin"],
});
const narrow = PT_Sans_Narrow({
  weight: ["400"],
  display: "swap",
  subsets: ["cyrillic"],
});

export default function PromoWorks() {
  const [openBlockId, setOpenBlockId] = useState<number | null>(null);

  const handleBlockClick = (id: number) => {
    setOpenBlockId(openBlockId === id ? null : id);
  };
  const [blockDate] = useState([
    {
      id: 1,
      image: image,
      icon_2: <i className="fi fi-ss-star"></i>,
      icon: <i className="fi fi-rs-caret-down"></i>,
      title: "BOOSTER",
      text: "Разрабатывал сайт для онлайн курсов по программированию совместно с командой разработка длилась больше месяца",
      number: "01",
      btn: "ПЕРЕЙТИ",
      url: "https://booster-school.vercel.app/",
    },
    {
      id: 2,
      image: image_2,
      icon: <i className="fi fi-rs-caret-down"></i>,
      icon_2: <i className="fi fi-ss-star"></i>,
      title: "HORSE",
      text: "Разработал сайт для туризма всю front составляюшую часть делал один без дизайнера",
      number: "02",
      btn: "ПЕРЕЙТИ",
      url: "https://horse-travel.com/",
    },
    {
      id: 3,
      image: "",
      icon: <i className="fi fi-rs-caret-down"></i>,
      icon_2: <i className="fi fi-ss-star"></i>,
      title: "In works",
      text: "lorem",
      number: "03",
      btn: "ПЕРЕЙТИ",
      url: "",
    },
  ]);
  return (
    <main className="mx-auto w-full min-h-screen  ">
      <div className="w-auto h-auto z-5 md:h-[100vh] flex flex-col gap-[40px] md:flex-row justify-evenly items-center pt-[90px] pb-[130px] md:pb-0  md:pt-[80px]">
        {blockDate.map((el, index) => (
          <motion.div
            initial={{ y: 500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: 1.6 + index * 0.2,
              type: "spring",
            }}
            key={el.id}
            style={{ perspective: 900 }}
          >
            <TiltCard
              open={openBlockId === el.id}
              onToggle={() => handleBlockClick(el.id)}
            >
              <div className="flex flex-col justify-around items-center">
                <div
                  className={`text-[20px] text-[var(--on-second)] transform transition-transform duration-300 ${
                    openBlockId === el.id ? "rotate-180" : ""
                  }`}
                >
                  {el.icon}
                </div>
                {openBlockId !== el.id && (
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="work-star text-[132px] text-[var(--on-second)]"
                  >
                    {el.icon_2}
                  </motion.div>
                )}
                <AnimatePresence initial={false}>
                  {openBlockId === el.id && (
                    <motion.div
                      key="open"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="work-img w-[250px] h-[230px] overflow-hidden">
                        {el.image ? (
                          <Image
                            src={el.image}
                            alt={el.title}
                            width={300}
                            height={200}
                          />
                        ) : (
                          <div className="work-soon w-full h-full flex items-center justify-center">
                            <span className="text-[var(--on-second)] tracking-[6px] text-[14px]">
                              SOON
                            </span>
                          </div>
                        )}
                      </div>
                      <p
                        className={`${narrow.className} px-[5px] text-[16px] text-center text-[var(--on-second)] pt-[20px]`}
                      >
                        {el.text}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <p
                  className={`${josefin.className} text-center  text-[22px] text-[var(--background-color)]`}
                >
                  {el.title}
                </p>
                <p
                  className={`${josefin.className} text-center text-[var(--background-color)] text-[14px]`}
                >
                  {el.number}
                </p>
                {openBlockId === el.id && (
                  <Magnetic strength={0.3}>
                    <motion.a
                      href={el.url || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-disabled={!el.url}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!el.url) e.preventDefault();
                      }}
                      className={`group/btn w-[150px] h-[40px] mt-[6px] justify-center cursor-pointer flex  items-center relative overflow-hidden bg-transparent border-[2px] border-[var(--on-second)] ${
                        el.url ? "" : "opacity-50"
                      }`}
                    >
                      <div className="left-[2px] top-[2px] bottom-[2px] absolute duration-500 bg-[var(--background-color)] w-[5px] group-hover/btn:w-[calc(100%-4px)]"></div>
                      <div className="relative z-[5] flex flex-row justify-center items-center">
                        <p
                          className={`${narrow.className} text-[16px] tracking-[2px]  z-[5] text-[var(--on-second)] group-hover/btn:text-[var(--second-color)] duration-300`}
                        >
                          {el.btn}
                        </p>
                        <i className="fi fi-rs-caret-right text-[18px] h-[22px] z-[5] text-[var(--on-second)] group-hover/btn:text-[var(--second-color)] group-hover/btn:translate-x-[4px] duration-300"></i>
                      </div>
                    </motion.a>
                  </Magnetic>
                )}
              </div>
              <div
                className={`absolute bottom-[5px] left-[50%] translate-x-[-50%] right-0 h-1 bg-[var(--background-color)] transition-all duration-300 ${
                  openBlockId === el.id ? "w-[60%]" : "w-1/4"
                }`}
              ></div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

// Карточка с 3D-наклоном за мышью и бликом
function TiltCard({
  open,
  onToggle,
  children,
}: {
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 200, damping: 20 });
  const sy = useSpring(py, { stiffness: 200, damping: 20 });
  const rotateY = useTransform(sx, [0, 1], [-12, 12]);
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const gx = useTransform(sx, (v) => `${v * 100}%`);
  const gy = useTransform(sy, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, color-mix(in srgb, var(--on-second) 8%, transparent), transparent 60%)`;
  const [hover, setHover] = useState(false);

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    setHover(false);
  };

  return (
    <motion.div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={reset}
      style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`work-card relative z-[5] w-[300px] bg-[var(--second-color)] duration-300 transition-[height,box-shadow] border-x-[2px] border-[var(--text-color)] overflow-hidden cursor-pointer ${
        open ? "h-[500px]" : "h-[350px]"
      }`}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{ background: glare, opacity: hover ? 1 : 0 }}
      />
    </motion.div>
  );
}
