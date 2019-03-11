const nodemailer = require("nodemailer");
const { mail } = require("../config/");

let transporter = nodemailer.createTransport(mail);

module.exports = transporter;
