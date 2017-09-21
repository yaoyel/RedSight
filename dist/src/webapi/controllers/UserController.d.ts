import "reflect-metadata";
import { BadRequestError } from "routing-controllers";
import { UserRepository } from "../../data/UserRepository";
import { UserEntity } from "../../data/entities/UserEntity";
import { CreateUserModel } from "../../data/models/CreateUserModel";
import { SmsServerHelper } from "../../common/SmsServerHelper";
import { FileHelper } from "../../common/FileHelper";
import { UserModel } from "../models/UserModel";
import { RedSightError } from "../../common/RedSightError";
export declare class UserController {
    private readonly m_userRepository;
    private readonly m_smsServer;
    private readonly m_fileHelper;
    constructor(m_userRepository: UserRepository, m_smsServer: SmsServerHelper, m_fileHelper: FileHelper);
    findByPhoneNumber(phoneNumber: string): Promise<UserModel>;
    createUserAsync(user: CreateUserModel): Promise<UserModel>;
    resetPassword(phoneNumber: string, newPassword: string): Promise<void>;
    changeName(args: {
        userId: string;
        name: string;
    }): Promise<void>;
    requestSmsCode(phoneNumber: string): Promise<boolean>;
    veritySmsCode(phoneNumber: string, smsCode: string): Promise<boolean>;
    checkByPhoneNumber(phoneNumber: string): Promise<boolean | UserEntity | RedSightError>;
    checkByPhoneName(name: string): Promise<boolean | UserEntity | RedSightError>;
    updateAvatar(file: any, id: string, res: any): Promise<boolean | BadRequestError>;
}
