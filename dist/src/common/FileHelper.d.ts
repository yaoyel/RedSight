/// <reference types="node" />
import { Writable } from "stream";
export interface IBlobSaveOptions {
    streamLength?: number;
    contentType: string;
    compress?: boolean;
    metadata?: any;
}
export declare class FileHelper {
    private readonly m_config;
    private readonly m_blobServer;
    private readonly m_blobStorageContainerName;
    constructor(m_config: any);
    uploadFile(blobName: string, object: any, options?: IBlobSaveOptions): Promise<void>;
    readBolb(blobName: string, writableStrem: Writable): Promise<any>;
    delete(blobName: string): Promise<boolean>;
}
