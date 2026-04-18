import { useMemo } from 'react';
import { motion } from 'framer-motion';

const PetalRain = () => {
  const petals = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      xDrift: [
        `${Math.random() * 20 - 10}px`,
        `${Math.random() * 40 - 20}px`,
        `${Math.random() * 20 - 10}px`,
      ],
      duration: 10 + Math.random() * 10,
      delay: Math.random() * -20,
      scale: 0.4 + Math.random() * 0.7,
      initialRotate: Math.random() * 360,
      rotationSpeed: Math.random() > 0.5 ? 360 : -360,
      blur: i % 4 === 0 ? '1.5px' : '0px',
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {petals.map((p) => (
        <motion.img
          key={p.id}
          src="/assets/leaf.webp"
          initial={{
            y: '-10vh',
            x: `${p.startX}vw`,
            opacity: 0,
            scale: p.scale,
            rotate: p.initialRotate,
          }}
          animate={{
            y: '110vh',
            x: p.xDrift.map((d) => `calc(${p.startX}vw + ${d})`),
            rotate: p.initialRotate + p.rotationSpeed,
            rotateX: [0, 180, 360],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: p.delay,
          }}
          className="absolute w-6 h-6 md:w-10 md:h-10 object-contain will-change-transform"
          style={{ filter: `blur(${p.blur})` }}
        />
      ))}
    </div>
  );
};

export default PetalRain;
