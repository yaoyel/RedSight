import { KoaMiddlewareInterface } from "routing-controllers";
import { Logger } from "../../common/Logger";
export declare class ResultWarpperMiddleware implements KoaMiddlewareInterface {
    private readonly m_logger;
    constructor(m_logger: Logger);
    use(context: any, next: (err?: any) => Promise<any>): Promise<any>;
}
