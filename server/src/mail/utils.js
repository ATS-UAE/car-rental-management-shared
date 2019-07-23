const { compile } = require("handlebars");
const mjml2html = require("mjml");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const StaticMaps = require("staticmaps");
const { mail, secretKey } = require("../config/");
const { getStaticFilesPath, makeDirectoryIfNotExist } = require("../utils");

const getTemplate = fileName =>
	fs.readFileSync(`${__dirname}/templates/${fileName}.mjml`, "utf8");

const getTransport = () => nodemailer.createTransport(mail);

const compileTemplate = (mjml, context) => compile(mjml)(context);

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

const sendBookingConfirmation = async ({
	email,
	customerName,
	vehicleName,
	from,
	to,
	bookingId,
	parkingLocation,
	lat,
	lng
}) => {
	const transporter = getTransport();

	const options = {
		width: 1200,
		height: 800,
		tileUrl: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=en"
	};

	const map = new StaticMaps(options);
	const marker = {
		img: path.join(__dirname, "../public/images/LocationMarker.png"),
		coord: [lng, lat],
		offsetX: 50,
		offsetY: 100,
		width: 100,
		height: 100
	};
	map.addMarker(marker, { zoom: 10 });
	await map.render([lng, lat]);
	const filePath = path.join(getStaticFilesPath(), "/maps");
	const fileName = `${Date.now()}.png`;
	const fileSavePath = path.join(filePath, fileName);
	await makeDirectoryIfNotExist(filePath);
	await map.image.save(fileSavePath);
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
		mapURL: `cid:${fileName}`,
		lat,
		lng,
		parkingLocation
	});
	const template = mjml2html(compiled);
	const mainOptions = {
		from: "LeasePlan Rentals <no-reply@atsuae.net>",
		to: email,
		subject: "Your booking has been confirmed!",
		html: template.html,
		attachments: [
			{
				filename: "Map Location.png",
				path: fileSavePath,
				cid: fileName
			}
		]
	};
	return new Promise((resolve, reject) => {
		transporter.sendMail(mainOptions, function(err, info) {
			fs.promises.unlink(fileSavePath);
			console.log(err, info);
			if (err) {
				return reject(err);
			} else {
				return resolve(info.response);
			}
		});
	});
};

sendBookingConfirmation({
	email: "ramil@atsuae.net",
	customerName: "Ramil",
	vehicleName: "Prado",
	from: moment().unix(),
	to: moment().unix(),
	bookingId: 1,
	parkingLocation: "Parking location",
	lat: 25.064181,
	lng: 55.16367
});

module.exports = {
	sendBookingConfirmation,
	sendInvoice,
	sendInvite,
	getTransport,
	sendPasswordResetToken
};
