const path = require('path');
const express = require('express');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
    const webpackConfig = require('../webpack.config.js');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
    }));

    app.use(require('webpack-hot-middleware')(compiler));

    app.use(express.static('../dist'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/static/index.html'));
    });
} else {
    // Serve static files from 'dist' directory in production
    app.use(express.static(path.resolve(__dirname, '../dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
