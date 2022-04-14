
const express = require('express');
const morgan = require('morgan');

require('dotenv').config();
const { json, urlencoded } = require('body-parser');
const fileUpload = require('express-fileupload');
const ConnectRouter = require ('./routes/main-router');
const config =require ("config");
const { logger } = require('./common/logging');

console.log(process.env.MYSQL_USER + " " + process.env.MYSQL_PASSWORD);

console.log("NODE_ENV=" + process.env.NODE_ENV);

let mrpp=config.get("max-results-per-page");
console.log("max-results-per-page:" + mrpp);


logger.silly("Starting Application...") ;
logger.debug("Starting Application...") ;
logger.verbose("Starting Application...") ;
logger.http("Starting Application...") ;
logger.info("Starting Application...") ;
logger.warn("Starting Application...") ;
logger.error("Starting Application...", fileUpload ) ;

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