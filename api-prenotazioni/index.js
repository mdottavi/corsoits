require('dotenv').config();
const express = require('express');
const { routerPersona } = require('./rotte/persona');
const { routerPrenotazionePersona } = require('./rotte/prenotazione-persona');
const { json, urlencoded } = require('body-parser');


const app = express()

app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/test', function (req, res) {
  res.json({
    messaggio: 'funziona tutto'
  }).send()
});

app.use('/persona', routerPersona);
app.use('/persona/:id_persona/prenotazione', routerPrenotazionePersona);
app.use('/prenotazione', routerPersona);


app.listen(3000);

