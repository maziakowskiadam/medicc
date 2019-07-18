export interface Roles {
    management: boolean;
    doctor: boolean;
    patient: boolean;
    patientUnauthorized: boolean;
}

export class User {
    uid: string;
    email: string;
    roles: Roles;
}
