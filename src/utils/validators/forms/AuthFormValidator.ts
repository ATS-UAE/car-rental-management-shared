import { FieldErrors } from "react-form";
import * as yup from "yup";
import { FormUtils } from "../../FormUtils";

export interface AuthFormValidatorLoginValues {
	username: string;
	password: string;
	remember: boolean;
}

export abstract class AuthFormValidator {
	private static loginFormValidation = yup.object({
		username: yup.string().min(4).required(),
		password: yup.string().min(8).required(),
		remember: yup.bool().required()
	});

	public static validateLogin = (
		values: Partial<AuthFormValidatorLoginValues>
	): FieldErrors<AuthFormValidatorLoginValues> => {
		try {
			AuthFormValidator.loginFormValidation.validateSync(values, {
				abortEarly: false
			});
		} catch (e) {
			return FormUtils.getFieldErrorsFromYupValidationError(e);
		}
		return {};
	};
}
