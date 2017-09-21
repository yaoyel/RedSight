declare class Comment {
    from: string;
    to: string;
    text: string;
    id: string;
    constructor(from: string, to: string, text: string, id: string);
    static fromJson(json: any): Comment;
}
declare class Comments {
    comments: Comment[];
    events: any[];
    version: number;
    constructor(comments?: any);
    mapThrough(mapping: any): void;
    create(data: Comment): void;
    index(id: string): number | null;
    delete(id: string): void;
    eventsAfter(startIndex: number): any[];
}
export { Comment, Comments };
