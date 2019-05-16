const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const disallowGuests = require("../middlewares/disallowGuests");
const upload = require("../middlewares/multerUpload");
const { RBAC, OPERATIONS, resources } = require("../rbac/init");
const { CREATE, READ, UPDATE, DELETE } = OPERATIONS;
const db = require("../models");
const { errorCodes } = require("../utils/variables");
const { ResponseBuilder, pickFields } = require("../utils");
const { ROLES } = require("../utils/variables");
const config = require("../config");
const { s3 } = require("../utils/aws");
const { aws } = config;
const { bucket } = aws.s3;

router.get("/", requireLogin, disallowGuests, async ({ user }, res) => {
	let response = new ResponseBuilder();
	let accessible = await RBAC.can(user.role.name, READ, resources.users);
	if (accessible) {
		let users = await db.User.findAll({
			include: [{ model: db.Role, as: "role" }]
		});
		let result = users.map(user => ({
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
					"userCreatorId"
				],
				user.get({ plain: true })
			),
			role: pickFields(["id", "name"], user.get({ plain: true }).role)
		}));
		response.setSuccess(true);
		response.setCode(200);
		response.setMessage(`Found ${users.length} users.`);
		response.setData(result);
	} else {
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setSuccess(false);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}

	res.json(response);
});

router.post(
	"/",
	upload("carbooking/users/profile").single("userImageSrc"),
	async (req, res) => {
		const { user, body } = req;
		console.log("body:", body);
		console.log("file:", req.file);
		const file = req.file;
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
							"licenseImageSrc"
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
					}
				});

				response.setMessage("User has been created.");
				response.setCode(200);
				response.setSuccess(true);
				res.status(200);
			} catch (e) {
				fileKey &&
					s3.deleteObject(
						{
							Bucket: bucket,
							Key: fileKey
						},
						function(err, data) {
							if (err) console.log("Error cancelling upload:", err);
						}
					);
				response.setMessage(e.message);
				response.setCode(422);
				res.status(422);
				if (e.errors && e.errors.length > 0) {
					e.errors.forEach(error => response.appendError(error.path));
				}
			}
		} else {
			fileKey &&
				s3.deleteObject(
					{
						Bucket: bucket,
						Key: fileKey
					},
					function(err, data) {
						if (err) console.log("Error cancelling upload:", err);
					}
				);
			response.setMessage(errorCodes.UNAUTHORIZED.message);
			response.setCode(errorCodes.UNAUTHORIZED.statusCode);
			res.status(errorCodes.UNAUTHORIZED.statusCode);
		}

		res.json(response);
	}
);

router.get(
	"/:id",
	requireLogin,
	disallowGuests,
	async ({ user, params }, res) => {
		let response = new ResponseBuilder();
		let accessible = await RBAC.can(user.role.name, READ, resources.users);
		if (accessible) {
			try {
				let foundUser = await db.User.findByPk(params.id, {
					include: [{ all: true }]
				});
				if (foundUser) {
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
								"userCreatorId"
							],
							foundUser.get({ plain: true })
						),
						role: {
							id: role.id,
							name: role.name
						}
					});
					response.setCode(200);
					response.setMessage(`User with ID ${params.id} found.`);
					response.setSuccess(true);
				} else {
					res.status(404);
					response.setCode(404);
					response.setMessage(`User with ID ${params.id} not found.`);
				}
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

		res.json(response);
	}
);

router.patch("/:id", requireLogin, async (req, res) => {
	let response = new ResponseBuilder();
	let foundUser = await db.User.findByPk(req.params.id, {
		include: [{ model: db.Role, as: "role" }]
	});
	let accessible = await RBAC.can(req.user.role.name, UPDATE, resources.users, {
		updateUser: {
			id: req.params.id
		},
		currentUser: {
			id: req.user.id
		},
		role: foundUser.role
	});
	if (accessible) {
		if (foundUser) {
			try {
				let updatedUser = await foundUser.update(
					pickFields(
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
							"blocked",
							"createdAt",
							"updatedAt",
							"userCreatorId",
							"roleId"
						],
						req.body
					),
					{ include: [{ model: db.Role, as: "role" }] }
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
							"userCreatorId"
						],
						updatedUser.get({ plain: true })
					),
					role: {
						id: role.id,
						name: role.name
					}
				});
				response.setCode(200);
				response.setMessage(`User with ID ${req.params.id} updated.`);
				response.setSuccess(true);
			} catch (e) {
				console.log(e);
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
			response.setMessage(`User with ID ${req.params.id} not found.`);
			res.status(404);
		}
	} else {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}

	res.json(response);
});

router.delete(
	"/:id",
	requireLogin,
	disallowGuests,
	async ({ user, params }, res) => {
		let response = new ResponseBuilder();

		let accessible = await RBAC.can(user.role.name, DELETE, resources.users);

		if (accessible) {
			let foundUser = await db.User.findByPk(params.id);
			if (foundUser) {
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
	}
);

module.exports = router;
