const express = require("express");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const deleteReplacedFiles = require("../middlewares/deleteReplacedFiles");
const parseBody = require("../middlewares/parseBody");
const upload = require("../middlewares/multerUpload");
const deleteFileOnError = require("../middlewares/deleteFileOnError");
const { RBAC, OPERATIONS, resources } = require("../rbac/init");
const { CREATE, READ, UPDATE, DELETE } = OPERATIONS;
const db = require("../models");
const { errorCodes } = require("../utils/variables");
const { ResponseBuilder } = require("../utils");

router.use(requireLogin);

router.get("/", async ({ user }, res) => {
	let response = new ResponseBuilder();
	let accidents = await db.Accident.findAll({ include: [{ all: true }] });

	let accidentList = [];

	for (let accident of accidents) {
		let accessible = await RBAC.can(user.role.name, READ, resources.accidents, {
			user,
			accident
		});

		if (accessible) {
			accidentList.push(accident);
		}
	}

	response.setData(accidentList);
	response.setCode(200);
	response.setMessage(`Found ${accidentList.length} accidents.`);
	response.setSuccess(true);
	res.status(200);

	res.json(response);
});

router.post(
	"/",
	upload("carbooking/media/accidents").fields([
		{ name: "accidentImageSrc" },
		{ name: "accidentVideoSrc" }
	]),
	parseBody,
	async ({ user, body, files }, res, next) => {
		const accidentImageSrc =
			(files &&
				files.accidentImageSrc &&
				files.accidentImageSrc[0] &&
				files.accidentImageSrc[0].location) ||
			null;
		const accidentVideoSrc =
			(files &&
				files.accidentVideoSrc &&
				files.accidentVideoSrc[0] &&
				files.accidentVideoSrc[0].location) ||
			null;
		console.log(accidentImageSrc, accidentVideoSrc);
		let response = new ResponseBuilder();
		let accessible = await RBAC.can(
			user.role.name,
			CREATE,
			resources.accidents
		);

		if (accessible) {
			try {
				let createdAccident = await db.Accident.create({
					...body,
					accidentImageSrc,
					accidentVideoSrc
				});

				response.setData(createdAccident);
				response.setMessage("Accident has been created.");
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

router.get("/:id", async ({ user, params }, res) => {
	let response = new ResponseBuilder();
	let foundAccident = await db.Accident.findByPk(params.id);
	if (foundAccident) {
		let accessible = await RBAC.can(user.role.name, READ, resources.accidents, {
			user,
			accident: foundAccident
		});
		if (accessible) {
			try {
				if (foundAccident) {
					response.setData(foundAccident);
					response.setCode(200);
					response.setMessage(`Accident with ID ${params.id} found.`);
					response.setSuccess(true);
				} else {
					res.status(404);
					response.setCode(404);
					response.setMessage(`Accident with ID ${params.id} not found.`);
				}
			} catch (e) {
				res.status(errorCodes.UNAUTHORIZED.statusCode);
				response.setCode(errorCodes.UNAUTHORIZED.statusCode);
				response.setMessage(errorCodes.UNAUTHORIZED.message);
			}
		} else {
			response.setMessage(errorCodes.UNAUTHORIZED.message);
			response.setCode(errorCodes.UNAUTHORIZED.statusCode);
			res.status(errorCodes.UNAUTHORIZED.statusCode);
		}
	}
	res.json(response);
});

router.patch(
	"/:id",
	upload("carbooking/media/accidents").fields([
		{ name: "accidentImageSrc" },
		{ name: "accidentVideoSrc" }
	]),
	parseBody,
	async (req, res, next) => {
		const { user, params, body, files } = req;

		let response = new ResponseBuilder();
		let foundAccident = await db.Accident.findByPk(params.id, {
			include: [{ all: true }]
		});
		let accessible = await RBAC.can(
			user.role.name,
			UPDATE,
			resources.accidents,
			{ accident: foundAccident, user }
		);
		if (accessible) {
			if (foundAccident) {
				const accidentImageSrc =
					(files &&
						files.accidentImageSrc &&
						files.accidentImageSrc[0] &&
						files.accidentImageSrc[0].location) ||
					foundAccident.accidentImageSrc;
				const accidentVideoSrc =
					(files &&
						files.accidentVideoSrc &&
						files.accidentVideoSrc[0] &&
						files.accidentVideoSrc[0].location) ||
					foundAccident.accidentVideoSrc;

				try {
					req.beforeUpdate = foundAccident;
					let updatedAccident = await foundAccident.update({
						...body,
						accidentImageSrc,
						accidentVideoSrc
					});
					response.setData(updatedAccident);
					response.setCode(200);
					response.setMessage(`Accident with ID ${params.id} updated.`);
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
				response.setMessage(`Accident with ID ${params.id} not found.`);
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

router.delete("/:id", async ({ user, params }, res) => {
	let response = new ResponseBuilder();

	let foundAccident = await db.Accident.findByPk(params.id);

	let accessible = await RBAC.can(user.role.name, DELETE, resources.accidents, {
		foundAccident,
		user
	});

	if (accessible) {
		if (foundAccident) {
			await foundAccident.destroy();
			response.setCode(200);
			response.setSuccess(true);
			response.setMessage(`Accident with ID ${params.id} has been deleted.`);
		} else {
			response.setCode(404);
			response.setMessage(`Accident with ID ${params.id} is not found.`);
		}
	} else {
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

module.exports = router;
