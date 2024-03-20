export interface Announcement {
    id?: string;
    text: string;
    image_data: Buffer;
}

export const AnnouncementParams = {
    ID: 'id',
    TEXT: 'text',
    IMAGE_DATA: 'image_data',
};
