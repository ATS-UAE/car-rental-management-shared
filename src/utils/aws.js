const aws = require("aws-sdk");
const { aws: awsConfig } = require("../config");
const { secretAccessKey, accessKeyId } = awsConfig;

const s3 = new aws.S3({ secretAccessKey, accessKeyId });

module.exports = { s3 };
