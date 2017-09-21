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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const utils_1 = require("../utils");
const Checkers_1 = require("../../common/Checkers");
const UserRepository_1 = require("../../data/UserRepository");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
let AuthController = class AuthController {
    constructor(m_userRepository) {
        this.m_userRepository = m_userRepository;
    }
    token(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const checker = new Checkers_1.Checker();
            let check = yield checker.notExistCheck({ phoneNumber }, this.m_userRepository, null, false);
            if (check)
                yield this.m_userRepository.createUserByPhoneNumber(phoneNumber);
            const token = yield utils_1.signJwt({ phoneNumber }, "1h", "RS256");
            return token;
        });
    }
};
__decorate([
    routing_controllers_1.Post("/token/:phonenumber"),
    __param(0, routing_controllers_1.Param("phonenumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "token", null);
AuthController = __decorate([
    typedi_1.Service(),
    routing_controllers_1.JsonController("/auth"),
    __param(0, typeorm_typedi_extensions_1.OrmCustomRepository(UserRepository_1.UserRepository)),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map