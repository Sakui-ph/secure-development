export interface Comment {
    id?: string;
    author: string;
    content: string;
    createdAt?: Date;
    announcementId?: string;
}

export const CommentParams = {
    ID: 'id',
    AUTHOR: 'author',
    CONTENT: 'text',
    CREATEDAT: 'date',
    ANNOUNCEMENTID: 'announcementId',
};
