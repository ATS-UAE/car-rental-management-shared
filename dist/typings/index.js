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
exports.Resource = exports.Operation = void 0;
__exportStar(require("./utils"), exports);
__exportStar(require("./enums"), exports);
__exportStar(require("./models"), exports);
__exportStar(require("./api"), exports);
// TODO remove RBAC
var Operation;
(function (Operation) {
    Operation["READ"] = "READ";
    Operation["UPDATE"] = "UPDATE";
    Operation["DELETE"] = "DELETE";
    Operation["CREATE"] = "CREATE";
})(Operation = exports.Operation || (exports.Operation = {}));
var Resource;
(function (Resource) {
    Resource["BOOKINGS"] = "BOOKINGS";
    Resource["LOCATIONS"] = "LOCATIONS";
    Resource["VEHICLES"] = "VEHICLES";
    Resource["USERS"] = "USERS";
    Resource["ENUMS"] = "ENUMS";
    Resource["INVITES"] = "INVITES";
    Resource["ACCIDENTS"] = "ACCIDENTS";
    Resource["CLIENTS"] = "CLIENTS";
    Resource["CATEGORIES"] = "CATEGORIES";
})(Resource = exports.Resource || (exports.Resource = {}));
