export interface Appointment {
    id?: string;
    date?: Date;
    time?: string;
    patientId?: string;
    doctorId?: string;
    resultId?: string;
    state?: 'completed' | 'cancelled' | null;
}
