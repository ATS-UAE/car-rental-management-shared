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
exports.StatusCode = void 0;
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
var StatusCode;
(function (StatusCode) {
    /**
     * You are trying to access a resource that is not intended to
     * be accessed by your role.
     */
    StatusCode["UNAUTHORIZED_ROLE"] = "UNAUTHORIZED_ROLE";
    /**
     * You are not logged in.
     */
    StatusCode["UNAUTHENTICATED"] = "UNAUTHENTICATED";
    /**
     * You are trying to create, or update a resource with invalid fields.
     */
    StatusCode["INVALID_PARAMETERS"] = "INVALID_PARAMETERS";
    /**
     * You are trying to execute an unallowed action to a resource.
     */
    StatusCode["UNALLOWED_ACTION"] = "UNALLOWED_ACTION";
    /**
     * The resource you are trying to access for is not found.
     */
    StatusCode["RESOURCE_NOT_FOUND"] = "RESOURCE_NOT_FOUND";
    /**
     * ¯\\\_(ツ)\_/¯
     */
    StatusCode["UNKNOWN"] = "UNKNOWN";
    /**
     * No errors!
     */
    StatusCode["SUCCESS"] = "SUCCESS";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
