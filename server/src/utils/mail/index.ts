import fs from "fs";
import path from "path";
import { compile } from "handlebars";
import mjml2html from "mjml";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import moment from "moment";
import StaticMaps from "staticmaps";
import config from "../../config";
import { getStaticFilesPath, makeDirectoryIfNotExist } from "..";

const { mail, secretKey } = config;

const getTemplate = (fileName: string): string =>
	fs.readFileSync(
		path.resolve(`${__dirname}/templates/${fileName}.mjml`),
		"utf8"
	);

const getTransport = () => nodemailer.createTransport(mail);

const compileTemplate = (mjml: string, context: any) => compile(mjml)(context);

export const sendPasswordResetToken = ({
	email,
	url
}: {
	email: string;
	url: string;
}): any => {
	// Send email invite
	let token = jwt.sign({ email, passwordReset: true }, secretKey, {
		expiresIn: "1h"
	});
	return getTransport().sendMail({
		from: "no-reply@atsuae.net",
		to: email,
		subject: "Password Reset",
		html: `<h1>Hello</h1><a href="${url}?token=${token}">Click here to reset password!</a>`
	});
};

export const sendInvite = ({
	email,
	clientId
}: {
	email: string;
	clientId: number;
}): Promise<string> => {
	const transporter = getTransport();
	let token = jwt.sign({ email, clientId }, secretKey, { expiresIn: "7d" });
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
};

export const sendInvoice = ({
	email,
	amount,
	customerName,
	vehicleName,
	from,
	to,
	bookingId
}) => {
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
};

export const sendBookingConfirmation = async ({
	email,
	customerName,
	vehicleName,
	from,
	to,
	bookingId,
	parkingLocation,
	lat,
	lng,
	address
}: {
	email: string;
	customerName: string;
	vehicleName: string;
	from: number;
	to: number;
	bookingId: number;
	parkingLocation: string;
	lat: number;
	lng: number;
	address: string;
}): Promise<string> => {
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
		mapURL: `cid:${fileName}`,
		lat,
		lng,
		parkingLocation,
		address
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
