import {
  motion,
  useScroll,
  useTransform,
  type Transition,
} from 'framer-motion';
import { useRef } from 'react';
import PetalRain from './PetalRain';

export default function Hero() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yCouple = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacityMain = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
      } as Transition,
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.div
        style={{ opacity: opacityMain }}
        className="relative h-full w-full flex flex-col items-center justify-center px-8"
      >
        <PetalRain />

        {/* AA */}
        <motion.div
          style={{ y: yCouple, scale: scaleImage }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
          className="relative w-72 h-[350px] md:w-[450px] md:h-[60%] max-h-[600px] short:max-h-[320px] z-30 group"
        >
          <img
            src="/assets/flower-group-top.webp"
            alt=""
            aria-hidden="true"
            className="absolute -top-14 -right-6 w-50 md:w-65 z-40"
          />
          <img
            src="/assets/flower-group-bottom.webp"
            alt=""
            aria-hidden="true"
            className="absolute -bottom-20 -left-10 md:-left-10 w-45 md:w-60 z-40"
          />
          <div className="w-full h-full overflow-hidden rounded-t-full rounded-b-full  shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
            <motion.img
              src="/assets/couple-green.webp"
              alt="Andrei & Ana-Maria"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate="visible"
          className="mt-8 md:mt-12 text-center z-40"
        >
          <div className="hidden md:block overflow-hidden mb-2">
            <motion.h2
              className="font-names text-olive-green"
              variants={letterVariants}
            >
              Andrei & Ana-Maria
            </motion.h2>
          </div>

          <motion.div
            className="md:hidden overflow-hidden mb-8 short:mb-6"
            variants={letterVariants}
          >
            {['Andrei', '&', 'Ana-Maria'].map((name, index) => (
              <motion.h1
                key={name}
                className={`font-names text-olive-green ${index === 1 ? 'text-4xl leading-4' : 'text-5xl leading-12'}`}
              >
                {name}
              </motion.h1>
            ))}
          </motion.div>

          <motion.p
            variants={letterVariants}
            className="font-serif tracking-[0.4em] uppercase text-xs md:text-sm short:text-[10px]"
          >
            Duminică, 12 Iulie 2026 • Iași
          </motion.p>
        </motion.div>

        {/* INDICATOR SCROLL */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:hidden z-50 short:hidden"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            });
          }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-olive-green/60"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
