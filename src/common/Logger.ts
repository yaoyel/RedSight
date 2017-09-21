import {Service, Inject} from "typedi";
import * as fs from "fs";
import * as path from "path";
import * as winston from "winston";
import"winston-daily-rotate-file";

@Service()
export class Logger {
    private m_logger: any;

    constructor(@Inject("config") private readonly m_config: any) {
        const filePath = path.join(__dirname, "..", "..", "logs");
        if (!fs.existsSync(filePath))
            fs.mkdirSync(filePath);

        const transports = [
            new winston.transports.DailyRotateFile({
                name: "error",
                filename: path.join(filePath, "_error.log"),
                handleExceptions: true,
                humanReadableUnhandledException: true,
                level: "error",
                datePattern: "yyyy-MM-dd",
                maxsize: 1024 * 1024 * 10,
                prepend: true
            }),
            new winston.transports.DailyRotateFile({
                name: "info",
                filename: path.join(filePath, "_info.log"),
                level: m_config.get("Logger.level"),
                datePattern: "yyyy-MM-dd",
                maxsize: 1024 * 1024 * 10,
                maxFiles: 7,
                prepend: true
            })
        ];

        this.m_logger = new winston.Logger({transports});
    }

    public async info(...args: any[]) {
        this.m_logger.info(...args);
    }

    public async error(...args: any[]) {
        this.m_logger.error(...args);
    }

}