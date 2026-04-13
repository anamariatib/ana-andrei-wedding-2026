import { motion } from 'framer-motion';
import Button from './shared/Button';

import { type AttendanceStatus } from '../models/RsvpFormData';
import { RSVP_YES } from '../constants/general';
import { itemVariants } from '../utils/animations';

interface RSVPSuccessProps {
  data: {
    status: AttendanceStatus;
    adults?: number;
    children?: number;
  };
  onReset: () => void;
}

export default function RSVPSuccess({
  data,
  onReset,
}: Readonly<RSVPSuccessProps>) {
  const isAttending = data.status === RSVP_YES;
  const moreThanOneGuest = (data.adults ?? 0) + (data.children ?? 0) > 1;

  return (
    <motion.div className="py-8" variants={itemVariants}>
      <div className="mb-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-serif mb-2">Confirmare primită!</h2>
        <p>Ai completat acest formular cu următoarele detalii:</p>
      </div>

      <div>
        {isAttending ? (
          <div>
            <p className="opacity-80">
              {data?.adults
                ? `${data.adults} ${data.adults > 1 ? 'adulți' : 'adult'}`
                : ''}
              {data?.adults && data?.children ? ' și ' : ''}
              {data?.children
                ? `${data.children} ${data.children > 1 ? 'copii' : 'copil'}`
                : ''}
              {moreThanOneGuest ? ' vor participa' : ' va participa'} la nuntă
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p>Nu vei participa</p>
            <p className="text-sm opacity-80">
              Ne pare rău că nu poți fi alături de noi, dar îți mulțumim pentru
              răspuns!
            </p>
          </div>
        )}
      </div>

      <Button variant="outline" onClick={onReset}>
        Completează din nou
      </Button>
    </motion.div>
  );
}
