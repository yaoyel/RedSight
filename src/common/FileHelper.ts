import {Inject, Service} from "typedi";
import {Stream, Writable, Readable} from "stream";
const azure = require("azure-storage");

export interface IBlobSaveOptions {
    streamLength?: number;
    contentType: string;
    compress?: boolean;
    metadata?: any;
}

const RESERVED_METADATA_KEYS = ["type", "compressed"];

@Service()
export class FileHelper {

    private readonly m_blobServer: any;
    private readonly m_blobStorageContainerName: string;

    constructor(@Inject("config") private readonly m_config: any) {
        this.m_blobServer = azure.createBlobService(m_config.get("azure.storageConnectString"));
        this.m_blobStorageContainerName = m_config.get("azure.blobStorageContainerName");
    }

    async uploadFile(blobName: string, object: any, options?: IBlobSaveOptions) {
        console.log(object);
        let blobOptions: any = {
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

        let readableStream: any, readableStreamLength: number = 0;

        if (object instanceof Stream) {
            readableStream = object;

            if (options && options.streamLength) {
                readableStreamLength = options.streamLength;
            }

        }
        if (object instanceof Buffer) {
            readableStream = new Readable();
            readableStream._read = () => {
                readableStream.push(object);
                readableStream.push(null);
            }

            readableStreamLength = (<Buffer>object).length;
        }

        blobOptions["contentType"] = options.contentType;

        if (options && options.compress) {
            // todo
        }

        this.m_blobServer.createContainerIfNotExists(this.m_blobStorageContainerName, {publicAccessLevel: "blob"}, () => {
        });
        this.m_blobServer.createBlockBlobFromStream(this.m_blobStorageContainerName, blobName, readableStream, readableStreamLength, blobOptions, () => {
        });
    }

    async readBolb(blobName: string, writableStrem: Writable): Promise<any> {
        const blobStream = this.m_blobServer.getBlobToStream(this.m_blobStorageContainerName, blobName, writableStrem);
        blobStream.pipe(writableStrem);
    }


    async delete(blobName: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.m_blobServer.deleteBlobIfExists(this.m_blobStorageContainerName, blobName, (err: any, result: boolean) => {
                if (err)
                    return reject(err);
                resolve(result);
            });
        });
    }
}