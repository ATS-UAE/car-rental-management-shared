const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	entry: "./src/server/index.ts",
	target: "node",
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
				options: {
					configFile: "src/server/tsconfig.json"
				},
				exclude: /node_modules/
			}
		]
	},
	optimization: {
		// Code minification breaks sequelize in production mode.
		minimize: false
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.ContextReplacementPlugin(
			/Sequelize(\\|\/)/,
			path.resolve(__dirname, "../src")
		)
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "../build/server")
	},
	// https://github.com/sequelize/sequelize/issues/7509
	externals: [nodeExternals()],
	node: {
		__dirname: true
	}
};
