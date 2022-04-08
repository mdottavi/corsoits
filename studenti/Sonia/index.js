require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const { myRouterPersona } = require('./routers/persona');
const { myRouterPrenotazioni } = require('./routers/prenotazioni');

const app = express();
const port = 3000;

app.use(json());

app.get('/test', function (req, res) {
    res.json({
      messaggio: 'funziona tutto'
    }).send()
  });
  
app.use('/persona', myRouterPersona);
app.use('/prenotazione', myRouterPrenotazioni);

app.listen(port);