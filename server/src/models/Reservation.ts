export interface Reservation {
    id?: string;
    reservation_date: string;
    email: string;
    room: string;
    adminApproved: ReservationStatus;
    clientId?: File;
}

export const ReservationParams = {
    ID: 'id',
    DATE: 'date',
    TIME: 'time',
    EMAIL: 'email',
    ROOM: 'room',
};

export enum ReservationStatus {
    'pending',
    'approved',
    'not approved',
}
