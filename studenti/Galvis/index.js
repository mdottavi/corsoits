require('dotenv').config();
const express = require('express');
const { routerPersona } = require('./rotte/persona');
const app = express();
const { json } = require('body-parser');

app.use(json());

app.get('/test', (req, res) => {
    console.log("Here")
    res.json({
        messaggio: 'funziona tutto'
      }).send()
});

app.use('/persona', routerPersona);

app.listen(3000);