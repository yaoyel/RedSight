"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata"); // This package should be imported before `typedi`, `typeorm` and `routing-controllers`
const config = require("config");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const routing_controllers_1 = require("routing-controllers");
const core_1 = require("./core");
// import "./webapi/middlewares";
// import "./common/HttpHelper";
/* Setup DI container */
typedi_1.Container.set("config", config); // TODO: "config" 在其他地方有用到吗？
typeorm_1.useContainer(typedi_1.Container);
core_1.initializeDatabase(true); // TODO: 根据 TypeORM 文档，重建数据库可以通过命令行的方式进行？
routing_controllers_1.useContainer(typedi_1.Container);
const koaApp = routing_controllers_1.createKoaServer(core_1.getKoaOptions());
koaApp.listen(3000);
console.log("Server is up and running at port 3000");
//# sourceMappingURL=server.js.map