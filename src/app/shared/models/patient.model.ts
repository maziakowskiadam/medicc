export interface Patient {
    UUID?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    dateOfBirth?: Date;
    pesel?: string;
    gender?: 'M' | 'F' | 'K';
}
