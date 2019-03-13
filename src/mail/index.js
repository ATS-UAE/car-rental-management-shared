const nodemailer = require("nodemailer");
const { mail } = require("../config/");
const getTransport = () => nodemailer.createTransport(mail);

module.exports = getTransport;
