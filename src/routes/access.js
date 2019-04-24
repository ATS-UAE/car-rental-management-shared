const express = require("express");
const router = express.Router();
const { RBAC } = require("../rbac/init");
const { ResponseBuilder } = require("../utils");
const requireLogin = require("../middlewares/requireLogin");

router.post("/", requireLogin, async ({ body }, res) => {
	let response = new ResponseBuilder();
	const { resource, action, role, params } = body;
	let access = await RBAC.can(role, action, resource, params);
	let excludedFields = RBAC.getExcludedFields(role, action, resource);
	console.log(access);
	response.setData({ access, excludedFields });
	response.setSuccess(true);
	response.setCode(200);
	response.setMessage(null);

	res.json(response);
});

module.exports = router;
