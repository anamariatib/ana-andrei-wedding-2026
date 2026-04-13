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
    ceremony: boolean | null;
  }[];
  notAttending?: string;
  favoriteSong?: string;
  comments?: string;
}
