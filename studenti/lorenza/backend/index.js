
const express = require('express');
const morgan = require('morgan');

require('dotenv').config();
const { json, urlencoded } = require('body-parser');
const fileUpload = require('express-fileupload');
const ConnectRouter = require ('./routes/main-router');

const { logger } = require('./common/logging');

console.log("NODE_ENV=" + process.env.NODE_ENV);

console.log("Starting Application...") ;


const app = express()

app.use(express.static('files'));
app.use(express.static('resources'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());
app.use(morgan('combined', { "stream": logger.httpStream }));
app.set('view engine', 'ejs');
ConnectRouter(app);

app.listen(9000);