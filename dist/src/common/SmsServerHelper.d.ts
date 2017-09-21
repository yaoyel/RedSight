import "reflect-metadata";
import { HttpHelper } from "./HttpHelper";
export declare class SmsServerHelper {
    private readonly m_httpHelper;
    private readonly m_config;
    private readonly m_baseUrl;
    private readonly m_requestSmsCodeUrl;
    private readonly m_veritySmsCodeUrl;
    private readonly m_appId;
    private readonly m_appKey;
    constructor(m_httpHelper: HttpHelper, m_config: any);
    RequestSmsCode(phoneNumber: string): Promise<boolean>;
    VeritySmsCode(phoneNumber: string, smsCode: string): Promise<boolean>;
}
