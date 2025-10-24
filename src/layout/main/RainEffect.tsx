import { motion } from "motion/react";

type Raindrop = {
  id: number;
  left: string;
  delay: number;
  duration: number;
  height: number;
};

const createDrops = (): Raindrop[] =>
  Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 4,
    duration: 0.8 + Math.random(),
    height: 10 + Math.random() * 20,
  }));

export default function RainEffect() {
  const drops = createDrops();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((drop) => (
        <motion.span
          key={drop.id}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: "110vh", opacity: [0.8, 0.8, 0] }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            repeatDelay: drop.delay,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{
            position: "absolute",
            left: drop.left,
            top: 0,
            width: "1px",
            height: `${drop.height}px`,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0))",
            borderRadius: "1px",
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}
