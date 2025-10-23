import { useId, useMemo } from "react";

export default function ClassicBarSpinner() {
  // 고유 키프레임 이름(콜론 제거: React useId 특성)
  const id = useId();
  const anim = `classic-bar-${id}`.replaceAll(":", "");

  // 고정 값(요구: props 없음)
  const size = 64; // 전체 크기(px)
  const color = "#a3a3a3"; // 막대 색상
  const bars = 12; // 막대 개수
  const duration = 1.2; // 회전 주기(s)

  // 막대 치수 계산 (size 의존)
  const bar = useMemo(() => {
    const width = Math.max(2, Math.round(size * 0.12));
    const height = Math.round(size * 0.42);
    const radius = Math.round(width / 2);
    return { width, height, radius };
  }, [size]);

  const step = 360 / bars;

  return (
    <div
      role="status"
      aria-label="Loading"
      style={{ position: "relative", width: size, height: size }}
    >
      {Array.from({ length: bars }).map((_, i) => {
        const rotate = i * step;
        const delay = `${(i * (duration / bars)).toFixed(3)}s`;
        const opacity = 1 - (i / bars) * 0.75;

        return (
          <div
            key={i}
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: bar.width,
              height: bar.height,
              background: color,
              borderRadius: bar.radius,
              transform: `rotate(${rotate}deg) translate(-50%, -100%)`,
              transformOrigin: "bottom",
              animation: `${anim} ${duration}s linear infinite`,
              animationDelay: delay,
              opacity,
            }}
          />
        );
      })}

      <style>{`
        @keyframes ${anim} {
          0%   { opacity: 1; }
          100% { opacity: 0.25; }
        }
      `}</style>
    </div>
  );
}
