import {createConnection} from "typeorm";

import {getDbConfig} from "../src/sys-configs";

describe("sys-config", () => {
    describe("getDbConfig", () => {
        it("returns the configuration", () => {
            let c = getDbConfig("db");
            expect(c.type).not.toBeUndefined();
        });
    });
    describe("database should be connectible", () => {
        createConnection({
            driver: getDbConfig(),
            autoSchemaSync: false,
            entities: []
        }).then(async connection => {
            await connection.close();
        }).catch(reason => {
            fail(reason);
        });
    });
});