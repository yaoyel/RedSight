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
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const UserEntity_1 = require("./entities/UserEntity");
const CreateUserModel_1 = require("./models/CreateUserModel");
const UserUtils_1 = require("./utils/UserUtils");
const RedSightError_1 = require("../common/RedSightError");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    findByPhoneNumber(phoneNumber) {
        return this.findOne({ phoneNumber });
    }
    createUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let userEntity = new UserEntity_1.UserEntity();
            userEntity.createdAt = new Date();
            userEntity.name = user.name;
            const passwordWithSalt = UserUtils_1.UserUtils.signPassword(user.password);
            userEntity.password = passwordWithSalt.password;
            userEntity.passwordFormat = passwordWithSalt.salt;
            userEntity.phoneNumber = user.phoneNumber;
            userEntity.lastLoginAt = new Date();
            yield this.persist(userEntity);
            return userEntity;
        });
    }
    updateUserAsync(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.persist(user);
        });
    }
    createUserByPhoneNumber(phoneNnumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new UserEntity_1.UserEntity();
            user.phoneNumber = phoneNnumber;
            user.createdAt = new Date();
            user.lastLoginAt = new Date();
            yield this.persist(user);
        });
    }
    resetPasswordAsync(user, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!!user)
                throw new RedSightError_1.RedSightError("用户不能为空");
            const passwordWithSalt = UserUtils_1.UserUtils.signPassword(user.password);
            user.password = passwordWithSalt.password;
            user.passwordFormat = passwordWithSalt.salt;
            yield this.persist(user);
        });
    }
};
__decorate([
    typeorm_1.TransactionEntityManager(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserModel_1.CreateUserModel]),
    __metadata("design:returntype", Promise)
], UserRepository.prototype, "createUserAsync", null);
__decorate([
    typeorm_1.TransactionEntityManager(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserEntity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], UserRepository.prototype, "updateUserAsync", null);
__decorate([
    typeorm_1.TransactionEntityManager(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserRepository.prototype, "createUserByPhoneNumber", null);
__decorate([
    typeorm_1.TransactionEntityManager(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UserEntity_1.UserEntity, String]),
    __metadata("design:returntype", Promise)
], UserRepository.prototype, "resetPasswordAsync", null);
UserRepository = __decorate([
    typedi_1.Service(),
    typeorm_1.EntityRepository(UserEntity_1.UserEntity)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map