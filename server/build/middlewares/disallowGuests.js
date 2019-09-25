"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../variables/enums");
const helpers_1 = require("../utils/helpers");
exports.default = (req, res, next) => {
    if (req.user.role !== enums_1.Role.GUEST) {
        next();
    }
    else {
        let response = new helpers_1.ResponseBuilder();
        response.setCode(401);
        response.setMessage("You are not authorized as a guest.");
        res.status(401);
        res.json(response);
    }
};
