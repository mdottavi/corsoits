require('dotenv').config();
const express = require('express')
const app = express()

app.get('/test', function (req, res) {
  res.json({
    messaggio: 'funziona tutto'
  }).send()
});

app.listen(3000);