import "reflect-metadata";  // This package should be imported before `typedi`, `typeorm` and `routing-controllers`
import {ConnectionOptions, createConnection} from "typeorm";
import {Action, RoutingControllersOptions} from "routing-controllers";

import {UserEntity} from "./data/entities/UserEntity";
import * as webApiUtils from "./webapi/utils";
import {DummyController, UserController, AuthController, CollabController} from "./webapi/controllers/";
import {getDbConfig} from "./sys-configs";
import {LoggerMiddleware, ResultWarpperMiddleware} from "./webapi/middlewares";
// import "./common/HttpHelper";


export function getConnectionOptions(): ConnectionOptions {
    let dbConfig = getDbConfig();
    return {
        driver: dbConfig,
        autoSchemaSync: dbConfig.autoSchemaSync,
        entities: [UserEntity]
    };
}

export function initializeDatabase(forceSchemaSync: boolean): void {
    let defaultOptions = getConnectionOptions();
    let options: ConnectionOptions = Object.assign({}, defaultOptions, {
        autoSchemaSync: defaultOptions.autoSchemaSync || forceSchemaSync
    });

    createConnection(options)
        .then(connection => {
            console.log("The database has been initialized.");
        })
        .catch(reason => {
            console.log("The database cannot be connected:");
            console.log(reason);
        });
}

export function getKoaOptions(): RoutingControllersOptions {
    return {
        defaultErrorHandler: false,
        cors: true,
        classTransformer: true,
        currentUserChecker: async (action: Action, value?: any) => {
            const token = action.request.headers["authorization"];

            if (!token) return null;

            let decodeToken = await webApiUtils.verifyJwt(token);
            return decodeToken.data;

        },
        authorizationChecker: async (action: Action, roles: string[]): Promise<boolean> => {
            const token = action.request.headers["authorization"];

            if (!token)
                return false;

            return await webApiUtils.verifyJwt(token).then((v) => {
                return true;
            }).catch((e) => {
                return false;
            });
        },

        controllers: [
            DummyController,
            UserController,
            AuthController,
            CollabController
        ],
        middlewares: [
            LoggerMiddleware,
            ResultWarpperMiddleware
        ]
    };
}
