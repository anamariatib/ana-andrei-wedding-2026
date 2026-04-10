import { motion } from 'framer-motion';
import Button from './shared/Button';

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
}: Readonly<EventProps>) {
  const isImageLeft = imagePosition === 'left';

  return (
    <section className="mx-auto my-12 px-6 overflow-hidden max-w-250">
      <div
        className={`flex flex-col min-[850px]:items-center min-[850px]:justify-between ${
          isImageLeft ? 'min-[850px]:flex-row' : 'min-[850px]:flex-row-reverse'
        }`}
      >
        {/* --- ZONA IMAGINE --- */}
        <motion.div
          className="relative w-full flex justify-center min-[850px]:w-[60%]"
          initial={{ opacity: 0, x: isImageLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Decor de fundal (Splash) */}
          <div className="absolute inset-0 bg-cream-darker/20 watercolor-mask scale-110 rotate-6 blur-sm pointer-events-none" />

          {/* Container Imagine */}
          <div className="relative w-[350px] sm:w-[400px] min-[850px]:w-[500px] aspect-square watercolor-mask overflow-hidden shadow-sm">
            <img
              src={imageUrl}
              alt={`Imagine locație ${title}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000 ease-in-out"
            />
          </div>
        </motion.div>

        {/* --- ZONA TEXT --- */}
        <motion.div
          className={`w-full min-[850px]:w-[40%] flex flex-col gap-6 ${
            isImageLeft
              ? 'min-[850px]:text-left min-[850px]:items-start'
              : 'min-[850px]:text-right min-[850px]:items-end'
          } text-center items-center`}
          initial={{ opacity: 0, x: isImageLeft ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="max-w-[400px] space-y-3">
            <h2 className="text-olive-green">{title}</h2>

            <div
              className={`flex items-center gap-4 justify-center ${
                isImageLeft
                  ? 'min-[850px]:justify-start'
                  : 'min-[850px]:justify-end'
              }`}
            >
              <span className="font-serif text-2xl min-[850px]:text-3xl tracking-tighter text-dark-brown whitespace-nowrap">
                {time}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-dark-brown uppercase tracking-[0.2em] text-sm">
                {locationName}
              </h3>
              <p className="font-serif italic text-dark-brown/70 text-base leading-relaxed">
                {locationDetails}
              </p>
            </div>

            <div className="pt-4">
              <Button
                href={gpsUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                iconLeft={
                  <img
                    src="/assets/icons/map-pin.svg"
                    alt=""
                    role="presentation"
                    className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-all"
                  />
                }
              >
                <span>Vezi pe hartă</span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
