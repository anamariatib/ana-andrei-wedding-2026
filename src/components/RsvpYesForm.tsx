import type { FocusEvent } from 'react';
import type {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';

import type { RsvpFormData } from '../models/RsvpFormData';
import { NETLIFY_FORM_NAME } from '../constants/general';
import Button from './shared/Button';

type RsvpYesFormProps = {
  fields: FieldArrayWithId<RsvpFormData, 'guests', 'id'>[];
  register: UseFormRegister<RsvpFormData>;
  errors: FieldErrors<RsvpFormData>;
  onGuestNumberBlur: (event: FocusEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export default function RsvpYesForm({
  fields,
  register,
  errors,
  onGuestNumberBlur,
  onSubmit,
}: Readonly<RsvpYesFormProps>) {
  return (
    <form
      name={NETLIFY_FORM_NAME}
      method="POST"
      data-netlify="true"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
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
              onBlur: onGuestNumberBlur,
              valueAsNumber: true,
              required: 'Min 1 - Max 5',
              min: {
                value: 1,
                message: 'Min 1 - Max 5',
              },
              max: {
                value: 5,
                message: 'Min 1 - Max 5',
              },
            })}
          />
          {errors.adults && (
            <span className="error-message">{errors.adults.message}</span>
          )}
        </div>
        <div className="form-input-number">
          <label htmlFor="children">Copii</label>
          <input
            id="children"
            type="number"
            min={0}
            max={5}
            {...register('children', {
              onBlur: onGuestNumberBlur,
              valueAsNumber: true,
              required: 'Min 0 - Max 5',
              min: {
                value: 0,
                message: 'Min 0 - Max 5',
              },
              max: {
                value: 5,
                message: 'Min 0 - Max 5',
              },
            })}
          />
          {errors.children && (
            <span className="error-message">{errors.children.message}</span>
          )}
        </div>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className={fields.length > 1 ? 'mb-12' : ''}>
          <div className="form-input" title="Câmp obligatoriu">
            <label htmlFor={`guests.${index}.name`}>
              Nume invitat {fields.length > 1 ? index + 1 : ''} *
            </label>
            <input
              id={`guests.${index}.name`}
              placeholder="Nume și prenume"
              className={errors.guests?.[index]?.name ? 'input-error' : ''}
              {...register(`guests.${index}.name` as const, {
                required: 'Numele este obligatoriu',
              })}
            />
            {errors.guests?.[index]?.name && (
              <span className="error-message">
                {errors.guests[index]?.name?.message}
              </span>
            )}
          </div>

          <div className="form-input" title="Câmp opțional">
            <label htmlFor={`guests.${index}.dietary`}>
              Preferințe alimentare
            </label>
            <input
              id={`guests.${index}.dietary`}
              placeholder="Ex: fără gluten, alergii alimentare, vegetarian, etc"
              {...register(`guests.${index}.dietary`)}
            />
          </div>

          <fieldset className="form-radio-group" title="Câmp obligatoriu">
            <legend className="form-radio-legend">
              Vei participa la cununia civilă? *
            </legend>

            <div className="form-radio-options">
              <div className="form-radio-option">
                <input
                  type="radio"
                  id={`guests.${index}.ceremony-yes`}
                  value="true"
                  className="form-radio-input"
                  {...register(`guests.${index}.ceremony`, {
                    required: 'Te rugăm să alegi o opțiune',
                  })}
                />
                <label
                  htmlFor={`guests.${index}.ceremony-yes`}
                  className="form-radio-label"
                >
                  Da
                </label>
              </div>

              <div className="form-radio-option">
                <input
                  type="radio"
                  id={`guests.${index}.ceremony-no`}
                  value="false"
                  className="form-radio-input"
                  {...register(`guests.${index}.ceremony`, {
                    required: 'Te rugăm să alegi o opțiune',
                  })}
                />
                <label
                  htmlFor={`guests.${index}.ceremony-no`}
                  className="form-radio-label"
                >
                  Nu
                </label>
              </div>
            </div>

            {errors.guests?.[index]?.ceremony && (
              <span className="error-message">
                {errors.guests[index]?.ceremony?.message}
              </span>
            )}
          </fieldset>
        </div>
      ))}

      <div className="form-input" title="Câmp opțional">
        <label htmlFor="song">
          Vreau neapărat să dansez la nuntă pe melodia
        </label>
        <input
          id="song"
          placeholder="Artist și nume melodie"
          {...register('favoriteSong')}
        />
      </div>

      <div className="form-input" title="Câmp opțional">
        <label htmlFor="comments">Ai un mesaj pentru noi?</label>
        <textarea
          id="comments"
          className="resize-none"
          {...register('comments')}
        />
      </div>

      <Button type="submit" variant="solid" className="w-full">
        Trimite confirmarea
      </Button>
    </form>
  );
}
