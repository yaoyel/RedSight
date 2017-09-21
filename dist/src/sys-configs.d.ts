import { DriverType } from "typeorm/driver/DriverOptions";
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
export declare function getDbConfig(dbSetting?: string): IDbConfig;
