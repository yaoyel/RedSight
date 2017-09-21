import {Service} from "typedi";
import {Controller, Get, Param} from "routing-controllers";

/** @summary A controller for test purpose. */
@Service()
@Controller("/dummy")
export class DummyController {

    @Get("/hello/:name")
    public async hello(@Param("name") name: string) {
        let t = Date.now();
        let userName = name == null ? "guest" : name;
        return `Hello ${userName}, now is time ${t.toString()}`;
    }
}