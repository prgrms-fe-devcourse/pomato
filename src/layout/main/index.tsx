import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import bg from "@assets/background/AdobeStock_327307020.jpeg";
import Button from "@components/Button";

import RainEffect from "./RainEffect";

export default function Main({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <main className="group relative flex h-dvh min-h-svh w-full items-stretch gap-4 overflow-hidden p-4">
      <motion.div
        className="absolute inset-0 -z-20 bg-cover bg-center opacity-70 dark:opacity-70"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.8) saturate(0.9)",
        }}
        animate={{
          scale: [1, 1.02, 1],
          x: [0, -10, 10, 0],
          y: [0, 5, -5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <RainEffect />
      <div className="bg-gradient absolute inset-0 -z-10" />
      <Button
        onClick={() => setIsDark((prev) => !prev)}
        composition="iconOnly"
        className="absolute top-4 left-4 group-has-[section[aria-label='Panel']]:max-[800px]:hidden"
        aria-label="Toggle Theme"
      >
        <Sun className="hidden dark:block" />
        <Moon className="block dark:hidden" />
      </Button>
      {children}
    </main>
  );
}
