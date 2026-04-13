import { motion } from 'framer-motion';

export default function Gatefold({ isOpen }: Readonly<{ isOpen: boolean }>) {
  return (
    <section>
      {/* SEAL */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 1.2 : 1,
        }}
        transition={{ duration: 0.5 }}
        className="absolute w-[180px] h-[180px] z-[80] left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2"
      >
        <img
          src="/assets/wax-seal.webp"
          alt="Sigiliu A&A"
          className="w-full h-full object-contain"
        />
      </motion.div>

      <motion.div
        animate={{
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 1 : [1, 1.15, 1],
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
        className="absolute left-1/2 top-[65%] -translate-x-1/2 -translate-y-1/2 z-[80] pointer-events-none"
        aria-hidden="true"
      >
        <img
          src="/assets/icons/tap.svg"
          alt=""
          className="h-[40px] w-[40px] opacity-60"
        />
      </motion.div>

      {/* RIBBON */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 z-[75] h-50 opacity-70"
        style={{
          backgroundImage: "url('/assets/chiffon-ribbon.webp')",
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center',
        }}
        animate={{
          opacity: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.5 }}
      />

      {/* GATE LEFT */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? '-100%' : '0%' }}
        transition={{ duration: 1.8, ease: [0.83, 0, 0.17, 1] }}
        className="absolute inset-y-0 left-0 w-1/2 bg-white z-[70] border-r border-cream-darker/10 shadow-[20px_0_40px_rgba(0,0,0,0.05)] flex justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250, 250, 248, 0.6), rgba(250, 250, 248, 0.6)), url('/assets/paper-texture.webp')",
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="hidden md:block short:hidden absolute top-[10%] max-w-3xl text-center">
          {['Andrei', '&', 'Ana-Maria'].map((name) => (
            <h1 key={name} className="text-[5.5rem]">
              {name}
            </h1>
          ))}
        </div>

        <img
          src="/assets/pink-rose.webp"
          alt="Floare roz"
          className="absolute w-60 lg:w-70 opacity-80 rotate-10 bottom-[5%] left-[-20px] md:left-[5px] short:hidden "
        />
      </motion.div>

      {/* GATE RIGHT */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? '100%' : '0%' }}
        transition={{ duration: 1.8, ease: [0.83, 0, 0.17, 1] }}
        className="absolute inset-y-0 right-0 w-1/2 bg-white z-[60] border-l border-cream-darker/10 shadow-[-20px_0_40px_rgba(0,0,0,0.05)] flex justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250, 250, 248, 0.6), rgba(250, 250, 248, 0.6)), url('/assets/paper-texture.webp')",
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat',
        }}
      >
        <div className="hidden md:block short:hidden absolute bottom-[10%] max-w-3xl text-center">
          <h4 className="mb-3 text-[1.5rem]">Ne căsătorim!</h4>
          <h4 className="text-[1.5rem]">12 iulie 2026</h4>
        </div>

        <img
          src="/assets/white-peony.webp"
          alt="Floare albă"
          className="absolute w-70 lg:w-80 opacity-80 rotate-[-100deg] top-[5%] right-[-12px] md:right-[5px] short:hidden "
        />
      </motion.div>
    </section>
  );
}
