import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Gatefold from './Gatefold';

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Mouse movement pentru efectul de profunzime (parallax subtil)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleOpen = () => setIsOpen(true);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  useEffect(() => {
    if (!isOpen) {
      // Blocăm scroll-ul când porțile sunt închise
      document.body.style.overflow = 'hidden';
    } else {
      // Reactivăm scroll-ul când porțile se deschid
      document.body.style.overflow = 'unset';
    }

    // "Cleanup function": ne asigurăm că scroll-ul revine la normal
    // dacă utilizatorul părăsește pagina neașteptat
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const xParallax = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 50,
    damping: 20,
  });
  const yParallax = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), {
    stiffness: 50,
    damping: 20,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yCouple = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityMain = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Variante pentru animatia textului
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 2.2 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={containerRef}
      onClick={handleOpen} // Click oriunde pentru a deschide
      onKeyDown={handleOpen}
      className={`relative h-screen w-full overflow-hidden bg-[#F9F7F2] ${!isOpen ? 'cursor-pointer' : ''}`}
    >
      <Gatefold isOpen={isOpen} />
      {/* 2. CONTINUTUL HERO */}
      <motion.div
        style={{ opacity: opacityMain }}
        className="relative h-full w-full flex flex-col items-center justify-center px-6"
      >
        {/* Elemente Organice (Frunze) animate individual */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <motion.img
              key={i}
              src={`/assets/leaf1.png`}
              style={{
                x: xParallax,
                y: yParallax,
                top: `${10 * i}%`,
                left: `${(i * 25) % 90}%`,
              }}
              animate={{
                rotate: [0, 15, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 7 + i,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-16 h-16 opacity-20"
            />
          ))}
        </div>

        {/* Portretul Central cu mască organică */}
        <motion.div
          style={{ y: yCouple, scale: scaleImage }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.5, ease: 'easeOut' }}
          className="relative w-72 h-[400px] md:w-[450px] md:h-[550px] z-30 group"
        >
          {/* Rama decorativă SVG pentru un look mai "Art Nouveau" */}
          <div className="absolute -inset-10 z-40 pointer-events-none border-[1px] border-olive-green/20 rounded-full scale-95 group-hover:scale-100 transition-transform duration-1000" />

          <div className="w-full h-full overflow-hidden rounded-t-full rounded-b-[200px] border-[12px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <motion.img
              src="/assets/couple.png"
              alt="Andrei & Ana-Maria"
              className="w-full h-full object-cover"
              style={{ scale: 1.1 }} // Putin zoom in pentru a avea loc de miscare
            />
          </div>
        </motion.div>

        {/* Textul Hero - Staggered Reveal */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 text-center z-40"
        >
          <div className="overflow-hidden mb-2">
            <motion.h2 className="font-names text-olive-green">
              Andrei & Ana-Maria
            </motion.h2>
          </div>

          <motion.p
            variants={letterVariants}
            className="font-serif tracking-[0.4em] uppercase text-xs md:text-sm text-dark-brown/70"
          >
            Duminică, 12 Iulie 2026 • Iași
          </motion.p>
        </motion.div>

        {/* Indicator Scroll Modernizat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center group cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
          }
        >
          {/* Linia de scroll - Design rafinat */}
          <div className="relative h-20 w-[1px] bg-gradient-to-b from-olive-green/40 via-olive-green/10 to-transparent">
            {/* Punctul care culisează (Picătura) */}
            <motion.div
              animate={{
                y: [0, 60, 0],
                opacity: [0, 1, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -left-[2px] top-0 w-[5px] h-[5px] rounded-full bg-olive-green shadow-[0_0_10px_rgba(85,107,47,0.4)]"
            />

            {/* O a doua linie statică, foarte fină, pentru contrast */}
            <div className="absolute top-0 -left-[0.5px] w-[2px] h-full bg-olive-green/5" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
