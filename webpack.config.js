const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',

	externalsPresets: {
		web: true,
	},
	externalsType: 'script',
	externals: {
		phaser: ['https://cdn.jsdelivr.net/npm/phaser@3.24.1/dist/phaser.js', 'Phaser'],
	},

	output: {
		filename: 'main.[].js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/html/index.html',
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000,
		hot: true,
	},
};
