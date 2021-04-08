import { FieldErrors } from "react-form";
export interface AuthFormValidatorLoginValues {
    username: string;
    password: string;
    remember: boolean;
}
export declare abstract class AuthFormValidator {
    private static loginFormValidation;
    static validateLogin: (values: Partial<AuthFormValidatorLoginValues>) => FieldErrors<AuthFormValidatorLoginValues>;
}
