"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../utils/helpers");
function default_1(req, res, next) {
    if (!req.user) {
        let response = new helpers_1.ResponseBuilder();
        response.setMessage("You are not authorized. Please login.");
        response.setCode(401);
        response.setSuccess(false);
        res.status(401);
        res.json(response);
    }
    else {
        next();
    }
}
exports.default = default_1;
