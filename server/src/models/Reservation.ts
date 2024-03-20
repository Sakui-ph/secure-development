export interface Reservation {
    id?: string;
    reservation_date: string;
    email: string;
    room: string;
    adminApproved: string;
    clientIdFile: string;
    reservationStatus?: string;
}

export const ReservationParams = {
    ID: 'id',
    DATE: 'date',
    TIME: 'time',
    EMAIL: 'email',
    ROOM: 'room',
};

export enum AdminApprovedStatus {
    'pending',
    'approved',
    'not approved',
}

export enum ReservationStatus {
    'ongoing',
    'cancelled',
    'finished',
}
