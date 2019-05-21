const { s3GetKeyFromLocation } = require("../utils/aws");
const config = require("../config");
const db = require("../models");
const { s3 } = require("../utils/aws");

module.exports = async ({ file, body }, res, next) => {
	if (res.statusCode >= 400) {
		const { key: fileKey = null } = file;
		if (fileKey && body.vehicleImageSrc) {
			const fileUsed = await db.Vehicle.find({
				where: {
					vehicleImageSrc: body.vehicleImageSrc
				}
			});
			if (!fileUsed) {
				s3.deleteObject(
					{
						Bucket: config.aws.s3.bucket,
						Key: s3GetKeyFromLocation(body.vehicleImageSrc)
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
	} else {
		next();
	}
};
