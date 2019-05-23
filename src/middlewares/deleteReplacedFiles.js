const { s3GetKeyFromLocation } = require("../utils/aws");
const config = require("../config");
const db = require("../models");
const { s3 } = require("../utils/aws");

module.exports = async ({ file, files, beforeUpdate }, res, next) => {
	let keys = [];
	if (beforeUpdate) {
		if (file) {
			if (file.key && beforeUpdate[file.fieldname]) {
				const fileUsed = await db.Vehicle.find({
					where: {
						[file.fieldname]: beforeUpdate[file.fieldname]
					}
				});
				if (!fileUsed) {
					keys.push(s3GetKeyFromLocation(beforeUpdate[file.fieldname]));
				}
			}
		}
		if (files) {
			for (let key in files) {
				for (let file in files[key]) {
					if (file && file.key && beforeUpdate[file.fieldname]) {
						const fileUsed = await db.Vehicle.find({
							where: {
								[file.fieldname]: beforeUpdate[file.fieldname]
							}
						});
						if (!fileUsed) {
							keys.push(s3GetKeyFromLocation(beforeUpdate[file.fieldname]));
						}
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
				else console.log("Deleted file because replaced.", data);
				next();
			}
		);
	}
	next();
};
