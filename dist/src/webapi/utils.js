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
const path_1 = require("path");
const fs_1 = require("fs");
const jsonwebtoken_1 = require("jsonwebtoken");
const bluebird_1 = require("bluebird");
function loadSecretFile(isPrivate = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const secretFilePath = path_1.join(__dirname, "..", "..", "..", "config", "ssl", isPrivate ? "private.key" : "public.pem");
        const loadFileAsync = bluebird_1.promisify(fs_1.readFile);
        return yield loadFileAsync(secretFilePath);
    });
}
exports.loadSecretFile = loadSecretFile;
function signJwt(data, expiresIn, algorithm) {
    return __awaiter(this, void 0, void 0, function* () {
        const cert = yield loadSecretFile(true);
        const token = jsonwebtoken_1.sign(data, cert, { algorithm, expiresIn });
        return token;
    });
}
exports.signJwt = signJwt;
function verifyJwt(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const verityJwtAsync = bluebird_1.promisify(jsonwebtoken_1.verify);
        const cert = yield loadSecretFile();
        return verityJwtAsync(token, cert);
    });
}
exports.verifyJwt = verifyJwt;
/*

export async function readStreamAsJSON(stream):Promise<string>{
    let data="";
    stream.on("data",chunk=>data+=chunk);
    stream.on("end",()=>{
        let result,error;
        result=JSON.parse(data);
    });
}*/
//# sourceMappingURL=utils.js.map