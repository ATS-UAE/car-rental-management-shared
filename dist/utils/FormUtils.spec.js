"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yup_1 = require("yup");
var typings_1 = require("../typings");
var FormUtils_1 = require("./FormUtils");
describe("FormUtils", function () {
    it("Extracts errors from a yup validation error.", function () {
        var yupError = new yup_1.ValidationError("error message", "error message", "test", "error message");
        var errors = FormUtils_1.FormUtils.getFieldErrorsFromYupValidationError(yupError);
        expect(errors).toEqual({ test: "error message" });
    });
    it("Extracts errors from an api error.", function () {
        var apiErrors = FormUtils_1.FormUtils.getErrorsFromApiError({
            response: {
                data: {
                    errors: ["TEST", { key: "test", value: "ERROR" }],
                    code: typings_1.StatusCode.INVALID_PARAMETERS,
                    message: "Invalid parameters!",
                    success: false
                }
            }
        });
        expect(apiErrors.form).toHaveLength(1);
        expect(apiErrors.form[0]).toEqual("TEST");
        expect(apiErrors.field.test).toEqual("ERROR");
    });
});
