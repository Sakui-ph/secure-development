import { UserType } from '../../src/models/User';

declare module 'express-session' {
    export interface SessionData {
        user: string | null;
        userType: UserType;
        email: string;
        firstName: string;
    }
}
