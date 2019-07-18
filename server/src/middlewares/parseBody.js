module.exports = ({ body }, res, next) => {
	for (let key in body) {
		try {
			body[key] = JSON.parse(body[key]);
		} catch (e) {}
	}
	next();
};
