"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const sys_configs_1 = require("../src/sys-configs");
describe("sys-config", () => {
    describe("getDbConfig", () => {
        it("returns the configuration", () => {
            let c = sys_configs_1.getDbConfig("db");
            expect(c.type).not.toBeUndefined();
        });
    });
    describe("database should be connectible", () => {
        typeorm_1.createConnection({
            driver: sys_configs_1.getDbConfig(),
            autoSchemaSync: false,
            entities: []
        }).then((connection) => __awaiter(this, void 0, void 0, function* () {
            yield connection.close();
        })).catch(reason => {
            fail(reason);
        });
    });
});
//# sourceMappingURL=sys-config.test.js.map