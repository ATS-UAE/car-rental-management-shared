const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { getTransport } = require("../mail/utils");

const asyncForEach = async (array, cb) => {
	for (let i = 0; i < array.length; i++) {
		await cb(array[i], i, array);
	}
};

const getGoogleMapsStaticURL = ({ lat, lng, key }) =>
	`https://maps.googleapis.com/maps/api/staticmap?size=600x300&markers=color:0xFF8E53|${lat},${lng}&key=${
		config.google.key
	}`;

function ResponseBuilder() {
	this.code = 500;
	this.errors = [];
	this.message = "Unknown server error";
	this.success = false;
	this.data = null;
}

function exceptFields(fields, obj) {
	let result = {};

	for (let key in obj) {
		if (fields.indexOf(key) < 0) result[key] = obj[key];
	}

	return result;
}

function pickFields(fields, obj) {
	let result = {};

	for (let key in obj) {
		if (fields.indexOf(key) >= 0) result[key] = obj[key];
	}

	return result;
}

function containsField(fields, obj) {
	let contains = [];
	for (let key in obj) {
		let exists = fields.indexOf(key);
		if (exists >= 0) contains.push(fields[exists]);
	}
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

function sendInviteToken({ email, url }) {
	// Send email invite
	let token = jwt.sign({ email }, config.secretKey, { expiresIn: "7d" });
	return getTransport().sendMail({
		from: "no-reply@atsuae.net",
		to: email,
		subject: "You are invited to LeasePlan Car Booking!",
		html: `<h1>Welcome</h1><a href="${url}?token=${token}">Click here to sign up!</a>`
	});
}
const toUnix = date => moment(date, "YYYY-MM-DDTHH:mm:ss").unix();
const toMySQLDate = unixS => {
	if (unixS === undefined || unixS === null) {
		return undefined;
	}
	return moment(unixS, "X").format("YYYY-MM-DD HH:mm:ss");
};

function sendPasswordResetToken({ email, url }) {
	// Send email invite
	let token = jwt.sign({ email, passwordReset: true }, config.secretKey, {
		expiresIn: "1h"
	});
	return getTransport().sendMail({
		from: "no-reply@atsuae.net",
		to: email,
		subject: "Password Reset",
		html: `<h1>Hello</h1><a href="${url}?token=${token}">Click here to reset password!</a>`
	});
}

module.exports = {
	asyncForEach,
	ResponseBuilder,
	sendInviteToken,
	exceptFields,
	pickFields,
	toUnix,
	toMySQLDate,
	containsField,
	sendPasswordResetToken,
	getGoogleMapsStaticURL
};
