"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const deleteReplacedFiles_1 = require("../middlewares/deleteReplacedFiles");
const deleteFileOnError_1 = __importDefault(require("../middlewares/deleteFileOnError"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const disallowGuests_1 = __importDefault(require("../middlewares/disallowGuests"));
const parseBody_1 = __importDefault(require("../middlewares/parseBody"));
const multerUpload_1 = __importDefault(require("../middlewares/multerUpload"));
const models_1 = __importDefault(require("../models"));
const helpers_1 = require("../utils/helpers");
const config_1 = __importDefault(require("../config"));
const datasource_1 = require("../datasource");
const exceptions_1 = require("../utils/exceptions");
const router = express_1.default.Router();
router.get("/", requireLogin_1.default, async ({ user }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const UserDataSource = new datasource_1.User(models_1.default, user);
    try {
        const users = await UserDataSource.getAll();
        response.setData(users);
        response.handleSuccess(`Found ${users.length} users.`, res);
    }
    catch (e) {
        response.handleError(e, res);
    }
    res.json(response);
});
router.post("/", multerUpload_1.default("carbooking/media/users/profile").single("userImageSrc"), parseBody_1.default, async ({ user, body, file = {} }, res, next) => {
    const { location: fileLocation = null, key: fileKey = null } = file;
    const response = new helpers_1.ResponseBuilder();
    const UserDataSource = new datasource_1.User(models_1.default, user);
    let inviteTokenUsed = false;
    let email = body.email;
    let clientId = (user && user.clientId) || null;
    // Consume invite token
    if (body.inviteToken) {
        const inviteToken = jsonwebtoken_1.default.verify(body.inviteToken, config_1.default.secretKey);
        if (inviteToken) {
            inviteTokenUsed = true;
            email = inviteToken.email;
            clientId = inviteToken.clientId;
        }
    }
    try {
        let hashedPassword = await bcryptjs_1.default.hash(body.password, 10);
        let createdUser = await UserDataSource.create(Object.assign({}, body, { userImageSrc: fileLocation, email, password: hashedPassword, clientId: clientId }), {
            invited: inviteTokenUsed
        });
        response.setData({
            createdUser,
            categories: (await createdUser.getCategories()).map(c => c.id)
        });
        response.setMessage("User has been created.");
        response.setCode(200);
        response.setSuccess(true);
        res.status(200);
    }
    catch (e) {
        response.setMessage(e.message);
        if (e instanceof exceptions_1.InvalidPermissionException) {
            response.setCode(422);
            res.status(422);
        }
        else {
            response.setMessage(e.message);
            response.setCode(403);
            res.status(403);
        }
        if (e.errors && e.errors.length > 0) {
            e.errors.forEach(error => response.appendError(error.path));
        }
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default);
router.get("/:id", requireLogin_1.default, async ({ user, params }, res) => {
    const response = new helpers_1.ResponseBuilder();
    const UserDataSource = new datasource_1.User(models_1.default, user);
    try {
        const foundUser = await UserDataSource.get(params.id);
        response.setData(Object.assign({}, foundUser.get({ plain: true }), { categories: (await foundUser.getCategories()).map(c => c.id) }));
        response.setCode(200);
        response.setMessage(`User with ID ${params.id} found.`);
        response.setSuccess(true);
    }
    catch (e) {
        if (e instanceof exceptions_1.ResourceNotFoundException) {
            res.status(404);
            response.setCode(404);
        }
        else {
            res.status(403);
            response.setCode(403);
        }
        response.setMessage(e.message);
    }
    res.json(response);
});
router.patch("/:id", requireLogin_1.default, multerUpload_1.default("carbooking/media/users/profile").single("userImageSrc"), parseBody_1.default, async ({ user, body, file = {}, params }, res, next) => {
    const fileLocation = file &&
        file.filename &&
        helpers_1.getFileURL("carbooking/media/users/profile", file.filename);
    let response = new helpers_1.ResponseBuilder();
    const UserDataSource = new datasource_1.User(models_1.default, user);
    try {
        let foundUser = await UserDataSource.get(body.id);
        fileLocation &&
            deleteReplacedFiles_1.addReplacedFiles(res, {
                url: foundUser.userImageSrc,
                model: models_1.default.User,
                field: "userImageSrc"
            });
        if (body.categories) {
            let categories = await models_1.default.Category.findAll({
                where: { id: body.categories }
            });
            await foundUser.setCategories(categories);
        }
        let updatedUser = await UserDataSource.update(foundUser.id, Object.assign({}, foundUser, { userImageSrc: fileLocation || foundUser.userImageSrc }));
        response.setData(updatedUser.get({ plain: true }));
        response.setCode(200);
        response.setMessage(`User with ID ${params.id} updated.`);
        response.setSuccess(true);
    }
    catch (e) {
        if (e instanceof exceptions_1.InvalidPermissionException) {
            response.setMessage(e.message);
            response.setCode(422);
            res.status(422);
        }
        else {
            response.setCode(403);
            res.status(403);
        }
        if (e.errors && e.errors.length > 0) {
            e.errors.forEach(error => response.appendError(error.path));
        }
    }
    res.json(response);
    next();
}, deleteFileOnError_1.default, deleteReplacedFiles_1.deleteReplacedFiles);
router.delete("/:id", requireLogin_1.default, disallowGuests_1.default, async ({ user, params }, res, next) => {
    let response = new helpers_1.ResponseBuilder();
    const UserDataSource = new datasource_1.User(models_1.default, user);
    try {
        let deletedUser = await UserDataSource.delete(params.id);
        deleteReplacedFiles_1.addReplacedFiles(res, {
            url: deletedUser.userImageSrc,
            model: models_1.default.User,
            field: "userImageSrc"
        });
        response.setCode(200);
        response.setSuccess(true);
        response.setMessage(`User with ID ${params.id} has been deleted.`);
    }
    catch (e) {
        if (e instanceof exceptions_1.InvalidPermissionException) {
            response.setMessage(e.message);
            response.setCode(422);
            res.status(422);
        }
        else {
            response.setCode(403);
            res.status(403);
        }
        if (e.errors && e.errors.length > 0) {
            e.errors.forEach(error => response.appendError(error.path));
        }
    }
    res.json(response);
    next();
}, deleteReplacedFiles_1.deleteReplacedFiles);
exports.default = router;
