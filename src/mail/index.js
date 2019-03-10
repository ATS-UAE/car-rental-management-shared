const nodemailer = require("nodemailer");
const { mail } = require("../config/");

let transporter = nodemailer.createTransport(mail);

var mailOptions = {
	from: "no-reply@atsuae.net",
	to: "ramilamparo@gmail.com",
	subject: "Sending Email using Node.js",
	text: "That was easy!",
	html: "<h1>Welcome</h1><p>That was easy!</p>"
};

transporter.sendMail(mailOptions, function(error, info) {
	if (error) {
		console.log(error);
	} else {
		console.log("Email sent: " + info.response);
	}
});

module.exports = transporter;
