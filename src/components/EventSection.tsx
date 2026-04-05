import { motion } from 'framer-motion';

interface EventProps {
  title: string;
  time: string;
  locationName: string;
  locationDetails: string;
  gpsUrl: string;
  imageUrl: string;
  imagePosition: 'left' | 'right';
}

export default function EventSection({
  title,
  time,
  locationName,
  locationDetails,
  gpsUrl,
  imageUrl,
  imagePosition = 'left',
}: EventProps) {
  const isImageLeft = imagePosition === 'left';

  return (
    <section className="max-w-6xl mx-auto p-6 overflow-hidden">
      <div
        className={`flex flex-col md:items-center md:gap-12 ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      >
        {/* PARTEA CU IMAGINEA (Watercolor Splash) */}
        <motion.div
          className="relative w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Fundal decorativ (o pată de acuarelă mai mare și mai transparentă în spate) */}
          <div className="absolute inset-0 bg-light-green/30 watercolor-mask scale-110 rotate-12 blur-sm" />

          {/* Imaginea Custom cu Mască de Acuarelă */}
          <div className="relative w-[350px] h-[350px] md:w-[550px] md:h-[450px] watercolor-mask">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000"
            />
          </div>
        </motion.div>

        {/* PARTEA CU TEXTUL */}
        <motion.div
          className={`w-full md:w-1/2 text-center ${isImageLeft ? 'md:text-left' : 'md:text-right'}`}
          initial={{ opacity: 0, x: isImageLeft ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="space-y-6">
            <h2 className="text-olive-green mb-4">{title}</h2>
            <div
              className={`flex items-center gap-4 justify-center ${isImageLeft ? 'md:justify-start' : 'md:justify-end'}`}
            >
              <h1 className="font-serif text-2xl md:text-3xl tracking-tighter text-dark-brown">
                {time}
              </h1>
              <div className="hidden md:block h-px w-12 bg-cream-darker" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif font-bold text-dark-brown uppercase tracking-widest">
                {locationName}
              </h3>
              <p className="font-serif italic text-dark-brown/70">
                {locationDetails}
              </p>
            </div>

            <div
              className={`pt-2 flex justify-center ${isImageLeft ? 'md:justify-start' : 'md:justify-end'}`}
            >
              {/* extract button outline into a separate component with animation and icon */}
              <motion.a
                href={gpsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline flex items-center group"
              >
                <img
                  src="/assets/icons/map-pin.svg"
                  alt="map pin"
                  className="w-4 h-4 group-hover:mr-2 transition-all mb-0.5"
                />
                Vezi pe hartă
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
