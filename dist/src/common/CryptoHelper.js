"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
class CryptoHelper {
    static genRandomString(length) {
        return crypto_1.randomBytes(Math.ceil(length / 2))
            .toString("hex")
            .slice(0, length);
    }
    static genBase64String(plainText) {
        return new Buffer(plainText).toString("base64");
    }
    static genHashsString(plainText, salt) {
        let hash = crypto_1.createHmac("sha512", salt);
        hash.update(plainText);
        let value = hash.digest("hex");
        return value;
    }
}
exports.CryptoHelper = CryptoHelper;
//# sourceMappingURL=CryptoHelper.js.map