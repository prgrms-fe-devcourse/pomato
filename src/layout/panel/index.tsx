import { X } from "lucide-react";

interface PanelProps {
  close: () => void;
}

export default function Panel({ close }: PanelProps) {
  return (
    <div className="dark:bg-bl/30 border-wh/8 min-h-full w-[576px] border-1">
      <header className="flex h-[60px] justify-end px-[8px]">
        <button onClick={close}>
          <X width={16} height={16} className="text-wh" />
        </button>
      </header>
      <nav></nav>
      <main></main>
    </div>
  );
}
