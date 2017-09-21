import { Comments } from "./Comment";
export declare class Instance {
    id: string;
    steps: number[];
    users: any;
    collecting: any;
    doc: any;
    comments: Comments;
    lastActive: Date;
    userCount: number;
    waiting: any[];
    version: number;
    constructor(id: string, doc: any, comments: Comments);
    stop(): void;
    checkVersion(version: number): void;
    addEvents(version: number, steps: any[], comments: Comments, clientId: number): any;
    getEvents(version: number, commentVersion: number): false | {
        steps: number[];
        comment: any[];
        users: number;
    };
    collectUsers(): void;
    registerUser(ip: string): void;
}
