export interface Appointment {
    id?: string;
    date?: Date;
    timeStart?: string;
    patient?: string;
    doctorUid?: string;
    result?: string;
    type?: string;
    state?: 'completed' | 'cancelled' | 'free' | 'booked' | null;
}
