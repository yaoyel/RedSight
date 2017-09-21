import "reflect-metadata";
import {Service} from "typedi";
import fetch from  "node-fetch";

@Service()
export class HttpHelper {
    async postJson(url: string, data?: Object, extensionHeaders?: Object): Promise<any> {

        let headers = {
            "Content-Type": "application/json"
        };

        if (extensionHeaders)
            Object.assign(headers, extensionHeaders);

        return fetch(url, {
            method: "POST",
            headers: headers,
            body: !!data ? JSON.stringify(data) : null
        });

    }
}