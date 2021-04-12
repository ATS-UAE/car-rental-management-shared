"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFormValidator = void 0;
var yup = __importStar(require("yup"));
var FormUtils_1 = require("../../FormUtils");
var AuthFormValidator = /** @class */ (function () {
    function AuthFormValidator() {
    }
    AuthFormValidator.loginFormValidation = yup.object({
        username: yup.string().min(4).required(),
        password: yup.string().min(8).required(),
        remember: yup.bool().required()
    });
    AuthFormValidator.validateLogin = function (values) {
        try {
            AuthFormValidator.loginFormValidation.validateSync(values, {
                abortEarly: false
            });
        }
        catch (e) {
            return FormUtils_1.FormUtils.getFieldErrorsFromYupValidationError(e);
        }
        return {};
    };
    return AuthFormValidator;
}());
exports.AuthFormValidator = AuthFormValidator;
