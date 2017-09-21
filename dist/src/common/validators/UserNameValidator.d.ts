import { ValidatorConstraintInterface, ValidationArguments } from "class-validator";
export declare class UserNameValidator implements ValidatorConstraintInterface {
    defaultMessage(args: ValidationArguments): string;
    validate(text: string, args: ValidationArguments): Promise<boolean> | boolean;
}
