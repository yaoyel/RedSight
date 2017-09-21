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
require("reflect-metadata"); // This package should be imported before `typedi`, `typeorm` and `routing-controllers`
const typeorm_1 = require("typeorm");
const UserEntity_1 = require("./data/entities/UserEntity");
const webApiUtils = require("./webapi/utils");
const _1 = require("./webapi/controllers/");
const sys_configs_1 = require("./sys-configs");
const middlewares_1 = require("./webapi/middlewares");
// import "./common/HttpHelper";
function getConnectionOptions() {
    let dbConfig = sys_configs_1.getDbConfig();
    return {
        driver: dbConfig,
        autoSchemaSync: dbConfig.autoSchemaSync,
        entities: [UserEntity_1.UserEntity]
    };
}
exports.getConnectionOptions = getConnectionOptions;
function initializeDatabase(forceSchemaSync) {
    let defaultOptions = getConnectionOptions();
    let options = Object.assign({}, defaultOptions, {
        autoSchemaSync: defaultOptions.autoSchemaSync || forceSchemaSync
    });
    typeorm_1.createConnection(options)
        .then(connection => {
        console.log("The database has been initialized.");
    })
        .catch(reason => {
        console.log("The database cannot be connected:");
        console.log(reason);
    });
}
exports.initializeDatabase = initializeDatabase;
function getKoaOptions() {
    return {
        defaultErrorHandler: false,
        cors: true,
        classTransformer: true,
        currentUserChecker: (action, value) => __awaiter(this, void 0, void 0, function* () {
            const token = action.request.headers["authorization"];
            if (!token)
                return null;
            let decodeToken = yield webApiUtils.verifyJwt(token);
            return decodeToken.data;
        }),
        authorizationChecker: (action, roles) => __awaiter(this, void 0, void 0, function* () {
            const token = action.request.headers["authorization"];
            if (!token)
                return false;
            return yield webApiUtils.verifyJwt(token).then((v) => {
                return true;
            }).catch((e) => {
                return false;
            });
        }),
        controllers: [
            _1.DummyController,
            _1.UserController,
            _1.AuthController,
            _1.CollabController
        ],
        middlewares: [
            middlewares_1.LoggerMiddleware,
            middlewares_1.ResultWarpperMiddleware
        ]
    };
}
exports.getKoaOptions = getKoaOptions;
//# sourceMappingURL=core.js.map