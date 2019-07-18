const { compile } = require("handlebars");
const mjml2html = require("mjml");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const { mail, secretKey } = require("../config/");

const getTemplate = fileName =>
	fs.readFileSync(`${__dirname}/templates/${fileName}.mjml`, "utf8");

const getTransport = () => nodemailer.createTransport(mail);

const compileTemplate = (mjml, context) => compile(mjml)(context);

function sendInvite({ email }) {
	const transporter = getTransport();
	let token = jwt.sign({ email }, secretKey, { expiresIn: "7d" });
	const compiled = compileTemplate(getTemplate("invite"), {
		company: "LeasePlan",
		contactEmail: "support@atsuae.net",
		logoSrc: `${process.env.SERVER_URL}/static/images/mail-header.png`,
		signUpLink: `${process.env.CLIENT_URL}/signup?token=${token}`
	});
	const template = mjml2html(compiled);
	const mainOptions = {
		from: "LeasePlan Rentals <no-reply@atsuae.net>",
		to: email,
		subject: "You are invited to LeasePlan Car Booking!",
		html: template.html
	};
	return new Promise((resolve, reject) => {
		transporter.sendMail(mainOptions, function(err, info) {
			if (err) {
				reject(err);
			} else {
				resolve(info.response);
			}
		});
	});
}

function sendInvoice({
	email,
	amount,
	customerName,
	vehicleName,
	from,
	to,
	bookingId
}) {
	const transporter = getTransport();
	const compiled = compileTemplate(getTemplate("invoice"), {
		company: "LeasePlan",
		customerName,
		vehicleName,
		from: moment(from, "X").format("LLL"),
		to: moment(to, "X").format("LLL"),
		contactEmail: "support@atsuae.net",
		logoSrc: `${process.env.SERVER_URL}/static/images/mail-header.png`,
		amount,
		bookingId
	});
	const template = mjml2html(compiled);
	const mainOptions = {
		from: "LeasePlan Rentals <no-reply@atsuae.net>",
		to: email,
		subject: "Your car booking receipt is here!",
		html: template.html
	};
	return new Promise((resolve, reject) => {
		transporter.sendMail(mainOptions, function(err, info) {
			if (err) {
				reject(err);
			} else {
				resolve(info.response);
			}
		});
	});
}

function sendBookingConfirmation({
	email,
	customerName,
	vehicleName,
	from,
	to,
	bookingId,
	parkingLocation,
	mapURL
}) {
	const transporter = getTransport();
	const compiled = compileTemplate(getTemplate("confirmBooking"), {
		company: "LeasePlan",
		contactEmail: "support@atsuae.net",
		logoSrc: `${process.env.SERVER_URL}/static/images/mail-header.png`,
		bookingId,
		from: moment(from, "X").format("LLL"),
		to: moment(to, "X").format("LLL"),
		vehicleName,
		customerName,
		bookingId,
		mapURL,
		parkingLocation
	});
	const template = mjml2html(compiled);
	const mainOptions = {
		from: "LeasePlan Rentals <no-reply@atsuae.net>",
		to: email,
		subject: "Your booking has been confirmed!",
		html: template.html
	};
	return new Promise((resolve, reject) => {
		transporter.sendMail(mainOptions, function(err, info) {
			if (err) {
				reject(err);
			} else {
				resolve(info.response);
			}
		});
	});
}

module.exports = {
	sendBookingConfirmation,
	sendInvoice,
	sendInvite,
	getTransport
};
