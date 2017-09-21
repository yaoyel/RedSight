import {testRequest} from "../../test-utils";
import {DummyController} from "../../../src/webapi/controllers/DummyController";

describe("hello", () => {
    it("call action directly", () => {
        let c = new DummyController();
        let result = c.hello("Yaojian");
        expect(result).toBeInstanceOf(Promise);
        result.then(x => expect(x).toMatch("Hello Yaojian"));
    });
    it("using executeRequest", async () => {
       await testRequest(req => {
           req.get("/dummy/hello/Yaojian").expect("Yaojian").expect(200).end((err, res) => {
               console.log(res.body);
           });
       });
    });
});