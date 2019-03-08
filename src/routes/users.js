const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const disallowGuests = require("../middlewares/disallowGuests");
const { ROLES, RESOURCES, accessControl, op } = require("../rbac/init");
const { CREATE, READ, UPDATE, DELETE } = op;
const db = require("../models");
const { errorCodes } = require("../utils/variables");
const { ResponseBuilder } = require("../utils");

router.use(requireLogin);
router.use(disallowGuests);

router.get("/", async ({ user }, res) => {
	let response = new ResponseBuilder();
	try {
		await accessControl.can(user.role.name, `${RESOURCES.USERS}:${READ}`);
		let users = await db.User.findAll({
			include: [{ model: db.Role, as: "role" }]
		});

		response.setData(
			users.map(
				({
					id,
					username,
					firstName,
					lastName,
					gender,
					email,
					mobileNumber,
					lastLogin,
					userImageSrc,
					licenseImageSrc,
					approved,
					blocked,
					createdAt,
					updatedAt,
					userCreatorId,
					role
				}) => ({
					id,
					username,
					firstName,
					lastName,
					gender,
					email,
					mobileNumber,
					lastLogin,
					userImageSrc,
					licenseImageSrc,
					approved,
					blocked,
					createdAt,
					updatedAt,
					userCreatorId,
					role: { id: role.id, name: role.name }
				})
			)
		);
		response.setSuccess(true);
		response.setCode(200);
		response.setMessage(`Found ${users.length} users.`);
	} catch (err) {
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setSuccess(false);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

router.post("/", async ({ user, body }, res) => {
	// If user being created is a guest role,
	// an email will be sent to the invitee.
	// Else, create directly with approved = true.
	let response = new ResponseBuilder();
	try {
		await accessControl.can(user.role.name, `${RESOURCES.USERS}:${CREATE}`);
		let {
			username,
			firstName,
			lastName,
			gender,
			email,
			password,
			mobileNumber,
			userImageSrc,
			licenseImageSrc,
			roleId
		} = body;
		let role = await db.Role.findByPk(roleId);
		let hashedPassword = await bcrypt.hash(password, 10);
		let createdUser = await db.User.build({
			username,
			firstName,
			lastName,
			gender,
			email,
			password: hashedPassword,
			mobileNumber,
			userImageSrc,
			licenseImageSrc,
			roleId
		});
		try {
			createdUser.validate();
			createdUser = await createdUser.save();
			response.setData({
				username,
				firstName,
				lastName,
				gender,
				email,
				mobileNumber,
				userImageSrc,
				licenseImageSrc,
				roleId
			});
			if (role.getDataValue("name") === ROLES.GUEST) {
				// Send email invite
			}
			response.setMessage("User created.");
			response.setCode(200);
			response.setSuccess(true);
		} catch (e) {
			response.setMessage(e.message);
			response.setCode(422);
			if (e.errors && e.errors.length > 0) {
				e.errors.forEach(error => response.appendError(error.path));
			}
		}
	} catch (err) {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

router.get("/:id", async (req, res) => {
	let response = new ResponseBuilder();
	try {
		let foundUser = await db.User.findByPk(req.params.id, {
			include: [{ model: db.Role, as: "role" }]
		});
		if (foundUser) {
			let {
				id,
				username,
				firstName,
				lastName,
				gender,
				email,
				mobileNumber,
				lastLogin,
				userImageSrc,
				licenseImageSrc,
				approved,
				blocked,
				createdAt,
				updatedAt,
				userCreatorId,
				role
			} = foundUser;
			response.setData({
				id,
				username,
				firstName,
				lastName,
				gender,
				email,
				mobileNumber,
				lastLogin,
				userImageSrc,
				licenseImageSrc,
				approved,
				blocked,
				createdAt,
				updatedAt,
				userCreatorId,
				role: {
					id: role.id,
					name: role.name
				}
			});
			response.setCode(200);
			response.setMessage(`User with ID ${req.params.id} found.`);
			response.setSuccess(true);
		} else {
			res.status(404);
			response.setCode(404);
			response.setMessage(`User with ID ${req.params.id} not found.`);
		}
	} catch (e) {
		res.status(errorCodes.UNAUTHORIZED.statusCode);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		response.setMessage(errorCodes.UNAUTHORIZED.message);
	}
	res.json(response);
});

router.patch("/:id", async (req, res) => {
	let response = new ResponseBuilder();
	try {
		await accessControl.can(
			req.user.role.name,
			`${RESOURCES.USERS}:${UPDATE}`,
			req.body
		);
		let foundUser = await db.User.findByPk(req.params.id, {
			include: [{ model: db.Role, as: "role" }]
		});
		if (foundUser) {
			try {
				let {
					id,
					username,
					firstName,
					lastName,
					gender,
					email,
					mobileNumber,
					lastLogin,
					userImageSrc,
					licenseImageSrc,
					blocked,
					createdAt,
					updatedAt,
					userCreatorId,
					roleId
				} = req.body;
				let updatedUser = await foundUser.update(
					{
						id,
						username,
						firstName,
						lastName,
						gender,
						email,
						mobileNumber,
						lastLogin,
						userImageSrc,
						licenseImageSrc,
						blocked,
						createdAt,
						updatedAt,
						userCreatorId,
						roleId
					},
					{ include: [{ model: db.Role, as: "role" }] }
				);
				let { role } = updatedUser;
				response.setData({
					id,
					username,
					firstName,
					lastName,
					gender,
					email,
					mobileNumber,
					lastLogin,
					userImageSrc,
					licenseImageSrc,
					blocked,
					createdAt,
					updatedAt,
					userCreatorId,
					role: {
						id: role.id,
						name: role.name
					}
				});
				response.setCode(200);
				response.setMessage(`User with ID ${req.params.id} updated.`);
				response.setSuccess(true);
			} catch (e) {
				response.setMessage(e.message);
				response.setCode(422);
				if (e.errors && e.errors.length > 0) {
					e.errors.forEach(error => response.appendError(error.path));
				}
			}
		} else {
			res.status(404);
			response.setCode(404);
			response.setMessage(`User with ID ${req.params.id} not found.`);
		}
	} catch (e) {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}

	res.json(response);
});

router.delete("/:id", async ({ user, params }, res) => {
	let response = new ResponseBuilder();
	try {
		await accessControl.can(user.role.name, `${RESOURCES.USERS}:${DELETE}`);
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
	} catch (e) {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

module.exports = router;
