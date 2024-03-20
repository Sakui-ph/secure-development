export interface Comment {
    id?: string;
    author: string;
    text: string;
    date?: Date;
}

export const CommentParams = {
    ID: 'id',
    AUTHOR: 'author',
    TEXT: 'text',
    DATE: 'date',
};
