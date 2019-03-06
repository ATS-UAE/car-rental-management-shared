const { ROLES } = require("../utils/variables");

module.exports = function(req, res, next) {
	if (req.user.role !== ROLES.GUEST) {
		next();
	} else {
		res.status(401);
		res.json({ error: { message: "You are not authorized as a guest." } });
	}
};
