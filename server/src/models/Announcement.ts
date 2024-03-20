export interface Announcement {
    id?: string;
    text: string;
    image: Buffer;
}

export const AnnouncementParams = {
    ID: 'id',
    TEXT: 'text',
    IMAGE: 'image',
};
