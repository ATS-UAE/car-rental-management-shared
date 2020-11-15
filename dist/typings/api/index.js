"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = void 0;
__exportStar(require("./Auth"), exports);
__exportStar(require("./Accident"), exports);
__exportStar(require("./Booking"), exports);
__exportStar(require("./Category"), exports);
__exportStar(require("./Client"), exports);
__exportStar(require("./Location"), exports);
__exportStar(require("./User"), exports);
__exportStar(require("./Vehicle"), exports);
__exportStar(require("./WialonUnit"), exports);
__exportStar(require("./Report"), exports);
__exportStar(require("./Invite"), exports);
__exportStar(require("./VehicleCategory"), exports);
__exportStar(require("./PushSubscription"), exports);
var ErrorCode;
(function (ErrorCode) {
    /**
     * You are trying to access a resource that is not intended to
     * be accessed by your role.
     */
    ErrorCode["UNAUTHORIZED_ROLE"] = "UNAUTHORIZED_ROLE";
    /**
     * You are not logged in.
     */
    ErrorCode["UNAUTHENTICATED"] = "UNAUTHENTICATED";
    /**
     * You are trying to create, or update a resource with invalid fields.
     */
    ErrorCode["INVALID_PARAMETERS"] = "INVALID_PARAMETERS";
    /**
     * You are trying to execute an unallowed action to a resource.
     */
    ErrorCode["UNALLOWED_ACTION"] = "UNALLOWED_ACTION";
    /**
     * The resource you are trying to access for is not found.
     */
    ErrorCode["RESOURCE_NOT_FOUND"] = "RESOURCE_NOT_FOUND";
    /**
     * ¯\\\_(ツ)\_/¯
     */
    ErrorCode["UNKNOWN"] = "UNKNOWN";
    /**
     * No errors!
     */
    ErrorCode["SUCCESS"] = "SUCCESS";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
