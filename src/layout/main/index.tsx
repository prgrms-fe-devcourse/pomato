import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@components/Button";

export default function Main({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <main className="group bg-gradient relative flex min-h-dvh w-full items-stretch gap-4 p-4">
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
