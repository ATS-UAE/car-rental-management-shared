module.exports = function(req, res, next) {
	if (!req.user) {
		res.status(401);
		res.json({ error: { message: "You are not authorized. Please login." } });
	} else {
		next();
	}
};
