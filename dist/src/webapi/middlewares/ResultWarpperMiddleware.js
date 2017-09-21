"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const Logger_1 = require("../../common/Logger");
let ResultWarpperMiddleware = class ResultWarpperMiddleware {
    constructor(m_logger) {
        this.m_logger = m_logger;
    }
    use(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {};
            try {
                yield next();
                if (!(context.status.toString().slice(0, 1) === "4") && !(context.status.toString().slice(0, 1) === "5")) {
                    if (!!context.body.httpCode)
                        result.IsSuccess = context.body.httpCode === 200;
                    else
                        result.IsSuccess = true;
                    result.Data = context.body;
                    context.body = result;
                }
            }
            catch (error) {
                context.status = error.httpCode || 500;
                if (Array.isArray(error.errors) && error.errors.every((v) => v instanceof class_validator_1.ValidationError)) {
                    let message = null;
                    error.errors.forEach((v) => {
                        Object.keys(v.constraints).forEach((type) => {
                            message = v.constraints[type];
                            return false;
                        });
                        return false;
                    });
                    result.ExceptionMessage = message;
                }
                else {
                    result.ExceptionMessage = !!error.message ? error.message : "预期外错误";
                }
                if (context.status === 500) {
                    this.m_logger.error(error.message, error);
                }
                else {
                    this.m_logger.error(error.message);
                }
                result.IsSuccess = false;
                context.body = result;
            }
        });
    }
};
ResultWarpperMiddleware = __decorate([
    routing_controllers_1.Middleware({ type: "before" }),
    __metadata("design:paramtypes", [Logger_1.Logger])
], ResultWarpperMiddleware);
exports.ResultWarpperMiddleware = ResultWarpperMiddleware;
//# sourceMappingURL=ResultWarpperMiddleware.js.map