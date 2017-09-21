import * as config from "config";
import {DriverType} from "typeorm/driver/DriverOptions";

export interface IDbConfig {
    type: DriverType;
    host: string;
    database: string;
    username: string;
    password: string;
    autoSchemaSync: boolean;
}

/** 获取数据库配置.
 *  @param dbSetting 在配置文件中数据库配置对象的名称，默认为 `db` */
export function getDbConfig(dbSetting: string = "db"): IDbConfig {
    return {
        type: config.get(`${dbSetting}.type`),
        host: config.get(`${dbSetting}.host`),
        database: config.get(`${dbSetting}.database`),
        username: config.get(`${dbSetting}.username`),
        password: config.get(`${dbSetting}.password`),
        autoSchemaSync: config.get(`${dbSetting}.autoSchemaSync`)
    };
}
