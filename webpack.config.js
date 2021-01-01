const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',

	externalsPresets: {
		web: true,
	},
	externalsType: 'script',
	externals: {
		phaser: ['https://cdnjs.cloudflare.com/ajax/libs/phaser/3.50.1/phaser.min.js', 'Phaser'],
	},

	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/html/index.html',
		}),
		new CopyPlugin({
			patterns: [
				{ from: 'assets', to: 'assets' },
			],
		}),
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
};
