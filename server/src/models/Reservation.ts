export interface Reservation {
    id?: string;
    date: string;
    time: string;
    email: string;
    room: string;
}

export const ReservationParams = {
    ID: 'id',
    DATE: 'date',
    TIME: 'time',
    EMAIL: 'email',
    ROOM: 'room',
};
