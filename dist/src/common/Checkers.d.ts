import { Repository } from "typeorm";
import { RedSightError } from "./RedSightError";
export declare class Checker<T, U extends Repository<T>> {
    existCheck(arg: any, rep: U, errorMessage?: string, returnEntity?: boolean): Promise<T | RedSightError | boolean>;
    notExistCheck(arg: any, rep: U, errorMessage?: string, returnEntity?: boolean): Promise<T | RedSightError | boolean>;
}
