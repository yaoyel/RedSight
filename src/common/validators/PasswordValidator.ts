import {ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint({name: "password", async: false})
export class PasswordValidator implements ValidatorConstraintInterface {
    defaultMessage(args: ValidationArguments): string {
        return "密码必须包含字母或数字";
    }

    validate(text: string, args: ValidationArguments): Promise<boolean> | boolean {
        const regString = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
        return regString.test(text);
    }
}

