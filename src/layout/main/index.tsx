import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigation } from "react-router";

import Button from "@components/Button";

export default function Main({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const nav = useNavigation();
  console.log("NAV STATE", nav.state);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <main className="group bg-gradient relative flex h-dvh min-h-svh w-full items-stretch gap-4 overflow-hidden p-4">
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
