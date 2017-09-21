import {join} from "path";
import {readFile} from "fs";
import {sign, verify} from "jsonwebtoken";
import  {promisify} from "bluebird";

export async function  loadSecretFile(isPrivate: boolean= false): Promise<Buffer> {
    const secretFilePath = join(__dirname, "..", "..", "..", "config", "ssl", isPrivate ? "private.key" : "public.pem");
    const loadFileAsync = promisify(readFile);

    return await loadFileAsync(secretFilePath);
}

export async function signJwt(data: object, expiresIn?: string, algorithm?: string): Promise<string> {
    const cert = await loadSecretFile(true);
    const token = sign(data, cert, {algorithm, expiresIn});

    return token;
}


export async function verifyJwt(token: string): Promise<any> {
    const verityJwtAsync = promisify(verify);
    const cert = await loadSecretFile();
    return verityJwtAsync(token, cert);
}
/*

export async function readStreamAsJSON(stream):Promise<string>{
    let data="";
    stream.on("data",chunk=>data+=chunk);
    stream.on("end",()=>{
        let result,error;
        result=JSON.parse(data);
    });
}*/
