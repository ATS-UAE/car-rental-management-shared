const jwt = require("jsonwebtoken");
const mailer = require("../mail");
const config = require("../config");

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

function exceptFields(fields, obj) {
	let result = {};

	for (key in obj) {
		if (fields.indexOf(key) < 0) result[key] = obj[key];
	}

	return result;
}

function pickFields(fields, obj) {
	let result = {};

	for (key in obj) {
		if (fields.indexOf(key) >= 0) result[key] = obj[key];
	}

	return result;
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

function sendInviteToken(email) {
	// Send email invite
	let token = jwt.sign({ email }, config.secretKey, { expiresIn: "7d" });
	return mailer.sendMail({
		from: "no-reply@atsuae.net",
		to: email,
		subject: "You are invited to LeasePlan Car Booking!",
		html: `<h1>Welcome</h1><a href="${
			config.serverUrl
		}/api/carbooking/invites/${token}">Click here to login!</a>`
	});
}

module.exports = {
	asyncForEach,
	ResponseBuilder,
	sendInviteToken,
	exceptFields,
	pickFields
};
