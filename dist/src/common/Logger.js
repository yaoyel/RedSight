"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const fs = require("fs");
const path = require("path");
const winston = require("winston");
require("winston-daily-rotate-file");
let Logger = class Logger {
    constructor(m_config) {
        this.m_config = m_config;
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
        this.m_logger = new winston.Logger({ transports });
    }
    info(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.m_logger.info(...args);
        });
    }
    error(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            this.m_logger.error(...args);
        });
    }
};
Logger = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject("config")),
    __metadata("design:paramtypes", [Object])
], Logger);
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map