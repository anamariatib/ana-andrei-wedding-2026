import type { RsvpFormData } from '../models/RsvpFormData';

export const encodeFormData = (
  data: RsvpFormData & { 'form-name': string },
) => {
  const entries = Object.entries(data) as Array<
    [
      keyof (RsvpFormData & { 'form-name': string }),
      (RsvpFormData & { 'form-name': string })[keyof (RsvpFormData & {
        'form-name': string;
      })],
    ]
  >;

  return entries
    .map(([key, value]) => {
      let serializedValue: string;

      if (value == null) {
        serializedValue = '';
      } else if (typeof value === 'object') {
        serializedValue = JSON.stringify(value);
      } else {
        serializedValue = String(value);
      }

      return `${encodeURIComponent(String(key))}=${encodeURIComponent(serializedValue)}`;
    })
    .join('&');
};
