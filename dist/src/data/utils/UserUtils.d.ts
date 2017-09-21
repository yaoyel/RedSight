export declare class UserUtils {
    static signPassword(plainText: string, salt?: string): {
        password: string;
        salt: string;
    };
    static verifyPassword(plainText: string, password: string, passwordFormat: string): boolean;
}
