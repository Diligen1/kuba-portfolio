"use client";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";

// Общий флаг: новая страница монтируется под уже закрытой шторкой.
export const transitionState = { covering: false };

const Ctx = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
});
export const usePageTransition = () => useContext(Ctx);

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p) || "/";

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [target, setTarget] = useState<string | null>(null);

  const navigate = useCallback(
    (href: string) => {
      if (norm(href) === norm(pathname)) return;
      if (reduce) {
        router.push(href);
        return;
      }
      setTarget(href);
    },
    [pathname, reduce, router]
  );

  // Новая страница пришла — шторку-оверлей убираем, дальше работает Shirma страницы.
  useEffect(() => {
    if (transitionState.covering) {
      setTarget(null);
      const t = setTimeout(() => (transitionState.covering = false), 50);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  // Страховка: если навигация не случилась — снять оверлей.
  useEffect(() => {
    if (!target) return;
    const t = setTimeout(() => {
      setTarget(null);
      transitionState.covering = false;
    }, 4000);
    return () => clearTimeout(t);
  }, [target]);

  return (
    <Ctx.Provider value={{ navigate }}>
      {children}
      {target && (
        <div className="fixed inset-0 z-[45] pointer-events-auto" aria-hidden>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-[var(--text-color)]"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.45, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
              transitionState.covering = true;
              router.push(target);
            }}
            className="absolute inset-0 bg-[var(--third-color)]"
          />
        </div>
      )}
    </Ctx.Provider>
  );
}

type TLProps = React.ComponentProps<typeof Link> & { href: string };

export const TransitionLink = forwardRef<HTMLAnchorElement, TLProps>(
  function TransitionLink({ href, onClick, ...rest }, ref) {
    const { navigate } = usePageTransition();
    return (
      <Link
        ref={ref}
        href={href}
        onClick={(e) => {
          onClick?.(e);
          if (
            e.defaultPrevented ||
            e.button !== 0 ||
            e.metaKey ||
            e.ctrlKey ||
            e.shiftKey ||
            e.altKey
          )
            return;
          e.preventDefault();
          navigate(href);
        }}
        {...rest}
      />
    );
  }
);
