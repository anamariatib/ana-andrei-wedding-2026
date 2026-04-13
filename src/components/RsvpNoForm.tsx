import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import type { RsvpFormData } from '../models/RsvpFormData';
import { NETLIFY_FORM_NAME } from '../constants/general';
import Button from './shared/Button';

type RsvpNoFormProps = {
  register: UseFormRegister<RsvpFormData>;
  errors: FieldErrors<RsvpFormData>;
  isSubmitting: boolean;
  onSubmit: () => void;
};

export default function RsvpNoForm({
  register,
  errors,
  isSubmitting,
  onSubmit,
}: Readonly<RsvpNoFormProps>) {
  return (
    <form
      name={NETLIFY_FORM_NAME}
      method="POST"
      data-netlify="true"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />
      <div className="form-input" title="Câmp obligatoriu">
        <label
          htmlFor="name"
          className={errors.guests?.[0]?.name ? 'input-error' : ''}
        >
          Nume complet *
        </label>
        <input
          id="name"
          placeholder="Nume și prenume"
          {...register('guests.0.name', {
            required: 'Numele este obligatoriu',
          })}
        />
        {errors.guests?.[0]?.name && (
          <span className="error-message">
            {errors.guests[0]?.name?.message}
          </span>
        )}
      </div>

      <div className="form-input" title="Câmp opțional">
        <label htmlFor="comments">Ai un mesaj pentru noi?</label>
        <textarea
          id="comments"
          className="resize-none"
          {...register('comments')}
        />
      </div>

      <Button
        type="submit"
        variant="solid"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Se trimite...' : 'Trimite confirmarea'}
      </Button>
    </form>
  );
}
