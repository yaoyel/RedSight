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
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const UserRepository_1 = require("../../data/UserRepository");
const CreateUserModel_1 = require("../../data/models/CreateUserModel");
const SmsServerHelper_1 = require("../../common/SmsServerHelper");
const Checkers_1 = require("../../common/Checkers");
const sharp = require("sharp");
const FileHelper_1 = require("../../common/FileHelper");
const UserModel_1 = require("../models/UserModel");
let UserController = class UserController {
    constructor(m_userRepository, m_smsServer, m_fileHelper) {
        this.m_userRepository = m_userRepository;
        this.m_smsServer = m_smsServer;
        this.m_fileHelper = m_fileHelper;
    }
    findByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.m_userRepository.findByPhoneNumber(phoneNumber);
            let result = new UserModel_1.UserModel().assignFrom(user);
            return result;
        });
    }
    createUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const checker = new Checkers_1.Checker();
            yield checker.existCheck({ phoneNumber: user.phoneNumber }, this.m_userRepository, `已经存在手机号码为${user.phoneNumber}的用户`);
            const userEntity = yield this.m_userRepository.createUserAsync(user);
            let result = new UserModel_1.UserModel().assignFrom(userEntity);
            return result;
        });
    }
    resetPassword(phoneNumber, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const checker = new Checkers_1.Checker();
            const user = yield checker.notExistCheck({ phoneNumber }, this.m_userRepository, `不存在手机号为${phoneNumber}的用户。`, true);
            yield this.m_userRepository.resetPasswordAsync(user, newPassword);
        });
    }
    changeName(args) {
        return __awaiter(this, void 0, void 0, function* () {
            const checker = new Checkers_1.Checker();
            const result = yield checker.notExistCheck({ Id: args.userId }, this.m_userRepository, `用户不存在`, true);
            const user = result;
            user.name = name;
            yield this.m_userRepository.updateUserAsync(user);
        });
    }
    requestSmsCode(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.m_smsServer.RequestSmsCode(phoneNumber);
        });
    }
    veritySmsCode(phoneNumber, smsCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.m_smsServer.VeritySmsCode(phoneNumber, smsCode);
        });
    }
    checkByPhoneNumber(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const checker = new Checkers_1.Checker();
            return yield checker.notExistCheck({ phoneNumber }, this.m_userRepository, `不存在手机号为${phoneNumber}的用户。`, true);
            // return checker.Check({phoneNumber}, this.m_userRepository);
        });
    }
    checkByPhoneName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const checker = new Checkers_1.Checker();
            return checker.notExistCheck({ name }, this.m_userRepository, `不存在姓名为${name}的用户。`, false);
        });
    }
    updateAvatar(file, id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file)
                return new routing_controllers_1.BadRequestError("请传入正确的文件");
            const contentType = { contentType: "image/png" };
            yield this.m_fileHelper.uploadFile(`avatar/${id}.jpg`, file.buffer, contentType);
            yield this.m_fileHelper.uploadFile(`avatar/100*100/${id}.jpg`, yield sharp(file.buffer).resize(100).toBuffer(), contentType);
            yield this.m_fileHelper.uploadFile(`avatar/30*30/${id}.jpg`, yield sharp(file.buffer).resize(30).toBuffer(), contentType);
            return true;
        });
    }
};
__decorate([
    routing_controllers_1.Get("/users/findbyphonenumber/:phonenumber"),
    __param(0, routing_controllers_1.Param("phonenumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findByPhoneNumber", null);
__decorate([
    routing_controllers_1.HttpCode(201),
    routing_controllers_1.Post("/users"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserModel_1.CreateUserModel]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUserAsync", null);
__decorate([
    routing_controllers_1.Post("/users/resetpasswrod/:phonenumber/:newpassword"),
    __param(0, routing_controllers_1.Param("phonenumber")), __param(1, routing_controllers_1.Param("newpassword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    routing_controllers_1.Post("/users/changeName"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changeName", null);
__decorate([
    routing_controllers_1.Post("/users/requestsmscode/:phonenumber"),
    __param(0, routing_controllers_1.Param("phonenumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "requestSmsCode", null);
__decorate([
    routing_controllers_1.Post("/users/veritysmscode/:phonenumber/:smscode"),
    __param(0, routing_controllers_1.Param("phonenumber")), __param(1, routing_controllers_1.Param("smscode")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "veritySmsCode", null);
__decorate([
    routing_controllers_1.Post("/users/checkbyphonenumber/:phoneNumber"),
    __param(0, routing_controllers_1.Param("phoneNumber")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkByPhoneNumber", null);
__decorate([
    routing_controllers_1.Post("/users/checkbyname/:name"),
    __param(0, routing_controllers_1.Param("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "checkByPhoneName", null);
__decorate([
    routing_controllers_1.Post("/users/updateavatar/:id"),
    routing_controllers_1.HttpCode(201),
    __param(0, routing_controllers_1.UploadedFile("file")), __param(1, routing_controllers_1.Param("id")), __param(2, routing_controllers_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateAvatar", null);
UserController = __decorate([
    typedi_1.Service(),
    routing_controllers_1.JsonController(),
    __param(0, typeorm_typedi_extensions_1.OrmCustomRepository(UserRepository_1.UserRepository)),
    __metadata("design:paramtypes", [UserRepository_1.UserRepository,
        SmsServerHelper_1.SmsServerHelper,
        FileHelper_1.FileHelper])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map