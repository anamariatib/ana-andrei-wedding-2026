import { motion } from 'framer-motion';
import EventSection from './EventSection';

export default function Events() {
  return (
    <section className="mx-auto text-center">
      <div className="section-title">
        <h1>Evenimente</h1>
        <p>
          Toate poveștile zilei se scriu într-un cadru natural, în{' '}
          <strong>Horpaz</strong>. Cununia civilă și petrecerea vor avea loc în
          același loc, iar biserica se află la o scurtă plimbare de doar 5
          minute.
        </p>
      </div>
      {/* Cununia civila */}
      <EventSection
        title="Cununia civilă"
        time="13:15"
        locationName="Ponton Ambio Events"
        locationDetails="Horpaz, Iași"
        gpsUrl="https://maps.app.goo.gl/bufMh64UMe1UzHGd7"
        imageUrl="/assets/pontoon.png"
        imagePosition="left"
      />

      {/* Cununia religioasa */}
      <EventSection
        title="Cununia religioasă"
        time="14:30"
        locationName="Biserica Sf. Spiridon"
        locationDetails="Horpaz, Iași"
        gpsUrl="https://maps.app.goo.gl/yfa1Cq3Qp175ZzsYA"
        imageUrl="/assets/church.png"
        imagePosition="right"
      />

      {/* Petrecerea */}
      <EventSection
        title="Petrecerea"
        time="16:00"
        locationName="Ambio Events"
        locationDetails="Horpaz, Iași"
        gpsUrl="https://maps.app.goo.gl/bufMh64UMe1UzHGd7"
        imageUrl="/assets/restaurant-ambio.webp"
        imagePosition="left"
      />
    </section>
  );
}
