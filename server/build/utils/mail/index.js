"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const handlebars_1 = require("handlebars");
const mjml_1 = __importDefault(require("mjml"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const staticmaps_1 = __importDefault(require("staticmaps"));
const config_1 = __importDefault(require("../../config"));
const helpers_1 = require("../../utils/helpers");
const { mail, secretKey } = config_1.default;
const getTemplate = (fileName) => fs_1.default.readFileSync(`${__dirname}/templates/${fileName}.mjml`, "utf8");
const getTransport = () => nodemailer_1.default.createTransport(mail);
const compileTemplate = (mjml, context) => handlebars_1.compile(mjml)(context);
exports.sendPasswordResetToken = ({ email, url }) => {
    // Send email invite
    let token = jsonwebtoken_1.default.sign({ email, passwordReset: true }, secretKey, {
        expiresIn: "1h"
    });
    return getTransport().sendMail({
        from: "no-reply@atsuae.net",
        to: email,
        subject: "Password Reset",
        html: `<h1>Hello</h1><a href="${url}?token=${token}">Click here to reset password!</a>`
    });
};
exports.sendInvite = ({ email, clientId }) => {
    const transporter = getTransport();
    let token = jsonwebtoken_1.default.sign({ email, clientId }, secretKey, { expiresIn: "7d" });
    const compiled = compileTemplate(getTemplate("invite"), {
        company: "LeasePlan",
        contactEmail: "support@atsuae.net",
        logoSrc: `${process.env.SERVER_URL}/static/images/mail-header.png`,
        signUpLink: `${process.env.CLIENT_URL}/signup?token=${token}`
    });
    const template = mjml_1.default(compiled);
    const mainOptions = {
        from: "LeasePlan Rentals <no-reply@atsuae.net>",
        to: email,
        subject: "You are invited to LeasePlan Car Booking!",
        html: template.html
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                reject(err);
            }
            else {
                resolve(info.response);
            }
        });
    });
};
exports.sendInvoice = ({ email, amount, customerName, vehicleName, from, to, bookingId }) => {
    const transporter = getTransport();
    const compiled = compileTemplate(getTemplate("invoice"), {
        company: "LeasePlan",
        customerName,
        vehicleName,
        from: moment_1.default(from, "X").format("LLL"),
        to: moment_1.default(to, "X").format("LLL"),
        contactEmail: "support@atsuae.net",
        logoSrc: `${process.env.SERVER_URL}/static/images/mail-header.png`,
        amount,
        bookingId
    });
    const template = mjml_1.default(compiled);
    const mainOptions = {
        from: "LeasePlan Rentals <no-reply@atsuae.net>",
        to: email,
        subject: "Your car booking receipt is here!",
        html: template.html
    };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
                reject(err);
            }
            else {
                resolve(info.response);
            }
        });
    });
};
exports.sendBookingConfirmation = async ({ email, customerName, vehicleName, from, to, bookingId, parkingLocation, lat, lng, address }) => {
    const transporter = getTransport();
    const options = {
        width: 1200,
        height: 800,
        tileUrl: "https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png?lang=en"
    };
    const map = new staticmaps_1.default(options);
    const marker = {
        img: path_1.default.join(__dirname, "../public/images/LocationMarker.png"),
        coord: [lng, lat],
        offsetX: 50,
        offsetY: 100,
        width: 100,
        height: 100
    };
    map.addMarker(marker, { zoom: 10 });
    await map.render([lng, lat]);
    const filePath = path_1.default.join(helpers_1.getStaticFilesPath(), "/maps");
    const fileName = `${Date.now()}.png`;
    const fileSavePath = path_1.default.join(filePath, fileName);
    await helpers_1.makeDirectoryIfNotExist(filePath);
    await map.image.save(fileSavePath);
    const compiled = compileTemplate(getTemplate("confirmBooking"), {
        company: "LeasePlan",
        contactEmail: "support@atsuae.net",
        logoSrc: `${process.env.SERVER_URL}/static/images/mail-header.png`,
        bookingId,
        from: moment_1.default(from, "X").format("LLL"),
        to: moment_1.default(to, "X").format("LLL"),
        vehicleName,
        customerName,
        mapURL: `cid:${fileName}`,
        lat,
        lng,
        parkingLocation,
        address
    });
    const template = mjml_1.default(compiled);
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
        transporter.sendMail(mainOptions, function (err, info) {
            fs_1.default.promises.unlink(fileSavePath);
            console.log(err, info);
            if (err) {
                return reject(err);
            }
            else {
                return resolve(info.response);
            }
        });
    });
};
