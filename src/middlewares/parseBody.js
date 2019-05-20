module.exports = ({ body }, res, next) => {
	for (let key in body) {
		console.log(body[key]);
		body[key] = JSON.parse(body[key]);
	}
	next();
};
