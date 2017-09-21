"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoHelper_1 = require("../../common/CryptoHelper");
class UserUtils {
    static signPassword(plainText, salt) {
        if (!salt)
            salt = CryptoHelper_1.CryptoHelper.genRandomString(16);
        return { password: CryptoHelper_1.CryptoHelper.genBase64String(CryptoHelper_1.CryptoHelper.genHashsString(plainText, salt)), salt };
    }
    static verifyPassword(plainText, password, passwordFormat) {
        return this.signPassword(plainText, passwordFormat).password === password;
    }
}
exports.UserUtils = UserUtils;
//# sourceMappingURL=UserUtils.js.map