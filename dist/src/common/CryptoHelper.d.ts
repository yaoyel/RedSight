export declare class CryptoHelper {
    static genRandomString(length: number): string;
    static genBase64String(plainText: string): string;
    static genHashsString(plainText: string, salt: string): string;
}
