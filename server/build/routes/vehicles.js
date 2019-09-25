"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const deleteReplacedFiles_1 = require("../middlewares/deleteReplacedFiles");
const disallowGuests_1 = __importDefault(require("../middlewares/disallowGuests"));
const parseBody_1 = __importDefault(require("../middlewares/parseBody"));
const multerUpload_1 = __importDefault(require("../middlewares/multerUpload"));
const deleteFileOnError_1 = __importDefault(require("../middlewares/deleteFileOnError"));
const models_1 = __importDefault(require("../models"));
const helpers_1 = require("../utils/helpers");
const datasource_1 = require("../datasource");
const router = express_1.default.Router();
router.use(requireLogin_1.default);
router.get("/", async ({ user }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const VehicleDataSource = new datasource_1.Vehicle(models_1.default, user);
    try {
        let vehicles = await VehicleDataSource.getAll();
        response.setData(vehicles);
        response.handleSuccess(res, `Found ${vehicles.length} vehicles.`);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", multerUpload_1.default("carbooking/media/vehicles").single("vehicleImageSrc"), parseBody_1.default, disallowGuests_1.default, async ({ user, body, file }, res, next) => {
    const fileLocation = file &&
        file.filename &&
        helpers_1.getFileURL("carbooking/media/vehicles", file.filename);
    let response = new helpers_1.ResponseBuilder();
    const VehicleDataSource = new datasource_1.Vehicle(models_1.default, user);
    try {
        let createdVehicle = await VehicleDataSource.create(Object.assign({}, body, { vehicleImageSrc: fileLocation }));
        if (body.categories) {
            let categories = await models_1.default.Category.findAll({
                where: { id: body.categories }
            });
            await createdVehicle.setCategories(categories);
        }
        response.setData(Object.assign({}, createdVehicle.get({ plain: true }), { categories: await createdVehicle.getCategories().map(c => c.id) }));
        response.handleSuccess(res, "Vehicle has been created.");
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default);
router.get("/:id", async ({ user, params }, res) => {
    let response = new helpers_1.ResponseBuilder();
    const VehicleDataSource = new datasource_1.Vehicle(models_1.default, user);
    try {
        let foundVehicle = await VehicleDataSource.get(params.id);
        response.setData(Object.assign({}, foundVehicle.get({ plain: true }), { categories: (await foundVehicle.getCategories()).map(c => c.id) }));
        response.handleSuccess(res, `Vehicle with ID ${params.id} found.`);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.patch("/:id", multerUpload_1.default("carbooking/media/vehicles").single("vehicleImageSrc"), parseBody_1.default, disallowGuests_1.default, async (req, res, next) => {
    const { user, params, body, file } = req;
    const fileLocation = file &&
        file.filename &&
        helpers_1.getFileURL("carbooking/media/vehicles", file.filename);
    let response = new helpers_1.ResponseBuilder();
    const VehicleDataSource = new datasource_1.Vehicle(models_1.default, user);
    try {
        let updatedVehicle = await VehicleDataSource.update(params.id, Object.assign({}, body, { vehicleImageSrc: fileLocation }));
        fileLocation &&
            deleteReplacedFiles_1.addReplacedFiles(res, {
                url: updatedVehicle.vehicleImageSrc,
                model: models_1.default.Vehicle,
                field: "vehicleImageSrc"
            });
        if (body.categories) {
            let categories = await models_1.default.Category.findAll({
                where: { id: body.categories }
            });
            await updatedVehicle.setCategories(categories);
        }
        response.setData(Object.assign({}, updatedVehicle.get({ plain: true }), { categories: (await updatedVehicle.getCategories()).map(c => c.id) }));
        response.handleSuccess(res, `Vehicle with ID ${params.id} updated.`);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default, deleteReplacedFiles_1.deleteReplacedFiles);
router.delete("/:id", disallowGuests_1.default, async ({ user, params }, res, next) => {
    let response = new helpers_1.ResponseBuilder();
    const VehicleDataSource = new datasource_1.Vehicle(models_1.default, user);
    try {
        const deletedVehicle = await VehicleDataSource.delete(params.id);
        deleteReplacedFiles_1.addReplacedFiles(res, {
            url: deletedVehicle.vehicleImageSrc,
            model: models_1.default.Vehicle,
            field: "vehicleImageSrc"
        });
        response.setData(deletedVehicle.get({ plain: true }));
        response.handleSuccess(res, `Vehicle with ID ${params.id} has been deleted.`);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
    next();
}, deleteReplacedFiles_1.deleteReplacedFiles);
exports.default = router;
