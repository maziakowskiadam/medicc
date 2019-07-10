export interface Appointment {
    id?: string;
    date?: Date;
    time?: string;
    patient?: string;
    doctor?: string;
    result?: string;
    type?: string;
    state?: 'completed' | 'cancelled' | null;
}
