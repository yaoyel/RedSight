/// <reference types="supertest" />
import * as supertest from "supertest";
export declare type TSupertestCallback = (request: supertest.SuperTest<supertest.Test>) => void;
export declare function testRequest(callback: TSupertestCallback): Promise<void>;
