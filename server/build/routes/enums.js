"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rbac_1 = __importDefault(require("../utils/rbac"));
const models_1 = __importDefault(require("../models"));
const helpers_1 = require("../utils/helpers");
const router = express_1.default.Router();
router.get("/", async (req, res) => {
    let response = new helpers_1.ResponseBuilder();
    let roles = await models_1.default.Role.findAll();
    let bookingTypes = await models_1.default.BookingType.findAll();
    roles = roles.map(({ id, name }) => ({
        id,
        name
    }));
    bookingTypes = bookingTypes.map(({ id, name }) => ({
        id,
        name
    }));
    response.setData({ roles, bookingTypes, permissions: rbac_1.default.toObject() });
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage("Successfully found data.");
    res.json(response);
});
exports.default = router;
