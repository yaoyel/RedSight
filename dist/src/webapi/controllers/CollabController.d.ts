/// <reference types="koa" />
import { Request, Response } from "koa";
import { RedSightError } from "../../common/RedSightError";
export declare class CollabController {
    constructor();
    docs(): Promise<{
        id: string;
        users: any;
    }[]>;
    getDocsFromId(id: string, request: Request): Promise<{
        doc: any;
        users: any;
        version: any;
        comments: any;
        commentVersion: any;
    }>;
    events(req: Request, resp: Response, id: string, ver: string, commentVer: string): Promise<RedSightError | {
        version: any;
        commentVersion: any;
        steps: any;
        clientIDs: any;
        comment: any;
    }>;
    postEvent(id: string, data: any, req: Request): Promise<any>;
    private reqIp(request);
    private nonNegInteger(ver);
    private outputEvents(inst, data);
}
