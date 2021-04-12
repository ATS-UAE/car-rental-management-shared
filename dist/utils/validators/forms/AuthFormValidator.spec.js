"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuthFormValidator_1 = require("./AuthFormValidator");
var AuthFormUtils_1 = require("../../test-utils/forms/AuthFormUtils");
describe("AuthFormValidator", function () {
    describe("Login validation", function () {
        it("Does not give any errors on a valid form.", function () {
            var formValues = AuthFormUtils_1.AuthFormUtils.createFormValues();
            var errors = AuthFormValidator_1.AuthFormValidator.validateLogin(formValues);
            expect(Object.values(errors)).toHaveLength(0);
        });
        it("gives an errors on missing required fields.", function () {
            var errors = AuthFormValidator_1.AuthFormValidator.validateLogin({});
            expect(errors.username).toBeDefined();
            expect(errors.password).toBeDefined();
            expect(errors.remember).toBeDefined();
        });
        it("Needs the username to have a minimum of 4 characters.", function () {
            var formValues = AuthFormUtils_1.AuthFormUtils.createFormValues({ username: "abc" });
            var errors = AuthFormValidator_1.AuthFormValidator.validateLogin(formValues);
            expect(errors.username).toBeDefined();
        });
        it("Needs the password to have a minimum of 8 characters.", function () {
            var formValues = AuthFormUtils_1.AuthFormUtils.createFormValues({ password: "test123" });
            var errors = AuthFormValidator_1.AuthFormValidator.validateLogin(formValues);
            expect(errors.password).toBeDefined();
        });
    });
});
