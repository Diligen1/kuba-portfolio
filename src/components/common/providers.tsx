"use client";
import { MotionConfig } from "framer-motion";
import { ThemeProvider } from "./theme/theme";
import { TransitionProvider } from "./transition/transition";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <TransitionProvider>{children}</TransitionProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
