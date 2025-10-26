import { useEffect, useRef } from "react";

import bgMusic from "@assets/audio/lofi-lofi-music-405237.mp3";

type BgMusicProps = {
  isPlaying: boolean;
};

export default function BgMusic({ isPlaying }: BgMusicProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.25;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }

    return () => {
      audio.pause();
    };
  }, [isPlaying]);

  return <audio ref={audioRef} src={bgMusic} loop preload="auto" className="hidden" />;
}
