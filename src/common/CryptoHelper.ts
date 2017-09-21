import {randomBytes, createHmac} from "crypto";

export class CryptoHelper {
    static genRandomString(length: number): string {
        return randomBytes(Math.ceil(length / 2))
            .toString("hex")
            .slice(0, length);
    }

    static genBase64String(plainText: string): string {
        return new Buffer(plainText).toString("base64");
    }

    static genHashsString(plainText: string, salt: string): string {
        let hash = createHmac("sha512", salt);
        hash.update(plainText);
        let value = hash.digest("hex");
        return value;
    }
}