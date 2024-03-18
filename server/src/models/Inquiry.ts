export interface Inquiry {
    readonly id?: string;
    name: string;
    phone: string;
    email: string;
    concern: string;
}

export const InquiryParams = {
    ID: 'id',
    NAME: 'name',
    PHONE: 'phone',
    EMAIL: 'email',
    CONCERN: 'concern',
};
