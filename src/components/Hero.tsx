import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);

  // Efect de parallax discret la scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yCouple = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-cream"
    >
      {/* 1. ANIMATIA DE INTRARE: GATEFOLD REVEAL */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ delay: 1, duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 bg-white z-50 border-r border-cream-darker shadow-2xl flex justify-end items-center overflow-hidden"
      >
        <p className="font-script text-3xl text-olive-green/30 rotate-90 translate-x-12 whitespace-nowrap">
          Andrei & Ana-Maria
        </p>
      </motion.div>
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ delay: 1, duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 bg-white z-50 border-l border-cream-darker shadow-2xl flex justify-start items-center overflow-hidden"
      >
        <p className="font-script text-3xl text-olive-green/30 -rotate-90 -translate-x-12 whitespace-nowrap">
          12 Iulie 2026
        </p>
      </motion.div>

      {/* 2. CONTINUTUL HERO REVELAT */}
      <div className="relative h-full w-full flex flex-col items-center justify-center px-6">
        {/* Element Decorativ: Petale plutitoare */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, 20, 0],
                rotate: [0, 10, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute opacity-20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: '30px',
                height: '30px',
                backgroundImage: "url('/assets/cream-flower.webp')", // o petală mică watercolor
                backgroundSize: 'contain',
              }}
            />
          ))}
        </div>

        {/* Portretul Central (Ovalul) */}
        <motion.div
          style={{ y: yCouple }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="relative w-64 h-80 md:w-80 md:h-[450px] z-20"
        >
          {/* Rama cu flori (SVG Mask sau imagine cu transparenta) */}
          <div className="absolute inset-0 z-30 pointer-events-none bg-[url('/assets/floral-oval-frame.png')] bg-contain bg-no-repeat bg-center" />

          {/* Imaginea voastra */}
          <div className="absolute inset-4 md:inset-6 overflow-hidden rounded-full border-4 border-white shadow-inner">
            <img
              src="/assets/couple.png"
              alt="Andrei & Ana-Maria"
              className="w-full h-full object-cover grayscale-[20%] sepia-[10%]"
            />
          </div>
        </motion.div>

        {/* Textul Hero */}
        <motion.div
          style={{ opacity: opacityText }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mt-12 text-center z-30"
        >
          <h1 className="font-script text-6xl md:text-8xl text-olive-green mb-4">
            Andrei{' '}
            <span className="text-4xl md:text-5xl font-serif italic">&</span>{' '}
            Ana-Maria
          </h1>
          <div className="w-12 h-px bg-olive-green/30 mx-auto mb-4" />
          <p className="font-serif tracking-[0.3em] uppercase text-sm md:text-base text-dark-brown">
            12 . 07 . 2026
          </p>
        </motion.div>

        {/* Indicator Scroll */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-olive-green/50 mb-2">
            Povestea noastră
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-olive-green/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
