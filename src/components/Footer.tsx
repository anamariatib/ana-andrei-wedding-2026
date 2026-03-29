import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, rotate: 210, scale: 0.6 }}
        whileInView={{ opacity: 0.5, rotate: 220, scale: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute -bottom-10 -right-10 w-64 h-64 md:w-80 md:h-80 pointer-events-none z-0"
        style={{
          backgroundImage: "url('/assets/white-rose.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="font-serif mb-6 leading-relaxed">Creat cu ♡ de Ana</p>
          <h2 className="font-script text-6xl text-olive-green">A & A</h2>
          <div className="font-script-swash -mt-10 text-5xl leading-none text-olive-green">
            A
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-serif text-[11px] uppercase tracking-[0.2em] "
        >
          <p className="mb-1 mt-6">Vă așteptăm cu drag</p>
          <p>2026 • Iași</p>
        </motion.div>
      </div>
    </footer>
  );
}
