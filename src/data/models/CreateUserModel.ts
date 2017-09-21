import {MinLength, MaxLength, Validate} from "class-validator";
import {PasswordValidator, UserNameValidator} from "../../common/validators";

export class CreateUserModel {
    @MaxLength(20, {message: "姓名不能大于20个字符"})
    @Validate(UserNameValidator)
    name: string;

    phoneNumber: string;

    @MinLength(6, {message: "密码不能小于6个字符"})
    @MaxLength(16, {message: "密码不能大于16个字符"})
    @Validate(PasswordValidator)
    password: string;
}