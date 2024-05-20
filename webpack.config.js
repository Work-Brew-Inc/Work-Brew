const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const dotenv = require('dotenv');
dotenv();

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: path.resolve('./App/index.js'),
	mode: isDev ? 'development' : 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: isDev ? 'bundle.js' : 'bundle.[contenthash].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					},
				},
			},
			{
				test: /\.css$/,
				use: [
					isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader'
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
			filename: 'index.html',
			minify: isDev ? false : {
				removeComments: true,
				collapseWhitespace: true,
			},
		}),
		new CleanWebpackPlugin(),
		!isDev && new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		isDev && new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
		}),
		new ESLintPlugin({
			extensions: ['js', 'jsx'],
		}),
	].filter(Boolean),
	resolve: {
		extensions: ['.js', '.jsx', '.json'],
	},
	optimization: {
		minimize: !isDev,
		minimizer: !isDev ? [
			new TerserPlugin({
				terserOptions: {
					compress: {
						drop_console: true,
					},
				},
			}),
			new CssMinimizerPlugin(),
		] : [],
		splitChunks: {
			chunks: 'all',
		},
		runtimeChunk: {
			name: 'runtime',
		},
	},
	performance: {
		hints: 'warning', // "error" or false are valid too
		maxEntrypointSize: 400000, // in bytes, default is 250000 (250kb)
		maxAssetSize: 100000, // in bytes
	},
	devServer: isDev ? {
		contentBase: path.resolve(__dirname, 'dist'),
		hot: true,
		historyApiFallback: true,
		open: true,
		port: 3000,
	} : undefined,
	devtool: isDev ? 'inline-source-map' : 'source-map',
};