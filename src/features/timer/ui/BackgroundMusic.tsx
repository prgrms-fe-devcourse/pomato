import { useEffect, useRef } from "react";

import bgMusic from "@assets/audio/lofi-lofi-music-405237.mp3";

export default function BgMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    const handleFocus = () => {
      audio.play().catch(() => {});
    };

    const handleBlur = () => {
      audio.pause();
    };

    handleFocus();

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      audio.pause();
    };
  }, []);

  return <audio ref={audioRef} src={bgMusic} loop preload="auto" className="hidden" />;
}
