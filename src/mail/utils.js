const { compile } = require("handlebars");
const mjml2html = require("mjml");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

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
		logoSrc: `${process.env.SERVER_URL}/static/images/logo-navigation.png`,
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

module.exports = {
	sendInvite,
	getTransport
};
