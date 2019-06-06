const fs = require("fs");
const { deleteFileFromUrl } = require("../utils");

module.exports = async ({ file, files }, res, next) => {
	if (res.statusCode >= 400) {
		if (file) {
			if (file.url) deleteFileFromUrl(file.url);
			else if (file.path) fs.promises.unlink(file.path);
		}
		if (files) {
			for (let file in Object.values(files)) {
				if (file.url) deleteFileFromUrl(file.url);
				else if (file.path) fs.promises.unlink(file.path);
			}
		}
	}
	next();
};
