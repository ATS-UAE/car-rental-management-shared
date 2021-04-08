import { AuthFormValidatorLoginValues } from "../../validators/forms";

export abstract class AuthFormUtils {
	public static createFormValues = (
		overrides?: Partial<AuthFormValidatorLoginValues>
	): AuthFormValidatorLoginValues => {
		return {
			username: "test",
			password: "12345678",
			remember: false,
			...overrides
		};
	};
}
