"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const node_fetch_1 = require("node-fetch");
let HttpHelper = class HttpHelper {
    postJson(url, data, extensionHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            let headers = {
                "Content-Type": "application/json"
            };
            if (extensionHeaders)
                Object.assign(headers, extensionHeaders);
            return node_fetch_1.default(url, {
                method: "POST",
                headers: headers,
                body: !!data ? JSON.stringify(data) : null
            });
        });
    }
};
HttpHelper = __decorate([
    typedi_1.Service()
], HttpHelper);
exports.HttpHelper = HttpHelper;
//# sourceMappingURL=HttpHelper.js.map