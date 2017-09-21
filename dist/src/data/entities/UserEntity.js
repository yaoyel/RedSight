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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const EntityBase_1 = require("../../common/EntityBase");
const uuid = require("uuid");
let UserEntity = class UserEntity extends EntityBase_1.EntityBase {
    constructor() {
        super(...arguments);
        this.id = uuid();
    }
};
__decorate([
    typeorm_1.PrimaryColumn({ name: "id", length: "36" }),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: "name", length: "50", nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: "phone_number", length: "11" }),
    __metadata("design:type", String)
], UserEntity.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column({ name: "password", length: "255", nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ name: "password_format", length: "32", nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "passwordFormat", void 0);
__decorate([
    typeorm_1.Column({ name: "created_at", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column({ name: "last_updated_at", type: "datetime", nullable: true }),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastUpdatedAt", void 0);
__decorate([
    typeorm_1.Column({ name: "last_login_at", type: "datetime", nullable: false }),
    __metadata("design:type", Date)
], UserEntity.prototype, "lastLoginAt", void 0);
__decorate([
    typeorm_1.Column({ name: "avatar", length: "512", nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column({ name: "qq", length: "32", nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "qq", void 0);
__decorate([
    typeorm_1.Column({ name: "we_chat", length: "64", nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "weChat", void 0);
__decorate([
    typeorm_1.Column({ name: "description", length: "255", nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "description", void 0);
UserEntity = __decorate([
    typeorm_1.Entity("user")
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=UserEntity.js.map