import { useEffect, useState } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';

import type { SubmitHandler } from 'react-hook-form';
import type { RsvpFormData } from '../models/RsvpFormData';

import {
  NETLIFY_FORM_NAME,
  RSVP_NA,
  RSVP_NO,
  RSVP_YES,
} from '../constants/general';
import { encodeFormData } from '../utils/netlify';
import { RSVP_DECORATIONS } from '../constants/images';

export default function RSVPForm() {
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const { register, control, handleSubmit, setValue } = useForm<RsvpFormData>({
    defaultValues: {
      status: RSVP_NA,
      adults: 1,
      children: 0,
      guests: [{ name: '', dietary: '' }],
      favoriteSong: '',
      comments: '',
    },
  });
  const { fields, replace } = useFieldArray({ control, name: 'guests' });
  const status = useWatch({ control, name: 'status', defaultValue: RSVP_NA });
  const adults = useWatch({ control, name: 'adults', defaultValue: 1 });
  const guests = useWatch({
    control,
    name: 'guests',
    defaultValue: [{ name: '', dietary: '' }],
  });

  useEffect(() => {
    const currentGuests = guests ?? [];
    const totalGuests = Math.min(adults, 5);

    if (currentGuests.length >= totalGuests) {
      return;
    }

    const nextGuests = Array.from({ length: totalGuests }, (_, index) => {
      return currentGuests[index] ?? { name: '', dietary: '' };
    });

    replace(nextGuests);
  }, [adults, guests, replace]);

  const onSubmit: SubmitHandler<RsvpFormData> = (data) => {
    console.log('Submitting form data:', data);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeFormData({
        'form-name': NETLIFY_FORM_NAME,
        ...data,
      }),
    })
      .then(() => {
        setSubmitMessage('Mulțumim! Răspunsul a fost trimis cu succes.');
      })
      .catch(() => {
        setSubmitMessage(
          'A apărut o eroare la trimitere. Te rugăm să încerci din nou.',
        );
      });
  };

  return (
    <section className="relative isolate overflow-hidden text-white">
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

      <section className="section-content relative z-20">
        <div className="section-title">
          <h1 className="text-white">Vom sărbători împreună?</h1>
          <p>
            Confirmă până la <strong>22.06.2026</strong>
          </p>
        </div>
        <div className="section-body">
          <div className="mt-4 flex flex-wrap gap-x-4">
            <button
              type="button"
              className={`btn-outline flex-1 basis-[16rem] ${status === RSVP_YES ? 'btn-outline--active' : ''}`}
              onClick={() => setValue('status', RSVP_YES)}
            >
              Da, voi participa!
            </button>
            <button
              type="button"
              className={`btn-outline flex-1 basis-[16rem] ${status === RSVP_NO ? 'btn-outline--active' : ''}`}
              onClick={() => setValue('status', RSVP_NO)}
            >
              Din păcate, nu pot veni!
            </button>
          </div>

          {status === RSVP_YES && (
            <form
              name={NETLIFY_FORM_NAME}
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6"
            >
              <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
              <div className="form-number-row">
                <div className="form-input-number">
                  <label htmlFor="adults">Adulți</label>
                  <input
                    id="adults"
                    type="number"
                    min={1}
                    max={5}
                    {...register('adults', {
                      valueAsNumber: true,
                      required: true,
                      min: 1,
                      max: 5,
                    })}
                  />
                </div>
                <div className="form-input-number">
                  <label htmlFor="children">Copii</label>
                  <input
                    id="children"
                    type="number"
                    min={0}
                    max={5}
                    {...register('children', {
                      valueAsNumber: true,
                      required: true,
                      min: 0,
                      max: 5,
                    })}
                  />
                </div>
              </div>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className={fields.length > 1 ? 'mb-12' : ''}
                >
                  <div className="form-input">
                    <label htmlFor={`guests.${index}.name`}>
                      Nume invitat {index + 1}
                    </label>
                    <input
                      id={`guests.${index}.name`}
                      placeholder="Nume și prenume"
                      {...register(`guests.${index}.name`)}
                    />
                  </div>
                  <div className="form-input">
                    <label htmlFor={`guests.${index}.dietary`}>
                      Preferințe alimentare
                    </label>
                    <input
                      id={`guests.${index}.dietary`}
                      placeholder="Ex: fără gluten, alergii alimentare, vegetarian, etc"
                      {...register(`guests.${index}.dietary`)}
                    />
                  </div>
                </div>
              ))}
              <div className="form-input">
                <label htmlFor="song">
                  Vreau neapărat să dansez la nuntă pe melodia
                </label>
                <input
                  id="song"
                  placeholder="Artist și nume melodie"
                  {...register('favoriteSong')}
                />
              </div>
              <div className="form-input">
                <label htmlFor="comments">Ai un mesaj pentru noi?</label>
                <textarea id="comments" {...register('comments')} />
              </div>
              <button type="submit" className="btn-solid w-full">
                Trimite confirmarea
              </button>
            </form>
          )}

          {status === RSVP_NO && (
            <form
              name={NETLIFY_FORM_NAME}
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit(onSubmit)}
              className="mt-6"
            >
              <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
              <div className="form-input">
                <label htmlFor="name">Nume complet</label>
                <input
                  id="name"
                  placeholder="Nume și prenume"
                  {...register('guests.0.name', { required: true })}
                />
              </div>
              <div className="form-input">
                <label htmlFor="comments">Ai un mesaj pentru noi?</label>
                <textarea id="comments" {...register('comments')} />
              </div>
              <button type="submit" className="btn-solid w-full">
                Trimite răspunsul
              </button>
            </form>
          )}

          {submitMessage && <p className="mt-4">{submitMessage}</p>}
        </div>
      </section>
    </section>
  );
}
