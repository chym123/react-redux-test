const express = require('express');

const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mockMiddleware = require('./mock.middleware');
const webpackDevConfig = require('../config/webpack.conf.dev');
const webpack = require('webpack');

const app = express();
const port = process.env.port || 8888;

const compiler = webpack(webpackDevConfig);

app.use((req, res, next) => {
    if (req.path.match('dll')) {
        res.sendFile(path.resolve(__dirname, '../dist/dll/vendors.dll.js'));
        return;
    }
    next();
});
app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackDevConfig.output.publicPath,
    watchOptions: {
        ignored: /node_modules/,
    },
    stats: {
        colors: true,
        chunks: false
    }
}));
app.use(webpackHotMiddleware(compiler));
app.use(mockMiddleware);


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost${port === 80 ? '' : ':' + port}`);
});