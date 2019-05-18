module.exports = ({ body }, res, next) => {
	for (let key in body) {
		body[key] = JSON.parse(body[key]);
	}
	next();
};
