"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidPermissionException extends Error {
    constructor(message = "You do not have the permission to access this resource.") {
        super(message);
    }
}
exports.default = InvalidPermissionException;
