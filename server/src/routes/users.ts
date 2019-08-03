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

	UserDataSource.getAll();
	res.json(response);
	// let users = await db.User.findAll({
	// 	include: [{ model: db.Role, as: "role" }]
	// });
	// let $userList = [];
	// for (let targetUser of users) {
	// 	let accessible = await RBAC.can(user.role.name, READ, resources.users, {
	// 		targetUser: targetUser,
	// 		user
	// 	});
	// 	if (accessible) {
	// 		$userList.push(targetUser);
	// 	}
	// }

	// let result = [];
	// for (let user of $userList) {
	// 	result.push({
	// 		...pickFields(
	// 			[
	// 				"id",
	// 				"username",
	// 				"firstName",
	// 				"lastName",
	// 				"gender",
	// 				"email",
	// 				"mobileNumber",
	// 				"lastLogin",
	// 				"userImageSrc",
	// 				"licenseImageSrc",
	// 				"approved",
	// 				"blocked",
	// 				"createdAt",
	// 				"updatedAt",
	// 				"userCreatorId",
	// 				"roleId"
	// 			],
	// 			user.get({ plain: true })
	// 		),
	// 		role: pickFields(["id", "name"], user.get({ plain: true }).role),
	// 		categories: (await user.getCategories()).map(c => c.id)
	// 	});
	// }

	// response.setSuccess(true);
	// response.setCode(200);
	// response.setMessage(`Found ${$userList.length} users.`);
	// response.setData(result);

	// res.json(response);
});

router.post(
	"/",
	upload("carbooking/media/users/profile").single("userImageSrc"),
	parseBody,
	async ({ user, body, file = {} }, res, next) => {
		const { location: fileLocation = null, key: fileKey = null } = file;
		// If user being created is a guest role,
		// an email will be sent to the invitee.
		// Else, create directly with approved = true.
		let response = new ResponseBuilder();
		let accessible = false;
		let inviteTokenUsed = false;
		let email = body.email;
		let role = await db.Role.findByPk(body.roleId);
		if (body.inviteToken) {
			// Consume invite token
			let inviteToken = jwt.verify(body.inviteToken, config.secretKey);
			if (inviteToken) {
				inviteTokenUsed = true;
				email = inviteToken.email;
			}
		} else if (user && user.role && user.role.name) {
			accessible = await RBAC.can(user.role.name, CREATE, resources.users, {
				role
			});
		}
		if (accessible || inviteTokenUsed) {
			let guestRole = await db.Role.findOne({ where: { name: ROLES.GUEST } });

			try {
				// Immediately create the user otherwise.
				let approved = !inviteTokenUsed; // Approve if userCreated is not guest
				let hashedPassword = await bcrypt.hash(body.password, 10);
				let createdUser = await db.User.create({
					...pickFields(
						[
							"username",
							"firstName",
							"lastName",
							"gender",
							"mobileNumber",
							"userImageSrc",
							"licenseImageSrc",
							"roleId"
						],
						body
					),
					userImageSrc: fileLocation,
					email,
					roleId: inviteTokenUsed ? guestRole.id : role.id,
					approved,
					password: hashedPassword
				});
				response.setData({
					...pickFields(
						[
							"id",
							"username",
							"firstName",
							"lastName",
							"gender",
							"email",
							"mobileNumber",
							"userImageSrc",
							"licenseImageSrc"
						],
						createdUser.get({ plain: true })
					),
					role: {
						id: inviteTokenUsed ? guestRole.id : role.id,
						name: inviteTokenUsed ? guestRole.name : role.name
					},
					categories: (await createdUser.getCategories()).map(c => c.id)
				});

				response.setMessage("User has been created.");
				response.setCode(200);
				response.setSuccess(true);
				res.status(200);
			} catch (e) {
				response.setMessage(e.message);
				response.setCode(422);
				res.status(422);
				if (e.errors && e.errors.length > 0) {
					e.errors.forEach(error => response.appendError(error.path));
				}
			}
		} else {
			response.setMessage(errorCodes.UNAUTHORIZED.message);
			response.setCode(errorCodes.UNAUTHORIZED.statusCode);
			res.status(errorCodes.UNAUTHORIZED.statusCode);
		}

		res.json(response);
		next();
	},
	deleteFileOnError
);

router.get("/:id", requireLogin, async ({ user, params }, res) => {
	let response = new ResponseBuilder();
	let foundUser = await db.User.findByPk(params.id, {
		include: [{ all: true }]
	});
	if (foundUser) {
		let accessible = await RBAC.can(user.role.name, READ, resources.users, {
			user,
			targetUser: foundUser
		});
		if (accessible) {
			try {
				let foundUser = await db.User.findByPk(params.id, {
					include: [{ all: true }]
				});
				let { role } = foundUser;
				response.setData({
					...pickFields(
						[
							"id",
							"username",
							"firstName",
							"lastName",
							"gender",
							"email",
							"mobileNumber",
							"lastLogin",
							"userImageSrc",
							"licenseImageSrc",
							"approved",
							"blocked",
							"createdAt",
							"updatedAt",
							"userCreatorId",
							"roleId"
						],
						foundUser.get({ plain: true })
					),
					role: {
						id: role.id,
						name: role.name
					},
					categories: (await foundUser.getCategories()).map(c => c.id)
				});
				response.setCode(200);
				response.setMessage(`User with ID ${params.id} found.`);
				response.setSuccess(true);
			} catch (e) {
				res.status(errorCodes.UNAUTHORIZED.statusCode);
				response.setCode(errorCodes.UNAUTHORIZED.statusCode);
				response.setMessage(e.message || errorCodes.UNAUTHORIZED.message);
			}
		} else {
			response.setMessage(errorCodes.UNAUTHORIZED.message);
			response.setCode(errorCodes.UNAUTHORIZED.statusCode);
			res.status(errorCodes.UNAUTHORIZED.statusCode);
		}
	} else {
		res.status(404);
		response.setCode(404);
		response.setMessage(`User with ID ${params.id} not found.`);
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
		let foundUser = await db.User.findByPk(params.id, {
			include: [{ model: db.Role, as: "role" }]
		});
		let accessible = false;
		if (foundUser) {
			accessible = await RBAC.can(user.role.name, UPDATE, resources.users, {
				targetUser: foundUser,
				user,
				role: foundUser.role
			});
		}
		if (accessible) {
			if (foundUser) {
				fileLocation &&
					addReplacedFiles(res, {
						url: foundUser.userImageSrc,
						model: db.User,
						field: "userImageSrc"
					});
				try {
					if (body.categories) {
						let categories = await db.Category.findAll({
							where: { id: body.categories }
						});
						await foundUser.setCategories(categories);
					}

					let updatedUser = await foundUser.update(
						{
							...pickFields(
								[
									"username",
									"firstName",
									"lastName",
									"gender",
									"email",
									"mobileNumber",
									"userImageSrc",
									"licenseImageSrc",
									"blocked",
									"roleId"
								],
								body
							),
							userImageSrc: fileLocation || foundUser.userImageSrc
						},
						{
							include: [
								{ model: db.Role, as: "role" },
								{ model: db.Category, as: "categories" }
							]
						}
					);
					let role = updatedUser.role;
					response.setData({
						...pickFields(
							[
								"id",
								"username",
								"firstName",
								"lastName",
								"gender",
								"email",
								"mobileNumber",
								"lastLogin",
								"userImageSrc",
								"licenseImageSrc",
								"approved",
								"blocked",
								"createdAt",
								"updatedAt",
								"userCreatorId",
								"roleId"
							],
							updatedUser.get({ plain: true })
						),
						role: {
							id: role.id,
							name: role.name
						},
						categories: (await updatedUser.getCategories()).map(c => c.id)
					});
					response.setCode(200);
					response.setMessage(`User with ID ${params.id} updated.`);
					response.setSuccess(true);
				} catch (e) {
					response.setMessage(e.message);
					response.setCode(422);
					res.status(422);
					if (e.errors && e.errors.length > 0) {
						e.errors.forEach(error => response.appendError(error.path));
					}
				}
			} else {
				res.status(404);
				response.setCode(404);
				response.setMessage(`User with ID ${params.id} not found.`);
				res.status(404);
			}
		} else {
			response.setMessage(errorCodes.UNAUTHORIZED.message);
			response.setCode(errorCodes.UNAUTHORIZED.statusCode);
			res.status(errorCodes.UNAUTHORIZED.statusCode);
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

		if (accessible) {
			let foundUser = await db.User.findByPk(params.id);
			if (foundUser) {
				addReplacedFiles(res, {
					url: foundUser.userImageSrc,
					model: db.User,
					field: "userImageSrc"
				});
				await foundUser.destroy();
				response.setCode(200);
				response.setSuccess(true);
				response.setMessage(`User with ID ${params.id} has been deleted.`);
			} else {
				response.setCode(404);
				response.setMessage(`User with ID ${params.id} is not found.`);
			}
		} else {
			response.setMessage(errorCodes.UNAUTHORIZED.message);
			response.setCode(errorCodes.UNAUTHORIZED.statusCode);
			res.status(errorCodes.UNAUTHORIZED.statusCode);
		}
		res.json(response);
		next();
	},
	deleteReplacedFiles
);

module.exports = router;
