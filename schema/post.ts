export interface Post {
    id: string;
    date: number;
    title?: string;
    slug?: string;
    status?: string[];
    type?: string[];
    summary?: string;
    fullWidth?: boolean;
    page_cover?: string | null;
    [key: string]: unknown;
}
