"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Waiting {
    constructor(resp, inst, ip, finish) {
        this.resp = resp;
        this.inst = inst;
        this.ip = ip;
        this.finish = finish;
        this.resp = resp;
        this.inst = inst;
        this.ip = ip;
        this.finish = finish;
        this.done = false;
        resp.setTimeout(1000 * 60 * 5, () => {
            this.abort();
            this.send({});
        });
    }
    abort() {
        let found = this.inst.waiting.indexOf(this);
        if (found > -1)
            this.inst.waiting.splice(found, 1);
    }
    send(output) {
        if (this.done)
            return;
        output.resp(this.resp);
        this.done = true;
    }
}
exports.Waiting = Waiting;
//# sourceMappingURL=Waiting.js.map