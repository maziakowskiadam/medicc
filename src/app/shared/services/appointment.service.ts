import { Appointment } from '../models/appointment.model';

export class AppointmentService {

    appointments: Appointment[] = [
        { date: new Date('07.03.2019'), doctorId: 'Jan Kowalski' },
        { date: new Date('07.04.2019'), doctorId: 'Jan Kowalski' },
        { date: new Date('07.05.2019'), doctorId: 'Jan Kowalski' },
        { date: new Date('07.07.2019'), doctorId: 'Jan Kowalski' },
        { date: new Date('07.13.2019'), doctorId: 'Jan Kowalski' },
        { date: new Date('07.18.2019'), doctorId: 'Jan Kowalski' },
        { date: new Date('09.03.2019'), doctorId: 'Jan Kowalski' },
        { date: new Date('12.03.2019'), doctorId: 'Łukasz Wesołowski' },
        { date: new Date('03.03.2019'), doctorId: 'Łukasz Wesołowski' },
    ];

    getAppointments() {
        return this.appointments.slice();
    }

}
