require('dotenv').config();
const express = require('express');
const { routerPersona } = require('./rotte/persona');
const { routerPrenotazionePersona } = require('./rotte/prenotazione-persona');

const app = express()

app.get('/test', function (req, res) {
  res.json({
    messaggio: 'funziona tutto'
  }).send()
});

app.use('/persona', routerPersona);
app.use('/persona/:id_persona/prenotazione', routerPrenotazionePersona);
app.use('/prenotazione', routerPersona);


app.listen(3000);

