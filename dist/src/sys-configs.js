"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
/** 获取数据库配置.
 *  @param dbSetting 在配置文件中数据库配置对象的名称，默认为 `db` */
function getDbConfig(dbSetting = "db") {
    return {
        type: config.get(`${dbSetting}.type`),
        host: config.get(`${dbSetting}.host`),
        database: config.get(`${dbSetting}.database`),
        username: config.get(`${dbSetting}.username`),
        password: config.get(`${dbSetting}.password`),
        autoSchemaSync: config.get(`${dbSetting}.autoSchemaSync`)
    };
}
exports.getDbConfig = getDbConfig;
//# sourceMappingURL=sys-configs.js.map