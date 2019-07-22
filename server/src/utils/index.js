const path = require("path");
const fs = require("fs");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { getTransport } = require("../mail/utils");
const { BOOKING_STATUS } = require("./variables");

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

const sqlDateToMoment = date => moment(date, "YYYY-MM-DDTHH:mm:ss");

const toUnix = date => sqlDateToMoment(date).unix();

const isSqlDate = date =>
	/^[0-9]{2,4}-[0-1][0-9]-[0-3][0-9]T[0-2][0-9]:[0-5][0-9]:[0-5][0-9]\.\d*Z?$/.test(
		date
	);

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

const getStaticFilesPath = () =>
	path.join(__dirname, "/../../../../static", process.env.NODE_ENV);

const getFileURL = (filePath, fileName) =>
	new URL(`${process.env.SERVER_URL}/static/${filePath}/${fileName}`).href;

const getPathFromURL = fileURL =>
	path.join(
		getStaticFilesPath(),
		fileURL.replace(new RegExp(`^${process.env.SERVER_URL}/static`), "")
	);

const deleteFileFromUrl = fileUrl =>
	fs.promises.unlink(getPathFromURL(fileUrl));

const convertSequelizeDatesToUnix = obj => {
	if (obj instanceof Array) {
		for (let value of obj) {
			convertSequelizeDatesToUnix(value);
		}
	} else if (obj && typeof obj === "object") {
		const values = obj.dataValues ? obj.dataValues : obj;

		for (let key in values) {
			if (values[key] instanceof Date) {
				values[key] = moment(values[key]).unix();
			} else if (typeof values[key] === "object") {
				convertSequelizeDatesToUnix(values[key]);
			}
		}
	}
};

const getBookingStatus = booking => {
	let status = BOOKING_STATUS.UNKNOWN;
	let currentTime = moment();
	let hasPassedFrom = moment(booking.from, "X").isSameOrBefore(currentTime);
	let hasPassedTo = moment(booking.to, "X").isSameOrBefore(currentTime);
	if (booking.approved) {
		if (hasPassedFrom && !hasPassedTo) status = BOOKING_STATUS.ONGOING;
		else if (hasPassedTo) status = BOOKING_STATUS.FINISHED;
		else status = BOOKING_STATUS.APPROVED;
	} else {
		if (booking.approved === null) {
			if (hasPassedFrom) status = BOOKING_STATUS.EXPIRED;
			else status = BOOKING_STATUS.PENDING;
		} else if (booking.approved === false) status = BOOKING_STATUS.DENIED;
	}
	return status;
};

const isVehicleAvailableForBooking = (vehicle, bookingId) => {
	let available = true;
	if (vehicle && vehicle.bookings) {
		for (const booking of vehicle.bookings) {
			let status = getBookingStatus(booking);
			if (
				status === BOOKING_STATUS.PENDING ||
				status === BOOKING_STATUS.ONGOING ||
				status === BOOKING_STATUS.APPROVED
			) {
				available = false;
			} else if (bookingId && bookingId === booking.id) {
				available = true;
			}
		}
	}
	return available;
};

module.exports = {
	isVehicleAvailableForBooking,
	getBookingStatus,
	deleteFileFromUrl,
	getPathFromURL,
	getFileURL,
	getStaticFilesPath,
	asyncForEach,
	ResponseBuilder,
	sendInviteToken,
	exceptFields,
	pickFields,
	toUnix,
	toMySQLDate,
	containsField,
	sendPasswordResetToken,
	getGoogleMapsStaticURL,
	sqlDateToMoment,
	isSqlDate,
	convertSequelizeDatesToUnix
};
