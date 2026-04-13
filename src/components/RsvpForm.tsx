import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';

import type { SubmitHandler } from 'react-hook-form';
import type { AttendanceStatus, RsvpFormData } from '../models/RsvpFormData';

import {
  NETLIFY_FORM_NAME,
  RSVP_NA,
  RSVP_NO,
  RSVP_YES,
} from '../constants/general';
import { encodeFormData } from '../utils/netlify';
import { RSVP_DECORATIONS } from '../constants/images';
import Button from './shared/Button';
import { containerVariants, itemVariants } from '../utils/animations';
import { motion, AnimatePresence, type Transition } from 'framer-motion';
import RSVPSuccess from './RsvpSuccess';
import RsvpYesForm from './RsvpYesForm';
import RsvpNoForm from './RsvpNoForm';

const formRevealVariants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.4, ease: 'easeOut' },
      opacity: { duration: 0.3, delay: 0.1 },
    } as Transition,
  },
};

const STORAGE_KEY = 'wedding-rsvp';

export default function RSVPForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<{
    status: AttendanceStatus;
    adults: number;
    children: number;
  } | null>(() => {
    if (globalThis.window) {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  const formSectionRef = useRef<HTMLDivElement>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormData>({
    defaultValues: {
      status: RSVP_NA,
      adults: 1,
      children: 0,
      guests: [{ name: '', dietary: '', ceremony: null }],
      favoriteSong: '',
      comments: '',
    },
  });
  const { fields, replace } = useFieldArray({ control, name: 'guests' });
  const status = useWatch({ control, name: 'status', defaultValue: RSVP_NA });
  const adults = useWatch({ control, name: 'adults', defaultValue: 1 });

  useEffect(() => {
    clearErrors();
  }, [status, clearErrors]);

  useEffect(() => {
    const currentGuests = getValues('guests') || [];
    const totalGuests = Math.max(1, Math.min(5, adults));

    if (currentGuests.length === totalGuests) {
      return;
    }

    const nextGuests = Array.from({ length: totalGuests }, (_, index) => {
      return currentGuests[index] ?? { name: '', dietary: '', ceremony: false };
    });

    replace(nextGuests);
  }, [adults, replace, getValues]);

  const onGuestNumberBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const fieldId = e.target.id as 'adults' | 'children';
    const val = Number.parseInt(e.target.value, 10);
    const minValue = fieldId === 'adults' ? 1 : 0;
    if (Number.isNaN(val) || val < minValue) setValue(fieldId, minValue);
    if (val > 5) setValue(fieldId, 5);
  };

  const handleReset = () => {
    setSubmittedData(null);
    localStorage.removeItem(STORAGE_KEY);
    reset();
  };

  const handleYesSubmit = () => {
    void handleSubmit(onSubmit)();
  };

  const handleNoSubmit = () => {
    void handleSubmit(onSubmit)();
  };

  const onSubmit: SubmitHandler<RsvpFormData> = (data) => {
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData({
        'form-name': NETLIFY_FORM_NAME,
        ...data,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Eroare: ' + response.status);
        }

        const dataToSave = {
          status: data.status,
          adults: data.adults,
          children: data.children,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
        setSubmittedData(dataToSave);
        formSectionRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      })
      .catch(() => {
        setErrorMessage(
          'A apărut o eroare la trimitere. Te rugăm să încerci din nou.',
        );
      });
  };

  return (
    <section
      className="relative isolate overflow-hidden text-white"
      ref={formSectionRef}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 bg-olive-green opacity-60 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {RSVP_DECORATIONS.map((decoration) => (
          <div
            key={decoration.id}
            className={`absolute bg-no-repeat bg-contain ${decoration.className}`}
            style={{ backgroundImage: decoration.image }}
          />
        ))}
      </div>

      <motion.section
        className="section-content relative z-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-150px' }}
      >
        <div className="section-title">
          <motion.h2 className="text-white" variants={itemVariants}>
            Vom sărbători împreună?
          </motion.h2>
          <motion.p variants={itemVariants}>
            Confirmă până la <strong>22.06.2026</strong>
          </motion.p>
        </div>
        <div className="section-body">
          {submittedData ? (
            <motion.div initial="hidden" animate="visible">
              <RSVPSuccess
                key="success"
                data={submittedData}
                onReset={handleReset}
              />
            </motion.div>
          ) : (
            <motion.div initial="hidden" animate="visible">
              <motion.div
                className="mt-4 flex flex-wrap gap-x-4"
                variants={itemVariants}
              >
                <Button
                  type="button"
                  variant="outline"
                  className={`flex-1 basis-[16rem] ${status === RSVP_YES ? 'btn-outline--active' : ''}`}
                  onClick={() => {
                    setValue('status', RSVP_YES);
                    setErrorMessage(null);
                  }}
                >
                  Da, voi participa!
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setValue('status', RSVP_NO);
                    setErrorMessage(null);
                  }}
                  className={`flex-1 basis-[16rem] ${status === RSVP_NO ? 'btn-outline--active' : ''}`}
                >
                  Din păcate, nu pot veni!
                </Button>
              </motion.div>

              <AnimatePresence mode="wait">
                {status === RSVP_YES && (
                  <motion.div
                    key="rsvp-yes-form"
                    variants={formRevealVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ overflow: 'hidden' }}
                  >
                    <RsvpYesForm
                      fields={fields}
                      register={register}
                      errors={errors}
                      onGuestNumberBlur={onGuestNumberBlur}
                      onSubmit={handleYesSubmit}
                    />
                  </motion.div>
                )}

                {status === RSVP_NO && (
                  <motion.div
                    key="rsvp-no-form"
                    variants={formRevealVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ overflow: 'hidden' }}
                  >
                    <RsvpNoForm
                      register={register}
                      errors={errors}
                      isSubmitting={isSubmitting}
                      onSubmit={handleNoSubmit}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {errorMessage && (
                <p className="mt-4 error-message">{errorMessage}</p>
              )}
              {/* Simulate error message */}
            </motion.div>
          )}
        </div>
      </motion.section>
    </section>
  );
}
