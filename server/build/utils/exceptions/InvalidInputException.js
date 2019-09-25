"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InvalidInputException extends Error {
    constructor(message, fields = []) {
        super(message);
        this.fields = fields;
    }
}
exports.default = InvalidInputException;
