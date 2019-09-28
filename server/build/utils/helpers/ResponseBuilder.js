"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
class ResponseBuilder {
    constructor() {
        this.code = 500;
        this.errors = [];
        this.message = "Unknown server error.";
        this.success = false;
        this.data = null;
    }
    setData(data) {
        this.data = data;
    }
    setSuccess(success) {
        this.success = success;
    }
    appendError(error) {
        this.errors.push(error);
    }
    setCode(code) {
        this.code = code;
    }
    setMessage(message) {
        this.message = message;
    }
    handleError(e, res) {
        if (e instanceof exceptions_1.InvalidPermissionException) {
            this.setCode(422);
            res.status(422);
        }
        else if (e instanceof exceptions_1.ResourceNotFoundException) {
            this.setCode(404);
            res.status(404);
        }
        else if (e instanceof exceptions_1.InvalidInputException) {
            this.setCode(403);
            res.status(403);
        }
        else {
            res.status(500);
        }
        this.setMessage(e.message);
        if (e.fields && e.fields.length) {
            e.fields.forEach((error) => this.appendError(error));
        }
    }
    handleSuccess(message, res) {
        this.setMessage(message);
        this.setCode(200);
        this.setSuccess(true);
        res.status(200);
    }
    toObject() {
        const { message, code, errors, success, data } = this;
        return { message, code, errors, success, data };
    }
}
exports.default = ResponseBuilder;
