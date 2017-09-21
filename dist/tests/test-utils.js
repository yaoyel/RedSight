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
const supertest = require("supertest");
const routing_controllers_1 = require("routing-controllers");
const core_1 = require("./../src/core");
const SERVER_PORT = 3100;
function testRequest(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!callback)
            return;
        let app = routing_controllers_1.createKoaServer(core_1.getKoaOptions());
        let server = app.listen(SERVER_PORT);
        try {
            server.on("error", err => {
                console.error(err);
            });
            let request = supertest(server);
            callback(request);
        }
        finally {
            yield server.close();
        }
    });
}
exports.testRequest = testRequest;
//# sourceMappingURL=test-utils.js.map