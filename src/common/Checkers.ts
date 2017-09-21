import {Repository} from "typeorm";
import {RedSightError} from "./RedSightError";

export class Checker<T, U extends Repository<T>> {

    async existCheck(arg: any, rep: U, errorMessage?: string, returnEntity: boolean = true): Promise<T | RedSightError | boolean> {
        const t = await rep.findOne(arg);
        if (t) {
            if (errorMessage && !returnEntity)
                throw new RedSightError(errorMessage);

            if (returnEntity)
                return t;
            else
                return true;
        }
        else {
            return false;
        }
    }

    async notExistCheck(arg: any, rep: U, errorMessage?: string, returnEntity: boolean = true): Promise<T | RedSightError | boolean> {
        const t = await rep.findOne(arg);
        if (t) {
            if (returnEntity)
                return t;
            else
                return false;
        }
        else {
            if (errorMessage)
                throw new RedSightError(errorMessage);
            return true;
        }
    }
}