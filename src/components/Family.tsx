import { motion } from 'framer-motion';
import { containerVariants, itemVariants } from '../utils/animations';

export default function Family() {
  const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
  const calendarDays = [
    [0, 0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 0, 0],
  ].flat();

  return (
    <section className="section-wrapper p-16 bg-cream/20 relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-4xl mx-auto flex flex-col xl:flex-row items-center justify-center gap-26"
      >
        {/* CALENDAR */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-[320px] flex flex-col items-center"
        >
          <div className="absolute inset-0 bg-cream-darker/24 watercolor-mask scale-150 rotate-200 blur-sm pointer-events-none" />

          <div className="text-center mb-6">
            <h3 className="font-script text-5xl text-dark-green leading-none">
              Salvează în calendar
            </h3>
            <p className="font-serif text-xs tracking-wider">
              Andrei Bortnic & Ana Țibuleac
            </p>
            <p className="font-serif text-xs">12.07.2026 | Duminică</p>
          </div>

          <div className="w-full">
            <p className="text-center mb-3 font-bold">Iulie 2026</p>
            <div className="grid grid-cols-7 text-center font-serif border-t border-dark-brown pt-2">
              {daysOfWeek.map((day, i) => (
                <div key={i} className="font-bold py-1">
                  {day}
                </div>
              ))}
              {calendarDays.map((day, idx) => (
                <div
                  key={idx}
                  className="relative h-8 flex items-center justify-center font-serif"
                >
                  {day !== 0 && (
                    <span className="relative">
                      {day}
                      {day === 12 && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -mt-[2px] w-10 h-10 flex items-center justify-center text-rose pointer-events-none">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-full h-full"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M12 21s-6.8-4.35-9.15-8.14C1.03 9.98 2.18 6.5 5.3 5.67A5.18 5.18 0 0 1 12 8.17a5.18 5.18 0 0 1 6.7-2.5c3.12.83 4.27 4.3 2.45 7.2C18.8 16.65 12 21 12 21Z"
                              stroke="currentColor"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col items-center text-center text-base">
          {/* Parents */}
          <motion.div variants={itemVariants}>
            <p className="italic mb-6 ">Împreună cu părinții,</p>
            <div className="flex flex-col sm:flex-row gap-6 md:gap-10 mb-6">
              <div className="space-y-1 mt-1">
                <p className="font-serif text-sm uppercase tracking-widest">
                  Traian & Daria
                </p>
                <p className="font-names text-4xl">Bortnic</p>
              </div>
              <p className="space-y-1 italic">și</p>
              <div className="space-y-1 mt-1">
                <p className="font-serif text-sm uppercase tracking-widest">
                  Costică & Mariana
                </p>
                <p className="font-names text-4xl">Tibuleac</p>
              </div>
            </div>
          </motion.div>

          {/* Godparents */}
          <motion.div variants={itemVariants}>
            <p className="italic mb-6 ">și nașii,</p>
            <div>
              <p className="font-serif text-sm uppercase tracking-widest">
                Laura & Fabian
              </p>
              <p className="font-names text-4xl">Kuberski</p>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="relative pt-12">
            <p className="font-serif italic  leading-relaxed">
              Vă invităm la celebrarea <br />
              căsătoriei noastre!
            </p>
          </motion.div>
        </div>

        <div
          className="absolute bottom-2 -right-10 w-48 h-48 md:w-70 md:h-70  pointer-events-none -z-10 opacity-40 rotate-150"
          style={{
            backgroundImage: "url('/assets/pink-rose.webp')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div
          className="absolute bottom-110 -left-8 w-48 h-48 md:w-60 md:h-60 md:bottom-80 md:left-0 xl:top-0 xl:-left-10 pointer-events-none -z-10 opacity-40 rotate-30"
          style={{
            backgroundImage: "url('/assets/white-rose.webp')",
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </motion.div>
    </section>
  );
}
