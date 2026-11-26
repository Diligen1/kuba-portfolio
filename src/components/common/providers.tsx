"use client";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./theme/theme";
import { TransitionProvider } from "./transition/transition";
import Cursor from "./fx/cursor";
import Background from "./fx/background";
import { ScrollProgress, EasterEgg } from "./fx/fx";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <TransitionProvider>
          <Background />
          <ScrollProgress />
          {children}
          <EasterEgg />
          <Cursor />
        </TransitionProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
