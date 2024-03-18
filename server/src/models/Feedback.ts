export interface Feedback {
    readonly id?: string;
    author: string;
    comment: string;
    photo: File;
}

export const FeedbackParams = {
    ID: 'id',
    AUTHOR: 'author',
    COMMENT: 'comment',
    PHOTO: 'photo',
};
