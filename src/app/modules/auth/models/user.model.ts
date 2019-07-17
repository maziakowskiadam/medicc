export interface Roles {
    doctor: boolean;
    management: boolean;
    patient: boolean;
    patientUnauthorized: boolean;
}

export interface User {
    uid?: string;
    email: string;
    roles: Roles;
}
