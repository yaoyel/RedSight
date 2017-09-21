import {KoaMiddlewareInterface, Middleware} from "routing-controllers";
import {ValidationError} from "class-validator";
import {Logger} from "../../common/Logger";
import {IResult} from "./IResult";

@Middleware({type: "before"})
export class ResultWarpperMiddleware implements KoaMiddlewareInterface {
    constructor(private readonly m_logger: Logger) {
    }

    async use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
        let result: IResult = <IResult>{};

        try {
            await next();
            if (!(context.status.toString().slice(0, 1) === "4") && !(context.status.toString().slice(0, 1) === "5")) {
                if (!!context.body.httpCode)
                    result.IsSuccess = context.body.httpCode === 200;
                else
                    result.IsSuccess = true;
                result.Data = context.body;
                context.body = result;
            }
        }
        catch (error) {
            context.status = error.httpCode || 500;
            if (Array.isArray(error.errors) && error.errors.every((v: ValidationError) => v instanceof ValidationError)) {
                let message = null;
                error.errors.forEach((v: ValidationError) => {
                    Object.keys(v.constraints).forEach((type) => {
                        message = v.constraints[type];
                        return false;
                    });
                    return false;
                });

                result.ExceptionMessage = message;
            } else {
                result.ExceptionMessage = !!error.message ? error.message : "预期外错误";
            }
            if (context.status === 500) {
                this.m_logger.error(error.message, error);
            } else {
                this.m_logger.error(error.message);
            }

            result.IsSuccess = false;
            context.body = result;
        }
    }
}