import "winston-daily-rotate-file";
export declare class Logger {
    private readonly m_config;
    private m_logger;
    constructor(m_config: any);
    info(...args: any[]): Promise<void>;
    error(...args: any[]): Promise<void>;
}
