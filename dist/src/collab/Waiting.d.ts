export declare class Waiting {
    private resp;
    private inst;
    private ip;
    private finish;
    done: boolean;
    constructor(resp: any, inst: any, ip: string, finish: any);
    abort(): void;
    send(output: any): void;
}
