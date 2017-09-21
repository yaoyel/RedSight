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
const Logger_1 = require("../../common/Logger");
let LoggerMiddleware = class LoggerMiddleware {
    constructor(m_logger) {
        this.m_logger = m_logger;
    }
    use(context, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = Date.now();
            yield next();
            const ms = Date.now() - start;
            context.set("ResTime", `${ms}ms`);
            const payload = {
                url: context.req.url,
                method: context.req.method,
                query: context.req.query,
                body: context.req.body,
                res: context.body,
                times: ms,
                user: "xx",
                status: context.res.statusCode
            };
            this.m_logger.info(payload);
        });
    }
};
LoggerMiddleware = __decorate([
    routing_controllers_1.Middleware({ type: "before" }),
    __metadata("design:paramtypes", [Logger_1.Logger])
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;
//# sourceMappingURL=LoggerMiddleware.js.map