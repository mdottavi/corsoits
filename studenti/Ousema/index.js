require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const { routerPersona } = require('./router/router-persona');
const { routerPrenotazione } = require('./router/router-prenotazione');


const app = express()
app.use(json());
app.use(urlencoded({ extended: true }));

//GET lista delle persone
app.use('/persona', routerPersona)
app.use('/prenotazione', routerPrenotazione)


app.listen(3000);