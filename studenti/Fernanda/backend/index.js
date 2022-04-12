
const express = require('express');

require('dotenv').config();
const { json, urlencoded } = require('body-parser');
const fileUpload = require('express-fileupload');
const ConnectRouter = require ('./routes/main-router');

console.log(process.env.MYSQL_USER + " " + process.env.MYSQL_PASSWORD);

const app = express()

app.use(express.static('files'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());

app.set('view engine', 'ejs');
ConnectRouter(app);

app.listen(9000);