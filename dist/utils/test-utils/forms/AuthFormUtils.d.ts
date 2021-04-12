import { AuthFormValidatorLoginValues } from "../../validators/forms";
export declare abstract class AuthFormUtils {
    static createFormValues: (overrides?: Partial<AuthFormValidatorLoginValues> | undefined) => AuthFormValidatorLoginValues;
}
