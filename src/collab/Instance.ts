import {Mapping} from "prosemirror-transform";
import schema from "./Schema";
import {Comments} from "./Comment";
import {RedSightError} from "../common/RedSightError";
import {scheduleSave} from "./Utils";

const MAX_STEP_HISTORY = 10000;

export class Instance {
    id: string;
    steps: number[] = [];
    users: any = Object.create(null);
    collecting: any = null;
    doc: any;
    comments: Comments = new Comments();
    lastActive: Date = new Date();
    userCount: number = 0;
    waiting: any[] = [];
    version: number = 0;

    constructor(id: string, doc: any, comments: Comments) {
        this.id = id;
        this.doc = doc || schema.node("doc", null, [schema.node("paragraph", null, [
            schema.text("input")
        ])]);
        comments = comments;
    }

    stop() {
        if (this.collecting != null) clearInterval(this.collecting);
    }

    checkVersion(version: number): void {
        if (version < 0 || version > this.version) {
            let err = new RedSightError("Invalid version" + version);
            err.httpCode = 400;
            throw err;
        }
    }

    addEvents(version: number, steps: any[], comments: Comments, clientId: number): any {

        this.checkVersion(version);
        if (this.version !== version) return false;
        let doc = this.doc, maps: any = [];

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

        this.comments.mapThrough(new Mapping(maps));
        if (comments && comments.comments)
            for (let i = 0; i < comments.comments.length; i++) {
                let event: any = comments.events[i];
                if (event.type === "delete")
                    this.comments.delete(event.id);
                else
                    this.comments.create(event);
            }

        while (this.waiting.length) this.waiting.pop().finish();

        //  scheduleSave(this);
        return {version: this.version, commentVersion: this.comments.version};
    }

    getEvents(version: number, commentVersion: number) {
        this.checkVersion(version);
        let startIndex = this.steps.length - (this.version - version);
        if (startIndex < 0) return false;
        let commentStartIndex = this.comments.events.length - (this.comments.version - commentVersion);
        if (commentStartIndex < 0) return false;

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

    registerUser(ip: string) {
        if (!(ip in this.users)) {
            this.users[ip] = true;
            this.userCount++;
            if (this.collecting == null)
                this.collecting = setTimeout(() => this.collectUsers(), 5000);
        }
    }
}

