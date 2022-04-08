require('dotenv').config();
const {checkPersonaExist, checkAndGetPersonaById} = require('./mw/mw.persona.js')
const {getPersonaById, personaExistById, listaPersone, createPersona,modificaPersona, aggiornaCampiPersona, cancellaPerId} = require('./db/dao/persona.dao.js')
const mysql2 = require ('mysql2/promise')
const express = require('express');
const { json, urlencoded } = require('body-parser');
const { routerPersona } = require('./rotte/persona');
const app = express()

app.use(express.static('files'));
app.use(json());
app.use(urlencoded({ extended: true }));


app.use('/persona', routerPersona);





app.listen(3000);
