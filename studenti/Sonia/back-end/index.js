require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const fileUpload = require('express-fileupload');
const { getConnection } = require('./db/connection');
const { ConnectRouter } = require('./routes/main-router');
const { Persona } = require('./model/persona');

const app = express();
const port = 3000;

app.use(express.static('files'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());

app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);
ConnectRouter(app);

app.get ('/test', (req, res) => {
    return res.json ({
        message: 'Hello World!'
    }).send();
});

app.listen(port);