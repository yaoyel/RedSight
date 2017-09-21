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
const RedSightError_1 = require("./RedSightError");
class Checker {
    existCheck(arg, rep, errorMessage, returnEntity = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield rep.findOne(arg);
            if (t) {
                if (errorMessage && !returnEntity)
                    throw new RedSightError_1.RedSightError(errorMessage);
                if (returnEntity)
                    return t;
                else
                    return true;
            }
            else {
                return false;
            }
        });
    }
    notExistCheck(arg, rep, errorMessage, returnEntity = true) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield rep.findOne(arg);
            if (t) {
                if (returnEntity)
                    return t;
                else
                    return false;
            }
            else {
                if (errorMessage)
                    throw new RedSightError_1.RedSightError(errorMessage);
                return true;
            }
        });
    }
}
exports.Checker = Checker;
//# sourceMappingURL=Checkers.js.map