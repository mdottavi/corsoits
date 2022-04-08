require('dotenv').config();
const express = require('express')
const app = express()
const fs = require('fs')
const {listPersona} = require('./database/dao/personaDao');


app.get('/', function (req, res) {
    console.log("Server operativo!")
    res.write("ciao ")
    res.end("mondo")
  })


app.get('/rottaditest', function (req, res) {
  console.log("Test chiamato!!")
  res.write("Rotta di test....")
  res.end("Addio")
})

app.get('/persone', async (req, res) => {
  const persone = await listPersona();
  return res.json(persone).send()
})

app.listen(3000)