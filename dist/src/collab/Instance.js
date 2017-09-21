"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prosemirror_transform_1 = require("prosemirror-transform");
const Schema_1 = require("./Schema");
const Comment_1 = require("./Comment");
const RedSightError_1 = require("../common/RedSightError");
const MAX_STEP_HISTORY = 10000;
class Instance {
    constructor(id, doc, comments) {
        this.steps = [];
        this.users = Object.create(null);
        this.collecting = null;
        this.comments = new Comment_1.Comments();
        this.lastActive = new Date();
        this.userCount = 0;
        this.waiting = [];
        this.version = 0;
        this.id = id;
        this.doc = doc || Schema_1.default.node("doc", null, [Schema_1.default.node("paragraph", null, [
                Schema_1.default.text("input")
            ])]);
        comments = comments;
    }
    stop() {
        if (this.collecting != null)
            clearInterval(this.collecting);
    }
    checkVersion(version) {
        if (version < 0 || version > this.version) {
            let err = new RedSightError_1.RedSightError("Invalid version" + version);
            err.httpCode = 400;
            throw err;
        }
    }
    addEvents(version, steps, comments, clientId) {
        this.checkVersion(version);
        if (this.version !== version)
            return false;
        let doc = this.doc, maps = [];
        for (let i = 0; i < steps.length; i++) {
            steps[i].clientID = clientId;
            let result = steps[i].apply(doc);
            if (!!result.doc && !!doc)
                doc = result.doc;
            maps.push(steps[i].getMap());
        }
        this.doc = doc;
        this.version += steps.length;
        this.steps = this.steps = this.steps.concat(steps);
        if (this.steps.length > MAX_STEP_HISTORY) {
            this.steps.slice(this.steps.length - MAX_STEP_HISTORY);
        }
        this.comments.mapThrough(new prosemirror_transform_1.Mapping(maps));
        if (comments && comments.comments)
            for (let i = 0; i < comments.comments.length; i++) {
                let event = comments.events[i];
                if (event.type === "delete")
                    this.comments.delete(event.id);
                else
                    this.comments.create(event);
            }
        while (this.waiting.length)
            this.waiting.pop().finish();
        //  scheduleSave(this);
        return { version: this.version, commentVersion: this.comments.version };
    }
    getEvents(version, commentVersion) {
        this.checkVersion(version);
        let startIndex = this.steps.length - (this.version - version);
        if (startIndex < 0)
            return false;
        let commentStartIndex = this.comments.events.length - (this.comments.version - commentVersion);
        if (commentStartIndex < 0)
            return false;
        return {
            steps: this.steps.slice(startIndex),
            comment: this.comments.eventsAfter(commentStartIndex),
            users: this.userCount
        };
    }
    collectUsers() {
        this.users = Object.create(null);
        this.userCount = 0;
        this.collecting = null;
        for (let i = 0; i < this.waiting.length; i++) {
            this.registerUser(this.waiting[i].ip);
        }
    }
    registerUser(ip) {
        if (!(ip in this.users)) {
            this.users[ip] = true;
            this.userCount++;
            if (this.collecting == null)
                this.collecting = setTimeout(() => this.collectUsers(), 5000);
        }
    }
}
exports.Instance = Instance;
//# sourceMappingURL=Instance.js.map