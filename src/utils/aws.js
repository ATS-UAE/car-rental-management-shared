const aws = require("aws-sdk");
const { aws: awsConfig } = require("../config");
const { secretAccessKey, accessKeyId } = awsConfig;

const s3 = new aws.S3({ secretAccessKey, accessKeyId });

const s3GetKeyFromLocation = location => {
	try {
		return new URL(location).pathname.slice(1);
	} catch (e) {
		return null;
	}
};

module.exports = { s3, s3GetKeyFromLocation };
