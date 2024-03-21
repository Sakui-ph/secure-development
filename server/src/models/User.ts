export interface User {
    prefix_id?: number; // (3) 100 for admin, 101 for user ig
    readonly id?: string; // (7) 7 digit unique id INT

    first_name: string; // varchar(50)
    last_name: string; // varchar(50)

    email: string; // varchar(62)
    password: string; // binary(60)
    //country: string; // varchar(2)
    phone_number: string; // varchar(25)
    /* From stackoverflow:
    All as varchar (they aren't numbers but "collections of digits")
    Country + area + number separately
    Not all countries have area code (eg Malta where I am)
    Some countries drop the leading zero from the area code when dialling internal (eg UK)
    Format in the client code
    */

    profile_picture: Buffer; // medium blob (16mb)
}

export const UserParams = {
    PREFIX_ID: 'prefix_id',
    ID: 'id',
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    EMAIL: 'email',
    PASSWORD: 'password',
    PHONE_NUMBER: 'phone_number',
    PROFILE_PICTURE: 'profile_picture',
};

export const UserType = {
    ADMIN: 'admin',
    USER: 'user',
    NONE: 'none',
};
