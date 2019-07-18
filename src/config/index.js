//use prod config in if in production, otherwise use dev config.
if (process.env.NODE_ENV === "production") {
	module.exports = require("./production");
} else {
	module.exports = require("./development");
}
