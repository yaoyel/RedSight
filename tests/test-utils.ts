import * as supertest from "supertest";
import * as Koa from "koa";
import {createKoaServer} from "routing-controllers";

import {getKoaOptions} from "./../src/core";

const SERVER_PORT: number = 3100;

export type TSupertestCallback = (request: supertest.SuperTest<supertest.Test>) => void;

export async function testRequest(callback: TSupertestCallback) {
    if (!callback) return;

    let app: Koa = createKoaServer(getKoaOptions());
    let server = app.listen(SERVER_PORT);
    try {
        server.on("error", err => {
            console.error(err);
        });

        let request = supertest(server);
        callback(request);
    } finally {
        await server.close();
    }
}