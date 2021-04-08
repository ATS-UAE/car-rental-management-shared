import { AuthFormValidator } from "./AuthFormValidator";
import { AuthFormUtils } from "../../test-utils/forms/AuthFormUtils";

describe("AuthFormValidator", () => {
	describe("Login validation", () => {
		it("Does not give any errors on a valid form.", () => {
			const formValues = AuthFormUtils.createFormValues();
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
			const formValues = AuthFormUtils.createFormValues({ username: "abc" });
			const errors = AuthFormValidator.validateLogin(formValues);

			expect(errors.username).toBeDefined();
		});

		it("Needs the password to have a minimum of 8 characters.", () => {
			const formValues = AuthFormUtils.createFormValues({ password: "test123" });
			const errors = AuthFormValidator.validateLogin(formValues);

			expect(errors.password).toBeDefined();
		});
	});
});
