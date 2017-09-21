import "reflect-metadata";
import { Action } from "routing-controllers";
import { AuthController, CollabController } from "./src/webapi/controllers/";
import "./src/webapi/middlewares";
import "./src/common/HttpHelper";
import { DummyController } from "./src/webapi/controllers/DummyController";
export declare const koaOptions: {
    defaultErrorHandler: boolean;
    cors: boolean;
    classTransformer: boolean;
    currentUserChecker: (action: Action, value?: any) => Promise<any>;
    authorizationChecker: (action: Action, roles: string[]) => Promise<boolean>;
    controllers: (typeof AuthController | typeof CollabController | typeof DummyController)[];
};
