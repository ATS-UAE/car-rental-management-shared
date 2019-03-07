const asyncForEach = async (array, cb) => {
	for (let i = 0; i < array.length; i++) {
		await cb(array[i], i, array);
	}
};

function ResponseBuilder() {
	this.code = 500;
	this.errors = [];
	this.message = "Unknown server error";
	this.success = false;
	this.data = null;
}

ResponseBuilder.prototype.setData = function(data) {
	this.data = data;
};
ResponseBuilder.prototype.setSuccess = function(success) {
	this.success = success;
};
ResponseBuilder.prototype.appendError = function(error) {
	this.errors.push(error);
};
ResponseBuilder.prototype.setCode = function(code) {
	this.code = code;
};
ResponseBuilder.prototype.setMessage = function(message) {
	this.message = message;
};
ResponseBuilder.prototype.getResponse = function() {
	return ({ error, message, success, data } = this);
};
module.exports = { asyncForEach, ResponseBuilder };
