const multer = require("multer");
const multerS3 = require("multer-s3");
const { aws } = require("../config");
const { s3 } = require("../utils/aws");

const upload = path =>
	multer({
		storage: multerS3({
			s3: s3,
			bucket: aws.s3.bucket,
			acl: "public-read",
			key: function(req, file, cb) {
				console.log(file);
				cb(
					null,
					`${process.env.NODE_ENV}/${path}/${Date.now()}-${file.originalname}`
				); //use Date.now() for unique file keys
			}
		})
	});
module.exports = upload;
