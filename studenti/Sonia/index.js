require('dotenv').config();
const express = require('express');
const { json, urencoded } = require('body-parser');
const { myRouterPersona } = require('./routers/persona');

const app = express();
const port = 3000;

app.use(json());
app.use('/', myRouterPersona);

app.get('/test', function (req, res) {
    res.json({
      messaggio: 'funziona tutto'
    }).send()
  });
  

app.listen(port);