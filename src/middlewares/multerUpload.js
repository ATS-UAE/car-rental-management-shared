const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { getStaticFilesPath } = require("../utils/");

const upload = (uploadPath, options) => {
	return multer({
		storage: multer.diskStorage({
			destination: function(req, file, cb) {
				const filePath = path.join(getStaticFilesPath(), uploadPath);
				fs.mkdir(filePath, { recursive: true }, err => {
					if (err) {
						console.error(err);
						cb(err, filePath);
					} else {
						cb(null, filePath);
					}
				});
			},
			filename: function(req, file, cb) {
				console.log(file);
				cb(null, `${Date.now()}-${file.originalname}`); //use Date.now() for unique file keys
			}
		}),
		limits: {
			fileSize: 10000000,
			...(options && options.limits)
		}
	});
};
module.exports = upload;
