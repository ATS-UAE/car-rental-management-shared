const config = require("../config");
const { s3 } = require("../utils/aws");

module.exports = async ({ file, files }, res, next) => {
	let keys = [];
	if (res.statusCode >= 400) {
		if (file) {
			if (file.key) {
				keys.push(s3GetKeyFromLocation(beforeUpdate[file.fieldname]));
			}
		}
		if (files) {
			for (let key in files) {
				for (let file of files[key]) {
					if (file.key) {
						keys.push(s3GetKeyFromLocation(beforeUpdate[file.fieldname]));
					}
				}
			}
		}
	}
	for (let key of keys) {
		await s3.deleteObject(
			{
				Bucket: config.aws.s3.bucket,
				Key: key
			},
			function(err, data) {
				if (err) console.log("Error cancelling upload:", err);
				else console.log("Deleted file because error.", data);
			}
		);
	}
	next();
};
