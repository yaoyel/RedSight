/// <reference types="node" />
export declare function loadSecretFile(isPrivate?: boolean): Promise<Buffer>;
export declare function signJwt(data: object, expiresIn?: string, algorithm?: string): Promise<string>;
export declare function verifyJwt(token: string): Promise<any>;
