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
const stream_1 = require("stream");
const azure = require("azure-storage");
const RESERVED_METADATA_KEYS = ["type", "compressed"];
let FileHelper = class FileHelper {
    constructor(m_config) {
        this.m_config = m_config;
        this.m_blobServer = azure.createBlobService(m_config.get("azure.storageConnectString"));
        this.m_blobStorageContainerName = m_config.get("azure.blobStorageContainerName");
    }
    uploadFile(blobName, object, options) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(object);
            let blobOptions = {
                metadata: {}
            };
            if (options && options.metadata) {
                for (let key in options.metadata) {
                    if (RESERVED_METADATA_KEYS.indexOf(key) !== -1) {
                        continue;
                    }
                    blobOptions.metadata[key] = options.metadata[key];
                }
            }
            let readableStream, readableStreamLength = 0;
            if (object instanceof stream_1.Stream) {
                readableStream = object;
                if (options && options.streamLength) {
                    readableStreamLength = options.streamLength;
                }
            }
            if (object instanceof Buffer) {
                readableStream = new stream_1.Readable();
                readableStream._read = () => {
                    readableStream.push(object);
                    readableStream.push(null);
                };
                readableStreamLength = object.length;
            }
            blobOptions["contentType"] = options.contentType;
            if (options && options.compress) {
                // todo
            }
            this.m_blobServer.createContainerIfNotExists(this.m_blobStorageContainerName, { publicAccessLevel: "blob" }, () => {
            });
            this.m_blobServer.createBlockBlobFromStream(this.m_blobStorageContainerName, blobName, readableStream, readableStreamLength, blobOptions, () => {
            });
        });
    }
    readBolb(blobName, writableStrem) {
        return __awaiter(this, void 0, void 0, function* () {
            const blobStream = this.m_blobServer.getBlobToStream(this.m_blobStorageContainerName, blobName, writableStrem);
            blobStream.pipe(writableStrem);
        });
    }
    delete(blobName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.m_blobServer.deleteBlobIfExists(this.m_blobStorageContainerName, blobName, (err, result) => {
                    if (err)
                        return reject(err);
                    resolve(result);
                });
            });
        });
    }
};
FileHelper = __decorate([
    typedi_1.Service(),
    __param(0, typedi_1.Inject("config")),
    __metadata("design:paramtypes", [Object])
], FileHelper);
exports.FileHelper = FileHelper;
//# sourceMappingURL=FileHelper.js.map