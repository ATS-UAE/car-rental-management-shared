const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const {
	deleteReplacedFiles,
	addReplacedFiles
} = require("../middlewares/deleteReplacedFiles");
const deleteFileOnError = require("../middlewares/deleteFileOnError");
const requireLogin = require("../middlewares/requireLogin");
const disallowGuests = require("../middlewares/disallowGuests");
const parseBody = require("../middlewares/parseBody");
const upload = require("../middlewares/multerUpload");
const { RBAC, OPERATIONS, resources } = require("../rbac/init");
const { CREATE, READ, UPDATE, DELETE } = OPERATIONS;
const db = require("../models");
const { errorCodes } = require("../utils/variables");
const { ResponseBuilder, pickFields, getFileURL } = require("../utils");
const { ROLES } = require("../utils/variables");
const config = require("../config");
import { User } from "../datasource";
import {
	InvalidPermissionException,
	ResourceNotFoundException
} from "../utils/exceptions";

router.get("/", requireLogin, async ({ user }, res) => {
	const response = new ResponseBuilder();
	const UserDataSource = new User(db, user);

	try {
		const users = await UserDataSource.getAll();
		response.setData(users);
		response.setCode(200);
		response.setSuccess(true);
	} catch (e) {
		res.status(403);
		response.setCode(403);
		response.setMessage(e.message);
	}

	res.json(response);
});

router.post(
	"/",
	upload("carbooking/media/users/profile").single("userImageSrc"),
	parseBody,
	async ({ user, body, file = {} }, res, next) => {
		const { location: fileLocation = null, key: fileKey = null } = file;
		const response = new ResponseBuilder();
		const UserDataSource = new User(db, user);
		let inviteTokenUsed = false;
		let email = body.email;
		let role = await db.Role.findByPk(body.roleId);

		// Consume invite token
		if (body.inviteToken) {
			const inviteToken = jwt.verify(body.inviteToken, config.secretKey);
			if (inviteToken) {
				inviteTokenUsed = true;
				email = inviteToken.email;
			}
		}

		let guestRole = await db.Role.findOne({ where: { name: ROLES.GUEST } });
		try {
			let hashedPassword = await bcrypt.hash(body.password, 10);
			let createdUser = await UserDataSource.create(
				{
					...body,
					userImageSrc: fileLocation,
					email,
					roleId: inviteTokenUsed ? guestRole.id : role.id,
					approved: !inviteTokenUsed,
					password: hashedPassword
				},
				{
					invited: inviteTokenUsed
				}
			);

			response.setData({
				createdUser,
				categories: (await createdUser.getCategories()).map(c => c.id)
			});

			response.setMessage("User has been created.");
			response.setCode(200);
			response.setSuccess(true);
			res.status(200);
		} catch (e) {
			response.setMessage(e.message);
			if (e instanceof InvalidPermissionException) {
				response.setCode(422);
				res.status(422);
			} else {
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
	},
	deleteFileOnError
);

router.get("/:id", requireLogin, async ({ user, params }, res) => {
	const response = new ResponseBuilder();
	const UserDataSource = new User(db, user);

	try {
		const foundUser = await UserDataSource.get(params.id);
		response.setData({
			...foundUser.get({ plain: true }),
			categories: (await foundUser.getCategories()).map(c => c.id)
		});
		response.setCode(200);
		response.setMessage(`User with ID ${params.id} found.`);
		response.setSuccess(true);
	} catch (e) {
		if (e instanceof ResourceNotFoundException) {
			res.status(404);
			response.setCode(404);
		} else {
			res.status(403);
			response.setCode(403);
		}
		response.setMessage(e.message);
	}

	res.json(response);
});

router.patch(
	"/:id",
	requireLogin,
	upload("carbooking/media/users/profile").single("userImageSrc"),
	parseBody,
	async ({ user, body, file = {}, params }, res, next) => {
		const fileLocation =
			file &&
			file.filename &&
			getFileURL("carbooking/media/users/profile", file.filename);
		let response = new ResponseBuilder();
		const UserDataSource = new User(db, user);

		try {
			let foundUser = await UserDataSource.get(body.id);

			fileLocation &&
				addReplacedFiles(res, {
					url: foundUser.userImageSrc,
					model: db.User,
					field: "userImageSrc"
				});
			if (body.categories) {
				let categories = await db.Category.findAll({
					where: { id: body.categories }
				});
				await foundUser.setCategories(categories);
			}
			let updatedUser = await UserDataSource.update(foundUser.id, {
				...foundUser,
				userImageSrc: fileLocation || foundUser.userImageSrc
			});

			response.setData(updatedUser.get({ plain: true }));
			response.setCode(200);
			response.setMessage(`User with ID ${params.id} updated.`);
			response.setSuccess(true);
		} catch (e) {
			if (e instanceof InvalidPermissionException) {
				response.setMessage(e.message);
				response.setCode(422);
				res.status(422);
			} else {
				response.setCode(403);
				res.status(403);
			}
			if (e.errors && e.errors.length > 0) {
				e.errors.forEach(error => response.appendError(error.path));
			}
		}

		res.json(response);
		next();
	},
	deleteFileOnError,
	deleteReplacedFiles
);

router.delete(
	"/:id",
	requireLogin,
	disallowGuests,
	async ({ user, params }, res, next) => {
		let response = new ResponseBuilder();

		let accessible = await RBAC.can(user.role.name, DELETE, resources.users);
		const UserDataSource = new User(db, user);
		try {
			let deletedUser = await UserDataSource.delete(params.id);

			addReplacedFiles(res, {
				url: deletedUser.userImageSrc,
				model: db.User,
				field: "userImageSrc"
			});

			response.setCode(200);
			response.setSuccess(true);
			response.setMessage(`User with ID ${params.id} has been deleted.`);
		} catch (e) {
			if (e instanceof InvalidPermissionException) {
				response.setMessage(e.message);
				response.setCode(422);
				res.status(422);
			} else {
				response.setCode(403);
				res.status(403);
			}
			if (e.errors && e.errors.length > 0) {
				e.errors.forEach(error => response.appendError(error.path));
			}
		}

		res.json(response);
		next();
	},
	deleteReplacedFiles
);

module.exports = router;