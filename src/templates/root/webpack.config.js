/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
require('source-map-support').install();
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.mjs', '.json', '.ts'],
    symlinks: false,
    cacheWithContext: false,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  optimization: {
    concatenateModules: false,
    minimize: false,
  },
  target: 'node',
  externals: [
    nodeExternals(),
    '@nestjs/*',
    '@nestjs/core',
    '@nestjs/config',
    '@nestjs/microservices',
    '@nestjs/websockets',
    '@nestjs/common',
    '@nestjs/platform-express',
    'cache-manager',
    'fastify-swagger',
    'class-transformer',
    'class-validator',
    'class-validator/*',
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '.serverless'),
            path.resolve(__dirname, '.webpack'),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [],
};
