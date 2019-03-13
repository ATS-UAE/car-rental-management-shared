const express = require("express");
const router = express.Router();

const requireLogin = require("../middlewares/requireLogin");
const { RESOURCES, accessControl, op } = require("../rbac/init");
const { READ } = op;
const db = require("../models");
const { errorCodes } = require("../utils/variables");
const { ResponseBuilder } = require("../utils");

router.use(requireLogin);

router.get("/", async ({ user }, res) => {
	let response = new ResponseBuilder();
	try {
		await accessControl.can(user.role.name, `${RESOURCES.ROLES}:${READ}`);
		let roles = await db.Role.findAll();
		response.setData(
			roles.map(({ id, name }) => ({
				id,
				name
			}))
		);
		response.setSuccess(true);
		response.setCode(200);
		response.setMessage(`Found ${roles.length} roles.`);
	} catch (err) {
		response.setCode(errorCodes.UNAUTHORIZED.statusCode);
		response.setMessage(errorCodes.UNAUTHORIZED.message);
		response.setSuccess(false);
		res.status(errorCodes.UNAUTHORIZED.statusCode);
	}
	res.json(response);
});

module.exports = router;
