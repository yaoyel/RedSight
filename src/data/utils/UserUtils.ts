import {CryptoHelper} from "../../common/CryptoHelper";

export class UserUtils {
    static signPassword(plainText: string, salt?: string): { password: string, salt: string } {
        if (!salt) salt = CryptoHelper.genRandomString(16);
        return {password: CryptoHelper.genBase64String(CryptoHelper.genHashsString(plainText, salt)), salt};
    }

    static verifyPassword(plainText: string, password: string, passwordFormat: string): boolean {
        return this.signPassword(plainText, passwordFormat).password === password;
    }
}