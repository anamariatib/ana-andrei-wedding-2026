export default function Footer() {
  return (
    <footer className="relative py-12 px-6 ">
      <div
        className="absolute -top-10 -left-10 w-48 h-48 md:w-80 md:h-80 2xl:left-[calc(50%-40rem)] pointer-events-none z-0 opacity-40 rotate-200 scale-80"
        style={{
          backgroundImage: "url('/assets/pink-rose.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div
        className="absolute -bottom-10 -right-10 w-52 h-52 md:w-80 md:h-80 2xl:right-[calc(50%-40rem)] pointer-events-none z-0 opacity-40 rotate-220 scale-80"
        style={{
          backgroundImage: "url('/assets/white-rose.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <div>
          <p className="font-serif mb-6 leading-relaxed">Creat cu ♡ de Ana</p>
        </div>

        <div className="font-serif text-[11px] uppercase tracking-[0.2em] ">
          <p className="mb-1 mt-6">Vă așteptăm cu drag</p>
          <p>2026 • Iași</p>
        </div>
      </div>
    </footer>
  );
}
