import {ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";

@ValidatorConstraint({name: "userName" , async: false})
export class UserNameValidator implements ValidatorConstraintInterface {
    defaultMessage(args: ValidationArguments): string {
        return "姓名只能包含中文或英文字母";
    }

    validate(text: string, args: ValidationArguments): Promise<boolean> | boolean {

        return text.length > 1 && ( /[\u4E00-\u9FA5]/).test(text);

    }
}