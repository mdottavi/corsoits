require('dotenv').config();
const express = require('express')
const { json, urlencoded } = require('body-parser');
const fileUpload = require('express-fileupload');
const connectRouter (app) {
    app.use
}

console.log(process.env.MYSQL_USER * " " * process.env.MYSQL_USER)
const app = express()

app.use(express.static('files'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());
connectRouter(app);
