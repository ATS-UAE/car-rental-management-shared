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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFormUtils = void 0;
var AuthFormUtils = /** @class */ (function () {
    function AuthFormUtils() {
    }
    AuthFormUtils.createFormValues = function (overrides) { return (__assign({ username: "test", password: "12345678", remember: false }, overrides)); };
    return AuthFormUtils;
}());
exports.AuthFormUtils = AuthFormUtils;
