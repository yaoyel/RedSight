import "reflect-metadata";
import {Service, Inject} from "typedi";
import {HttpHelper} from "./HttpHelper";
import * as url from "url";
import * as util from  "util";

@Service()
export class SmsServerHelper {
    private readonly m_baseUrl: string;
    private readonly m_requestSmsCodeUrl: string;
    private readonly m_veritySmsCodeUrl: string;
    private readonly m_appId: string;
    private readonly m_appKey: string

    constructor(private readonly m_httpHelper: HttpHelper, @Inject("config") private readonly m_config: any) {
        this.m_baseUrl = m_config.get("Lc.urls.base");
        this.m_requestSmsCodeUrl = this.m_config.get("Lc.urls.requestSmsCode");
        this.m_veritySmsCodeUrl = this.m_config.get("Lc.urls.veritySmsCode");
        this.m_appId = this.m_config.get("Lc.appId");
        this.m_appKey = this.m_config.get("Lc.appKey");
    }


    public async RequestSmsCode(phoneNumber: string): Promise<boolean> {
        const reqSmsCodeUrl = url.resolve(this.m_baseUrl, this.m_requestSmsCodeUrl);
        return this.m_httpHelper.postJson(reqSmsCodeUrl, {mobilePhoneNumber: phoneNumber}, {
            "X-LC-Id": this.m_appId,
            "X-LC-Key": this.m_appKey
        }).then(() => {
            return true;
        })
            .catch(() => {
                return false;
            });
    }

    public async VeritySmsCode(phoneNumber: string, smsCode: string): Promise<boolean> {
        const veritySmsCodeUrl = url.resolve(this.m_baseUrl, util.format(this.m_veritySmsCodeUrl, smsCode, phoneNumber));

        let response = await this.m_httpHelper.postJson(veritySmsCodeUrl, null, {
            "X-LC-Id": this.m_appId,
            "X-LC-Key": this.m_appKey
        });

        if (response.status === 200)
            return true;
        return false;

    }
}
