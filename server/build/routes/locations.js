"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const disallowGuests_1 = __importDefault(require("../middlewares/disallowGuests"));
const parseBody_1 = __importDefault(require("../middlewares/parseBody"));
const deleteFileOnError_1 = __importDefault(require("../middlewares/deleteFileOnError"));
const deleteReplacedFiles_1 = require("../middlewares/deleteReplacedFiles");
const multerUpload_1 = __importDefault(require("../middlewares/multerUpload"));
const models_1 = __importDefault(require("../models"));
const helpers_1 = require("../utils/helpers");
const datasource_1 = require("../datasource");
const router = express_1.default.Router();
router.use(requireLogin_1.default);
router.get("/", async ({ user }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const LocationDataSource = new datasource_1.Location(models_1.default, user);
    try {
        const locations = await LocationDataSource.getAll();
        response.setData(locations);
        response.handleSuccess(`Found ${locations.length} locations. `, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", multerUpload_1.default("carbooking/media/locations").single("locationImageSrc"), parseBody_1.default, disallowGuests_1.default, async ({ user, body }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const LocationDataSource = new datasource_1.Location(models_1.default, user);
    try {
        const createdLocation = await LocationDataSource.create(body);
        response.setData(createdLocation);
        response.handleSuccess("Location has been created.", res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
}, deleteFileOnError_1.default);
router.get("/:id", async ({ user, params }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const LocationDataSource = new datasource_1.Location(models_1.default, user);
    try {
        let foundLocation = await LocationDataSource.get(params.id);
        response.setData(foundLocation.get({ plain: true }));
        response.handleSuccess(`Found location with ID of ${foundLocation.id}`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.patch("/:id", multerUpload_1.default("carbooking/media/locations").single("locationImageSrc"), parseBody_1.default, disallowGuests_1.default, async ({ user, params, body, file = {} }, res) => {
    const fileLocation = file &&
        file.filename &&
        helpers_1.getFileURL("carbooking/media/users/profile", file.filename);
    const response = new helpers_1.ResponseBuilder();
    const LocationDataSource = new datasource_1.Location(models_1.default, user);
    try {
        const updatedLocation = await LocationDataSource.update(params.id, body);
        fileLocation &&
            deleteReplacedFiles_1.addReplacedFiles(res, {
                url: updatedLocation.locationImageSrc,
                model: models_1.default.Location,
                field: "locationImageSrc"
            });
        response.setData(updatedLocation.get({ plain: true }));
        response.handleSuccess(`Location with ID ${params.id} updated.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
}, deleteFileOnError_1.default, deleteReplacedFiles_1.deleteReplacedFiles);
router.delete("/:id", async ({ user, params }, res) => {
    let response = new helpers_1.ResponseBuilder();
    const LocationDataSource = new datasource_1.Location(models_1.default, user);
    try {
        let deletedLocation = await LocationDataSource.delete(params.id);
        response.setData(deletedLocation.get({ plain: true }));
        response.handleSuccess(`Location with ID ${params.id} has been deleted.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
exports.default = router;
