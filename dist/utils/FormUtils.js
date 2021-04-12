"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormUtils = void 0;
var yup_1 = require("yup");
var lodash_1 = __importDefault(require("lodash"));
var FormUtils = /** @class */ (function () {
    function FormUtils() {
    }
    FormUtils.getFieldErrorsFromYupValidationError = function (errors, existingError) {
        if (existingError === void 0) { existingError = {}; }
        if (errors instanceof yup_1.ValidationError) {
            var newErrors_1 = __assign({}, existingError);
            if (errors.path) {
                lodash_1.default.set(newErrors_1, errors.path, errors.message);
            }
            errors.inner.forEach(function (error) {
                if (error.path) {
                    lodash_1.default.set(newErrors_1, error.path, error.message);
                }
                newErrors_1 = FormUtils.getFieldErrorsFromYupValidationError(error, newErrors_1);
            });
            return newErrors_1;
        }
        return {};
    };
    FormUtils.getErrorsFromApiError = function (e) {
        var _a;
        var fieldErrors = {};
        var formErrors = [];
        if ("response" in e) {
            /**
             * If the response has an error message from errors array, use those errors,
             * if there are no errors in the errors array, use the message instead.
             * If there is no response, use the error message from the error object itself.
             */
            if ((_a = e.response) === null || _a === void 0 ? void 0 : _a.data) {
                e.response.data.errors.forEach(function (e) {
                    if (typeof e === "string") {
                        formErrors.push(e);
                    }
                    else {
                        fieldErrors[e.key] = e.value;
                    }
                });
                if (formErrors.length === 0) {
                    formErrors.push(e.response.data.message);
                }
            }
            else if (formErrors.length === 0) {
                formErrors.push(e.message);
            }
        }
        return {
            field: fieldErrors,
            form: formErrors
        };
    };
    FormUtils.replaceInvalidNumber = function (check, returnInvalid) {
        if (typeof check === "number") {
            return check;
        }
        return returnInvalid;
    };
    return FormUtils;
}());
exports.FormUtils = FormUtils;
