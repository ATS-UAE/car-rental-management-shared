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
exports.API_OPERATION = void 0;
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
var API_OPERATION;
(function (API_OPERATION) {
    API_OPERATION["CREATE"] = "CREATE";
    API_OPERATION["DELETE"] = "DELETE";
    API_OPERATION["UPDATE"] = "UPDATE";
    API_OPERATION["READ"] = "READ";
})(API_OPERATION = exports.API_OPERATION || (exports.API_OPERATION = {}));
