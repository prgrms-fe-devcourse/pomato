import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

interface AudioVisualizerProperties {
  isPlaying: boolean;
  barCount?: number;
  barWidth?: number;
  barGap?: number;
  height?: number;
  color?: string;
  inactiveOpacity?: number;
  activeOpacity?: number;
  className?: string;
}

export function AudioVisualizer({
  isPlaying,
  barCount = 5,
  barWidth = 6,
  barGap = 6,
  height = 40,
  color = "rgba(250, 250, 250, 0.6)",
  inactiveOpacity = 0.2,
  activeOpacity = 1,
  className = "",
}: AudioVisualizerProperties) {
  const [bars, setBars] = useState<number[]>(Array.from({ length: barCount }, () => 0));

  // 이전 상태 저장
  const prevBarsRef = useRef<number[]>(Array.from({ length: barCount }, () => 0));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      setBars(Array.from({ length: barCount }, () => 0));
      prevBarsRef.current = Array.from({ length: barCount }, () => 0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    let time = 0;

    const animate = () => {
      // 속도 숫자 낮을 수록 느려짐
      time += 0.05;

      const targets = Array.from({ length: barCount }, (_, index) => {
        const position = index / barCount;
        const frequency = 1 + index * 0.3;
        const wave1 = Math.sin(time * frequency) * 0.5;
        const wave2 = Math.sin(time * frequency * 1.3 + position * 4) * 0.3;
        const wave3 = Math.sin(time * 0.7) * 0.2;

        const noise = index > barCount / 2 ? Math.random() * 0.08 : 0;

        const combined = wave1 + wave2 + wave3 + noise + 0.5;
        return Math.max(40, Math.min(90, combined * 100));
      });

      const alpha = 0.25;
      const smoothed = targets.map((t, i) => {
        const prev = prevBarsRef.current[i] ?? 0;
        return prev + (t - prev) * alpha;
      });

      prevBarsRef.current = smoothed;
      setBars(smoothed);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, barCount]);

  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: `${barGap}px`,
        height: `${height}px`,
      }}
    >
      {bars.map((barHeight, index) => (
        <motion.div
          key={index}
          animate={{
            height: isPlaying ? `${barHeight}%` : "15%",
            opacity: isPlaying ? activeOpacity : inactiveOpacity,
          }}
          transition={{
            height: {
              duration: 0.25,
              ease: "easeOut",
            },
            opacity: {
              duration: 0.3,
            },
          }}
          style={{
            width: `${barWidth}px`,
            background: color,
            borderRadius: `${barWidth / 2}px`,
            minHeight: "6px",
          }}
        />
      ))}
    </div>
  );
}
