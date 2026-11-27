"use client";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Major_Mono_Display } from "next/font/google";
import HeaderMobile from "../headermobile/headermobile";
import { TransitionLink } from "../transition/transition";
import ThemeLogo from "../theme/logo";
const major = Major_Mono_Display({
  weight: ["400"],
  display: "swap",
  subsets: ["latin"],
});

const drop = (delay: number) => ({
  initial: { y: -300, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.5, delay, type: "spring" as const },
});

function NavLink({ href, label, delay }: { href: string; label: string; delay: number }) {
  const pathname = usePathname() || "/";
  const active =
    href === "/" ? pathname === "/" : pathname.replace(/\/+$/, "") === href;
  return (
    <motion.div {...drop(delay)}>
      <TransitionLink
          href={href}
          aria-current={active ? "page" : undefined}
          className={`${major.className} nav-link ${
            active ? "is-active text-[var(--second-color)]" : "text-[var(--text-color)]"
          } inline-block px-[8px] py-[6px] text-[18px] hover:text-[var(--second-color)] duration-500 text-underline`}
        >
          {label}
        </TransitionLink>
    </motion.div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.div
      {...drop(delay)}
      className="w-[6px] h-[6px] rounded-[50%] bg-[var(--second-color)]"
    ></motion.div>
  );
}

export default function Header() {
  return (
    <main className="mx-auto">
      <div className="w-full h-[100px] flex-row justify-center items-center hidden md:flex absolute z-10">
        <div className="w-[75%] flex flex-row justify-around items-center">
          <NavLink href="/about" label="about" delay={1.8} />
          <Dot delay={2} />
          <NavLink href="/work" label="work" delay={1.9} />
          <Dot delay={2.1} />
          <motion.div {...drop(2.2)}>
            <ThemeLogo />
          </motion.div>
          <Dot delay={2.1} />
          <NavLink href="/" label="home" delay={1.9} />
          <Dot delay={1.7} />
          <NavLink href="/contact" label="contact" delay={1.5} />
        </div>
      </div>
      <div className="md:hidden w-[100%] h-[100%]">
        <HeaderMobile />
      </div>
    </main>
  );
}
