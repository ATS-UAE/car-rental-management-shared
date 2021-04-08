import {
	AuthFormValidator,
	AuthFormValidatorLoginValues
} from "./AuthFormValidator";

const createFormValues = (
	overrides?: Partial<AuthFormValidatorLoginValues>
): AuthFormValidatorLoginValues => {
	return {
		username: "test",
		password: "12345678",
		remember: false,
		...overrides
	};
};

describe("AuthFormValidator", () => {
	describe("Login validation", () => {
		it("Does not give any errors on a valid form.", () => {
			const formValues = createFormValues();
			const errors = AuthFormValidator.validateLogin(formValues);

			expect(Object.values(errors)).toHaveLength(0);
		});

		it("gives an errors on missing required fields.", () => {
			const errors = AuthFormValidator.validateLogin({});

			expect(errors.username).toBeDefined();
			expect(errors.password).toBeDefined();
			expect(errors.remember).toBeDefined();
		});

		it("Needs the username to have a minimum of 4 characters.", () => {
			const formValues = createFormValues({ username: "abc" });
			const errors = AuthFormValidator.validateLogin(formValues);

			expect(errors.username).toBeDefined();
		});

		it("Needs the password to have a minimum of 8 characters.", () => {
			const formValues = createFormValues({ password: "test123" });
			const errors = AuthFormValidator.validateLogin(formValues);

			expect(errors.password).toBeDefined();
		});
	});
});
