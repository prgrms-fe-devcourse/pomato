import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import Button from "@components/Button";

export default function Main({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <main className="relative flex min-h-dvh w-full items-stretch gap-4 bg-[radial-gradient(106.3%_106.3%_at_20%_30%,rgba(168,85,247,0.25)_0%,rgba(0,0,0,0)_40%),radial-gradient(113.14%_113.14%_at_80%_20%,rgba(236,72,153,0.20)_0%,rgba(0,0,0,0)_40%),radial-gradient(100%_100%_at_40%_80%,rgba(59,130,246,0.20)_0%,rgba(23,23,27,0.50)_0%,rgba(23,23,27,0.75)_100%)] p-4">
      <Button
        onClick={() => setIsDark((prev) => !prev)}
        composition="iconOnly"
        aria-label="테마 변경 버튼"
      >
        <Sun className="hidden dark:block" />
        <Moon className="block dark:hidden" />
      </Button>
      {children}
    </main>
  );
}
