import {Request, Response} from "koa";
import {Step} from "prosemirror-transform";
import  schema from "../../collab/Schema";
import { getInstance, instanceInfo} from "../../collab/Utils";
import {JsonController, Get, Post, Param, Req, BadRequestError, QueryParam, Res, Body} from "routing-controllers";
import {RedSightError} from "../../common/RedSightError";
import {Comments} from "../../collab/Comment";

export class CollabController {
    constructor() {
    }

    @Get("/docs")
    public async docs() {
        return instanceInfo();
    }

    @Get("/docs/:id")
    public async getDocsFromId(
        @Param("id")id: string,
        @Req() request: Request
    ) {
        let ip = this.reqIp(request);
        let inst = getInstance(id, ip);
        if (!inst.comments) {
            inst.comments = new Comments();
        }

        return {
            doc: inst.doc.toJSON(),
            users: inst.userCount,
            version: inst.version,
            comments: inst.comments.comments,
            commentVersion: inst.comments.version
        };
    }

    @Get("/docs/events/:id")
    public async events(
        @Req() req: Request,
        @Res() resp: Response,
        @Param("id")id: string,
        @QueryParam("version") ver: string,
        @QueryParam("commentVersion") commentVer: string
    ) {
        let version = this.nonNegInteger(ver);
        let commentVersion = this.nonNegInteger(commentVer);
        let inst = getInstance(id, this.reqIp(req));

        let data = inst.getEvents(version, commentVersion);
        if (data === false)
            return new RedSightError("history no longer availbale");

        if (data.steps.length || data.comment.length)
            return this.outputEvents(inst, data);

        // let wait=new Waiting(resp,inst,this.reqIp(req),()=>{
        //     wait.send(this.outputEvents(inst,inst.getEvents(version,commentVersion)))
        // });
        //
        // inst.waiting.push(wait);
        //  resp.distory("close",()=>wait.abort());
    }

    @Post("/docs/events/:id")
    public async postEvent(
        @Param("id") id: string,
        @Body() data: any,
        @Req() req: Request
    ) {
        let version = this.nonNegInteger(data.version);
        console.log(data.steps);
        let steps = data.steps.map((s: any) => Step.fromJSON(schema, s));
        let instance = getInstance(id, this.reqIp(req));


        console.log(steps);
        let result = instance.addEvents(version, steps, data.comment, data.clientID);

        if (!result)
            return new RedSightError("Version not current");
        return result;
    }

    private reqIp(request: Request) {
        return request.headers["x-forwarded-for"] || request.socket.remoteAddress;
    }

    private nonNegInteger(ver: string) {
        let num = Number(ver)
        if (!isNaN(num) && Math.floor(num) === num && num >= 0) return num
        throw new BadRequestError("Not a non-negative integer: " + ver);
    }

    private outputEvents(inst: any, data: any) {
        return {
            version: inst.version,
            commentVersion: inst.comments.version,
            steps: data.steps.map((s: any) => s.toJSON()),
            clientIDs: data.steps.map((step: any) => step.clientID),
            comment: data.comment
        };
    }

}
