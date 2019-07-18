const { ROLES } = require("../utils/variables");
const { ResponseBuilder } = require("../utils");

module.exports = function(req, res, next) {
	if (req.user.role !== ROLES.GUEST) {
		next();
	} else {
		let response = new ResponseBuilder();
		response.setCode(401);
		response.setMessage("You are not authorized as a guest.");
		res.status(401);
		res.json(response);
	}
};
