"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_transform_1 = require("prosemirror-transform");
const Schema_1 = require("../../collab/Schema");
const Utils_1 = require("../../collab/Utils");
const routing_controllers_1 = require("routing-controllers");
const RedSightError_1 = require("../../common/RedSightError");
const Comment_1 = require("../../collab/Comment");
class CollabController {
    constructor() {
    }
    docs() {
        return __awaiter(this, void 0, void 0, function* () {
            return Utils_1.instanceInfo();
        });
    }
    getDocsFromId(id, request) {
        return __awaiter(this, void 0, void 0, function* () {
            let ip = this.reqIp(request);
            let inst = Utils_1.getInstance(id, ip);
            if (!inst.comments) {
                inst.comments = new Comment_1.Comments();
            }
            return {
                doc: inst.doc.toJSON(),
                users: inst.userCount,
                version: inst.version,
                comments: inst.comments.comments,
                commentVersion: inst.comments.version
            };
        });
    }
    events(req, resp, id, ver, commentVer) {
        return __awaiter(this, void 0, void 0, function* () {
            let version = this.nonNegInteger(ver);
            let commentVersion = this.nonNegInteger(commentVer);
            let inst = Utils_1.getInstance(id, this.reqIp(req));
            let data = inst.getEvents(version, commentVersion);
            if (data === false)
                return new RedSightError_1.RedSightError("history no longer availbale");
            if (data.steps.length || data.comment.length)
                return this.outputEvents(inst, data);
            // let wait=new Waiting(resp,inst,this.reqIp(req),()=>{
            //     wait.send(this.outputEvents(inst,inst.getEvents(version,commentVersion)))
            // });
            //
            // inst.waiting.push(wait);
            //  resp.distory("close",()=>wait.abort());
        });
    }
    postEvent(id, data, req) {
        return __awaiter(this, void 0, void 0, function* () {
            let version = this.nonNegInteger(data.version);
            console.log(data.steps);
            let steps = data.steps.map((s) => prosemirror_transform_1.Step.fromJSON(Schema_1.default, s));
            let instance = Utils_1.getInstance(id, this.reqIp(req));
            console.log(steps);
            let result = instance.addEvents(version, steps, data.comment, data.clientID);
            if (!result)
                return new RedSightError_1.RedSightError("Version not current");
            return result;
        });
    }
    reqIp(request) {
        return request.headers["x-forwarded-for"] || request.socket.remoteAddress;
    }
    nonNegInteger(ver) {
        let num = Number(ver);
        if (!isNaN(num) && Math.floor(num) === num && num >= 0)
            return num;
        throw new routing_controllers_1.BadRequestError("Not a non-negative integer: " + ver);
    }
    outputEvents(inst, data) {
        return {
            version: inst.version,
            commentVersion: inst.comments.version,
            steps: data.steps.map((s) => s.toJSON()),
            clientIDs: data.steps.map((step) => step.clientID),
            comment: data.comment
        };
    }
}
__decorate([
    routing_controllers_1.Get("/docs"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CollabController.prototype, "docs", null);
__decorate([
    routing_controllers_1.Get("/docs/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __param(1, routing_controllers_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CollabController.prototype, "getDocsFromId", null);
__decorate([
    routing_controllers_1.Get("/docs/events/:id"),
    __param(0, routing_controllers_1.Req()),
    __param(1, routing_controllers_1.Res()),
    __param(2, routing_controllers_1.Param("id")),
    __param(3, routing_controllers_1.QueryParam("version")),
    __param(4, routing_controllers_1.QueryParam("commentVersion")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, String, String]),
    __metadata("design:returntype", Promise)
], CollabController.prototype, "events", null);
__decorate([
    routing_controllers_1.Post("/docs/events/:id"),
    __param(0, routing_controllers_1.Param("id")),
    __param(1, routing_controllers_1.Body()),
    __param(2, routing_controllers_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CollabController.prototype, "postEvent", null);
exports.CollabController = CollabController;
//# sourceMappingURL=CollabController.js.map