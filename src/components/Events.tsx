import { motion } from 'framer-motion';
import EventSection from './EventSection';
import { containerVariants, itemVariants } from '../utils/animations';

export default function Events() {
  return (
    <section className="section-wrapper">
      <motion.div
        className="section-title mb-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.h1 variants={itemVariants}>Evenimente</motion.h1>
        <motion.p variants={itemVariants} className="section-description">
          Toate poveștile zilei se scriu într-un cadru natural, în{' '}
          <strong className="text-dark-brown">Horpaz</strong>. Cununia civilă și
          petrecerea vor avea loc în același loc, iar biserica se află la o
          scurtă plimbare de doar 5 minute.
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="font-script-swash text-5xl text-dark-green"
        >
          i
        </motion.p>
      </motion.div>

      {/* TODO: Flori pe fundal de la 1280 */}
      <EventSection
        title="Cununia civilă"
        time="13:15"
        locationName="Ponton Ambio Events"
        locationDetails="Horpaz, Iași"
        gpsUrl="https://maps.app.goo.gl/bufMh64UMe1UzHGd7"
        imageUrl="/assets/pontoon.webp"
        imagePosition="left"
      />

      <EventSection
        title="Cununia religioasă"
        time="14:30"
        locationName="Biserica Sf. Spiridon"
        locationDetails="Horpaz, Iași"
        gpsUrl="https://maps.app.goo.gl/yfa1Cq3Qp175ZzsYA"
        imageUrl="/assets/church.webp"
        imagePosition="right"
      />

      <EventSection
        title="Petrecerea"
        time="16:00"
        locationName="Ambio Events"
        locationDetails="Horpaz, Iași"
        gpsUrl="https://maps.app.goo.gl/bufMh64UMe1UzHGd7"
        imageUrl="/assets/restaurant.webp"
        imagePosition="left"
      />
    </section>
  );
}
