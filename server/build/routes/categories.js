"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("../models"));
const helpers_1 = require("../utils/helpers/");
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const router = express_1.default.Router();
router.get("/", requireLogin_1.default, async (req, res) => {
    let response = new helpers_1.ResponseBuilder();
    const categories = await models_1.default.Category.findAll();
    response.setData(categories);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
router.post("/", requireLogin_1.default, async ({ body }, res) => {
    let response = new helpers_1.ResponseBuilder();
    const created = await models_1.default.Category.create({ name: body.name });
    response.setData(created);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
router.patch("/:id", requireLogin_1.default, async ({ params, body }, res) => {
    let response = new helpers_1.ResponseBuilder();
    const found = await models_1.default.Category.findByPk(params.id);
    found && found.update({ name: body.name });
    response.setData(found);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
router.delete("/:id", requireLogin_1.default, async ({ params }, res) => {
    let response = new helpers_1.ResponseBuilder();
    const found = await models_1.default.Category.findByPk(params.id);
    found && (await found.destroy());
    response.setData(found);
    response.setSuccess(true);
    response.setCode(200);
    response.setMessage(null);
    res.json(response);
});
exports.default = router;
