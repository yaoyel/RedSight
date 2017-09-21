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
const typedi_1 = require("typedi");
const HttpHelper_1 = require("./HttpHelper");
const url = require("url");
const util = require("util");
let SmsServerHelper = class SmsServerHelper {
    constructor(m_httpHelper, m_config) {
        this.m_httpHelper = m_httpHelper;
        this.m_config = m_config;
        this.m_baseUrl = m_config.get("Lc.urls.base");
        this.m_requestSmsCodeUrl = this.m_config.get("Lc.urls.requestSmsCode");
        this.m_veritySmsCodeUrl = this.m_config.get("Lc.urls.veritySmsCode");
        this.m_appId = this.m_config.get("Lc.appId");
        this.m_appKey = this.m_config.get("Lc.appKey");
    }
    RequestSmsCode(phoneNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqSmsCodeUrl = url.resolve(this.m_baseUrl, this.m_requestSmsCodeUrl);
            return this.m_httpHelper.postJson(reqSmsCodeUrl, { mobilePhoneNumber: phoneNumber }, {
                "X-LC-Id": this.m_appId,
                "X-LC-Key": this.m_appKey
            }).then(() => {
                return true;
            })
                .catch(() => {
                return false;
            });
        });
    }
    VeritySmsCode(phoneNumber, smsCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const veritySmsCodeUrl = url.resolve(this.m_baseUrl, util.format(this.m_veritySmsCodeUrl, smsCode, phoneNumber));
            let response = yield this.m_httpHelper.postJson(veritySmsCodeUrl, null, {
                "X-LC-Id": this.m_appId,
                "X-LC-Key": this.m_appKey
            });
            if (response.status === 200)
                return true;
            return false;
        });
    }
};
SmsServerHelper = __decorate([
    typedi_1.Service(),
    __param(1, typedi_1.Inject("config")),
    __metadata("design:paramtypes", [HttpHelper_1.HttpHelper, Object])
], SmsServerHelper);
exports.SmsServerHelper = SmsServerHelper;
//# sourceMappingURL=SmsServerHelper.js.map