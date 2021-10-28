const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/app.js",
	devServer: {
		static: {
			directory: path.join(__dirname, "dist"),
		},
		compress: true,
		port: 9000,
	},
	devtool: "inline-source-map",
	module: {
		rules: [
			{
				test: /\.mp3$/,
				loader: "file-loader",
			},
			{
				test: /\.(glsl|vs|fs|vert|frag)$/,
				exclude: /node_modules/,
				use: "webpack-glsl-loader",
			},
		],
	},
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, "dist"),
	},
};
