require('dotenv').config();
const express = require('express');
const { routerPersona } = require('./rotte/persona');
const { routerPrenotazionePersona } = require('./rotte/prenotazione-persona');
const { json, urlencoded } = require('body-parser');
const fileUpload = require('express-fileupload');


const app = express()

app.use(express.static('files'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/test', function (req, res) {
  res.json({
    messaggio: 'funziona tutto'
  }).send()
});

app.use('/persona', routerPersona);
app.use('/persona/:id_persona/prenotazione', routerPrenotazionePersona);
app.use('/prenotazione', routerPersona);


app.listen(3000);

