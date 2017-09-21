import "reflect-metadata";
import { ConnectionOptions } from "typeorm";
import { RoutingControllersOptions } from "routing-controllers";
export declare function getConnectionOptions(): ConnectionOptions;
export declare function initializeDatabase(forceSchemaSync: boolean): void;
export declare function getKoaOptions(): RoutingControllersOptions;
