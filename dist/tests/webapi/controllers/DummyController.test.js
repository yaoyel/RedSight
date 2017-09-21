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
const test_utils_1 = require("../../test-utils");
const DummyController_1 = require("../../../src/webapi/controllers/DummyController");
describe("hello", () => {
    it("call action directly", () => {
        let c = new DummyController_1.DummyController();
        let result = c.hello("Yaojian");
        expect(result).toBeInstanceOf(Promise);
        result.then(x => expect(x).toMatch("Hello Yaojian"));
    });
    it("using executeRequest", () => __awaiter(this, void 0, void 0, function* () {
        yield test_utils_1.testRequest(req => {
            req.get("/dummy/hello/Yaojian").expect("Yaojian").expect(200).end((err, res) => {
                console.log(res.body);
            });
        });
    }));
});
//# sourceMappingURL=DummyController.test.js.map