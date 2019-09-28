"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const deleteReplacedFiles_1 = require("../middlewares/deleteReplacedFiles");
const parseBody_1 = __importDefault(require("../middlewares/parseBody"));
const multerUpload_1 = __importDefault(require("../middlewares/multerUpload"));
const deleteFileOnError_1 = __importDefault(require("../middlewares/deleteFileOnError"));
const models_1 = __importDefault(require("../models"));
const helpers_1 = require("../utils/helpers/");
const datasource_1 = require("../datasource");
const router = express_1.default.Router();
router.use(requireLogin_1.default);
router.get("/", async ({ user }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const AccidentDataSource = new datasource_1.Accident(models_1.default, user);
    try {
        const accidents = await AccidentDataSource.getAll();
        response.setData(accidents);
        response.handleSuccess(`Found ${accidents.length} accidents.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", multerUpload_1.default("carbooking/media/accidents").fields([
    { name: "accidentImageSrc" },
    { name: "accidentVideoSrc" }
]), parseBody_1.default, async ({ user, body, files }, res, next) => {
    const response = new helpers_1.ResponseBuilder();
    const AccidentDataSource = new datasource_1.Accident(models_1.default, user);
    const accidentImageSrc = files &&
        files.accidentImageSrc &&
        files.accidentImageSrc[0] &&
        files.accidentImageSrc[0].filename &&
        helpers_1.getFileURL("carbooking/media/accidents", files.accidentImageSrc[0].filename);
    const accidentVideoSrc = files &&
        files.accidentVideoSrc &&
        files.accidentVideoSrc[0] &&
        files.accidentVideoSrc[0].filename &&
        helpers_1.getFileURL("carbooking/media/accidents", files.accidentVideoSrc[0].filename);
    try {
        const createdAccident = await AccidentDataSource.create(Object.assign({}, body, { accidentImageSrc,
            accidentVideoSrc }));
        response.setData(createdAccident);
        response.handleSuccess("Accident has been created.", res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default);
router.get("/:id", async ({ user, params }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const AccidentDataSource = new datasource_1.Accident(models_1.default, user);
    try {
        const foundAccident = await AccidentDataSource.get(params.id);
        response.setData(foundAccident.get({ plain: true }));
        response.handleSuccess(`Found accident with ID ${params.id}`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.patch("/:id", multerUpload_1.default("carbooking/media/accidents").fields([
    { name: "accidentImageSrc" },
    { name: "accidentVideoSrc" }
]), parseBody_1.default, async ({ user, params, body, files }, res, next) => {
    const response = new helpers_1.ResponseBuilder();
    const AccidentDataSource = new datasource_1.Accident(models_1.default, user);
    try {
        const accidentImageSrc = files &&
            files.accidentImageSrc &&
            files.accidentImageSrc[0] &&
            files.accidentImageSrc[0].filename &&
            helpers_1.getFileURL("carbooking/media/accidents", files.accidentVideoSrc[0].filename);
        const accidentVideoSrc = files &&
            files.accidentVideoSrc &&
            files.accidentVideoSrc[0] &&
            files.accidentVideoSrc[0].filename &&
            helpers_1.getFileURL("carbooking/media/accidents", files.accidentVideoSrc[0].filename);
        const [previousValue, updatedAccident] = await AccidentDataSource.update(params.id, Object.assign({}, body, { accidentImageSrc,
            accidentVideoSrc }));
        accidentImageSrc &&
            deleteReplacedFiles_1.addReplacedFiles(res, {
                url: previousValue.accidentImageSrc,
                model: models_1.default.Accident,
                field: "accidentImageSrc"
            });
        accidentVideoSrc &&
            deleteReplacedFiles_1.addReplacedFiles(res, {
                url: previousValue.accidentVideoSrc,
                model: models_1.default.Accident,
                field: "accidentVideoSrc"
            });
        response.setData(updatedAccident);
        response.handleSuccess(`Accident with ID ${params.id} has been updated.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default, deleteReplacedFiles_1.deleteReplacedFiles);
router.delete("/:id", async ({ user, params }, res, next) => {
    const response = new helpers_1.ResponseBuilder();
    const AccidentDataSource = new datasource_1.Accident(models_1.default, user);
    try {
        await AccidentDataSource.delete(params.id);
        response.handleSuccess(`Accident with ID ${params.id} has been deleted.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
});
exports.default = router;
