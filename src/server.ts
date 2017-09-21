import "reflect-metadata";  // This package should be imported before `typedi`, `typeorm` and `routing-controllers`
import * as config from "config";
import {Container} from "typedi";
import {useContainer as ormUseContainer} from "typeorm";
import {useContainer as routingUseContainer, createKoaServer} from "routing-controllers";
import {getKoaOptions, initializeDatabase} from "./core";

// import "./webapi/middlewares";
// import "./common/HttpHelper";


/* Setup DI container */
Container.set("config", config);                    // TODO: "config" 在其他地方有用到吗？
ormUseContainer(Container);
initializeDatabase(true);                           // TODO: 根据 TypeORM 文档，重建数据库可以通过命令行的方式进行？

routingUseContainer(Container);
const koaApp = createKoaServer(getKoaOptions());
koaApp.listen(3000);
console.log("Server is up and running at port 3000");
