import { ValidationArguments, ValidatorConstraintInterface } from "class-validator";
export declare class PasswordValidator implements ValidatorConstraintInterface {
    defaultMessage(args: ValidationArguments): string;
    validate(text: string, args: ValidationArguments): Promise<boolean> | boolean;
}
