import {KoaMiddlewareInterface, Middleware} from "routing-controllers";
import {Logger} from "../../common/Logger";

@Middleware({type: "before"})
export class LoggerMiddleware implements KoaMiddlewareInterface {
    constructor(private readonly m_logger: Logger) {
    }

    async use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        const start = Date.now();
        await next();
        const ms = Date.now() - start;
        context.set("ResTime", `${ms}ms`);
        const payload = {
            url: context.req.url,
            method: context.req.method,
            query: context.req.query,
            body: context.req.body,
            res: context.body,
            times: ms,
            user: "xx", // todo,
            status: context.res.statusCode
        }

        this.m_logger.info(payload);
    }
}