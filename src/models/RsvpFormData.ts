import type { RSVP_NA, RSVP_NO, RSVP_YES } from '../constants/general';

export type AttendanceStatus =
  | typeof RSVP_YES
  | typeof RSVP_NO
  | typeof RSVP_NA;

export interface RsvpFormData {
  status: AttendanceStatus;
  adults: number;
  children: number;
  guests: {
    name: string;
    dietary: string;
  }[];
  favoriteSong?: string;
  comments?: string;
}
