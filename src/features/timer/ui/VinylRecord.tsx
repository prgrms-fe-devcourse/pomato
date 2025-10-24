import { motion } from "motion/react";

interface LofiVinylRecordProperties {
  isPlaying: boolean;
  size?: number;
  grooveCount?: number;
  className?: string;
}

export default function VinylRecord({
  isPlaying,
  size = 200,
  grooveCount = 12,
  className = "",
}: LofiVinylRecordProperties) {
  const labelSize = size * 0.44;
  const grooveStartSize = size * 0.875;

  return (
    <div className={className} style={{ position: "relative" }}>
      {/* Outer glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle, rgba(250,250,250,0.15) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
        animate={
          isPlaying
            ? {
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isPlaying
            ? {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }
            : {
                duration: 0.5,
              }
        }
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          background: "rgba(23, 23, 27, 0.18)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(250, 250, 250, 0.08)",
          position: "relative",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3), inset 0 0 60px rgba(250,250,250,0.03)",
        }}
      >
        {Array.from({ length: grooveCount }, (_, index) => {
          const grooveSize = grooveStartSize - index * ((grooveStartSize / grooveCount) * 0.7);

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: `${grooveSize}px`,
                height: `${grooveSize}px`,
                border: "1px solid rgba(250,250,250,0.08)",
                borderRadius: "50%",
                transform: "translate(-50%, -50%)",
                // boxShadow: "inset 0 0 10px rgba(250,250,250,0.02)",
              }}
            />
          );
        })}

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${labelSize}px`,
            height: `${labelSize}px`,
            transform: "translate(-50%, -50%)",
            background:
              "linear-gradient(135deg, rgba(250,250,250,0.15) 0%, rgba(250,250,250,0.08) 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "50%",
            border: "1px solid rgba(250,250,250,0.12)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(250,250,250,0.1)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: `${size / 16}px`,
            height: `${size / 16}px`,
            transform: "translate(-50%, -50%)",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            borderRadius: "50%",
            border: "1px solid rgba(250,250,250,0.1)",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6), 0 0 10px rgba(250,250,250,0.05)",
          }}
        />
      </motion.div>
    </div>
  );
}
