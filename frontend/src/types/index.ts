export type WPPostStatus = 'publish' | 'future' | 'draft' | 'pending' | 'private';

export interface WPPost {
    id: string;
    title: string;
    authorName: string;
    status: WPPostStatus;
    date: string;
}