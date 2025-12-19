'use client';

import { motion } from 'framer-motion';

export function OrganicWave() {
  return (
    <div className="absolute inset-0 opacity-20">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full"
      >
        <motion.path
          d="M0 200 C 360 100, 1080 300, 1440 200"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          initial={{ pathLength: 1, pathOffset: 1 }}
          animate={{
            pathLength: 1,
            pathOffset: 0,
            d: [
              "M0 200 C 360 100, 1080 300, 1440 200",
              "M0 200 C 360 150, 1080 250, 1440 200",
              "M0 200 C 360 120, 1080 280, 1440 200",
              "M0 200 C 360 100, 1080 300, 1440 200",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      </svg>
    </div>
  );
}
