require('dotenv').config();
// uguale a const de = require ('dotenv'); + de.config(); // in th esiste anche funzione parse
const express = require('express');
const { routerPersona } = require('./rotte/persona');
const { routerPrenotazionePersona } = require('./rotte/prenotazione-persona');
const { json, urlencoded } = require('body-parser');
const fileUpload = require('express-fileupload');

console.log (process.env.MYSQL_USER + ' ' + process.env.MYSQL_USER)
