import "reflect-metadata";
import {Get, Post, Body, JsonController, Param, HttpCode, UploadedFile, BadRequestError, Res} from "routing-controllers";
import {Service} from "typedi";
import {OrmCustomRepository} from "typeorm-typedi-extensions";
import {UserRepository} from "../../data/UserRepository";
import {UserEntity} from "../../data/entities/UserEntity";
import {CreateUserModel} from "../../data/models/CreateUserModel";
import {SmsServerHelper} from "../../common/SmsServerHelper";
import {Checker} from "../../common/Checkers";
import * as sharp from "sharp";
import {FileHelper} from "../../common/FileHelper";
import {UserModel} from "../models/UserModel";
import {RedSightError} from "../../common/RedSightError";

@Service()
@JsonController()
export class UserController {
    constructor(@OrmCustomRepository(UserRepository)
                private readonly m_userRepository: UserRepository,
                private readonly m_smsServer: SmsServerHelper,
                private readonly m_fileHelper: FileHelper) {
    }

    @Get("/users/findbyphonenumber/:phonenumber")
    public async findByPhoneNumber(@Param("phonenumber") phoneNumber: string): Promise<UserModel> {
        const user = await this.m_userRepository.findByPhoneNumber(phoneNumber);

        let result = new UserModel().assignFrom(user);
        return result;
    }

    @HttpCode(201)
    @Post("/users")
    public async createUserAsync(@Body() user: CreateUserModel): Promise<UserModel> {
        const checker = new Checker<UserEntity, UserRepository>();
        await checker.existCheck({phoneNumber: user.phoneNumber}, this.m_userRepository, `已经存在手机号码为${user.phoneNumber}的用户`);
        const userEntity = await this.m_userRepository.createUserAsync(user);
        let result = new UserModel().assignFrom(userEntity);
        return result;
    }

    @Post("/users/resetpasswrod/:phonenumber/:newpassword")
    public async resetPassword(@Param("phonenumber")phoneNumber: string, @Param("newpassword")newPassword: string) {
        const checker = new Checker<UserEntity, UserRepository>();
        const user = await checker.notExistCheck({phoneNumber}, this.m_userRepository, `不存在手机号为${phoneNumber}的用户。`, true);

        await this.m_userRepository.resetPasswordAsync((<UserEntity>user), newPassword);

    }

    @Post("/users/changeName")
    public async changeName(@Body() args: { userId: string, name: string }) {
        const checker = new Checker<UserEntity, UserRepository>();
        const result = await checker.notExistCheck({Id: args.userId}, this.m_userRepository, `用户不存在`, true);
        const user = (<UserEntity>result);
        user.name = name;
        await this.m_userRepository.updateUserAsync(user);
    }

    @Post("/users/requestsmscode/:phonenumber")
    public async requestSmsCode(@Param("phonenumber")phoneNumber: string): Promise<boolean> {
        return this.m_smsServer.RequestSmsCode(phoneNumber);
    }

    @Post("/users/veritysmscode/:phonenumber/:smscode")
    public async veritySmsCode(@Param("phonenumber") phoneNumber: string, @Param("smscode") smsCode: string): Promise<boolean> {
        return this.m_smsServer.VeritySmsCode(phoneNumber, smsCode);
    }


    @Post("/users/checkbyphonenumber/:phoneNumber")
    public async checkByPhoneNumber(@Param("phoneNumber") phoneNumber: string) {
        const checker = new Checker<UserEntity, UserRepository>();
        return await checker.notExistCheck({phoneNumber}, this.m_userRepository, `不存在手机号为${phoneNumber}的用户。`, true);
        // return checker.Check({phoneNumber}, this.m_userRepository);
    }

    @Post("/users/checkbyname/:name")
    public async checkByPhoneName(@Param("name") name: string) {
        const checker = new Checker<UserEntity, UserRepository>();
        return checker.notExistCheck({name}, this.m_userRepository, `不存在姓名为${name}的用户。`, false);
    }

    @Post("/users/updateavatar/:id")
    @HttpCode(201)
    public async updateAvatar(@UploadedFile("file")file: any, @Param("id")id: string, @Res() res: any): Promise<boolean | BadRequestError> {
        if (!file)
            return new BadRequestError("请传入正确的文件")
        const contentType = {contentType: "image/png"};

        await this.m_fileHelper.uploadFile(`avatar/${id}.jpg`, file.buffer, contentType);
        await this.m_fileHelper.uploadFile(`avatar/100*100/${id}.jpg`, await sharp(file.buffer).resize(100).toBuffer(), contentType);
        await this.m_fileHelper.uploadFile(`avatar/30*30/${id}.jpg`, await sharp(file.buffer).resize(30).toBuffer(), contentType);

        return true;
    }
}