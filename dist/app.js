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
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const Utils = require("./src/webapi/utils");
const _1 = require("./src/webapi/controllers/");
require("./src/webapi/middlewares");
process.env.NODE_CONFIG_DIR = "./config";
const config = require("config");
require("./src/common/HttpHelper");
const UserEntity_1 = require("./src/data/entities/UserEntity");
const DummyController_1 = require("./src/webapi/controllers/DummyController");
routing_controllers_1.useContainer(typedi_1.Container);
typeorm_1.useContainer(typedi_1.Container);
typedi_1.Container.set("config", config);
typeorm_1.createConnection({
    driver: {
        type: "mysql",
        host: config.get("Mysql.host"),
        port: config.get("Mysql.port"),
        database: config.get("Mysql.database"),
        username: config.get("Mysql.username"),
        password: config.get("Mysql.password")
    },
    // logger: ["query", "error"],
    autoSchemaSync: true,
    entities: [UserEntity_1.UserEntity]
}).then((connect) => __awaiter(this, void 0, void 0, function* () {
    console.log("mysql is connected");
}));
exports.koaOptions = {
    defaultErrorHandler: false,
    cors: true,
    classTransformer: true,
    currentUserChecker: (action, value) => __awaiter(this, void 0, void 0, function* () {
        const token = action.request.headers["authorization"];
        if (!token)
            return null;
        let decodeToken = yield Utils.verifyJwtAsync(token);
        return decodeToken.data;
    }),
    authorizationChecker: (action, roles) => __awaiter(this, void 0, void 0, function* () {
        const token = action.request.headers["authorization"];
        if (!token)
            return false;
        return yield Utils.verifyJwtAsync(token).then((v) => {
            return true;
        }).catch((e) => {
            return false;
        });
    }),
    controllers: [
        DummyController_1.DummyController,
        //  UserController,
        _1.AuthController,
        _1.CollabController
    ]
};
const koaApp = routing_controllers_1.createKoaServer(exports.koaOptions);
koaApp.listen(3000);
console.log("Server is up and running at port 3000");
//# sourceMappingURL=app.js.map