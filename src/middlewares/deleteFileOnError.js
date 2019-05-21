const config = require("../config");
const { s3 } = require("../utils/aws");

module.exports = ({ file }, res, next) => {
	if (res.statusCode >= 400) {
		const { key: fileKey = null } = file;
		if (fileKey) {
			s3.deleteObject(
				{
					Bucket: config.aws.s3.bucket,
					Key: fileKey
				},
				function(err, data) {
					if (err) console.log("Error cancelling upload:", err);
					else console.log("Deleted file because error.", data);
					next();
				}
			);
		} else {
			next();
		}
	} else {
		next();
	}
};
