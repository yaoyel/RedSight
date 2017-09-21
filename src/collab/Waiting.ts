export class Waiting {
    done: boolean;
    constructor(private resp: any, private inst: any, private ip: string, private finish: any) {
        this.resp = resp
        this.inst = inst
        this.ip = ip
        this.finish = finish
        this.done = false
        resp.setTimeout(1000 * 60 * 5, () => {
            this.abort()
            this.send({});
        });
    }
    abort() {
        let found = this.inst.waiting.indexOf(this);
        if (found > -1) this.inst.waiting.splice(found, 1);
    }

    send(output: any) {
        if (this.done) return;
        output.resp(this.resp);
        this.done = true;
    }
}