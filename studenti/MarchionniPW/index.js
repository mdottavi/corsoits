require('dotenv').config();
const express = require('express')
const app = express()
const fs = require('fs')
const {listPersona} = require('./database/dao/personaDao');
const { checkPersonaExists, checkAndGetPersona } = require('./middle/check');
const { getConnection } = require('./database/connessione');
const { stringify } = require('querystring');

app.get('/', function (req, res) {
    console.log("Server operativo!")
    res.write("ciao ")
    res.end("mondo")
  })

// rotta di test secondaria
app.get('/rottaditest', function (req, res) {
  console.log("Test chiamato!!")
  res.write("Rotta di test....")
  res.end("Addio")
})


// prova per il Get di lista persone
app.get('/persone', async (req, res) => {
  const persone = await listPersona();
  return res.json(persone).send()
})

// prova per il get di una persona da ID
// app.get('/persona/:id_persona', checkAndGetPersona, async (req, res) => {
//   return res.json(req.persona).send();
// })
// prova per il get di un singolo componente 
app.get('/persona/:id_persona/:componente', checkAndGetPersona, async (req, res) => {
  let compo = req.params.componente;
  console.log(compo);
  console.log(res.json(req.persona[compo]));
  return res.json(req.persona.compo).write();
})



// prova per il get di una persona da ID
app.get('/prenotazione/:id_prenotazione', async (req, res) => {
  const connection = await getConnection();
  const query = `SELECT * FROM prenotazione WHERE id = ${req.params.id_prenotazione}` ;
  console.log(query)
  const [rows] = await connection.query(query, [req.params.id_prenotazione]);
  console.log(rows)
  const result = rows[0]
  return res.json(result).send();
})

// prova per il get di una prenotazione da ID, dato specifico
app.get('/prenotazione/:id_prenotazione/:dato', async (req, res) => {
  const connection = await getConnection();
  const query = `SELECT * FROM prenotazione WHERE id = ${req.params.id_prenotazione}` ;
  console.log(query)
  const [rows] = await connection.query(query, [req.params.id_prenotazione]);
  console.log(rows)
  const result = rows[0]
  console.log(result)
  const dato = req.params.dato
  console.log(dato)
  const final = result.dato
  console.log(result.dato)
  console.log(result.luogo)
  return res.json(result.dato).send();
})

app.delete('/prenotazione/:id_prenotazione', async (req, res) => {
  const connection = await getConnection();
  const query = `DELETE FROM prenotazione WHERE id = ${req.params.id_prenotazione}` ;
  const deleteFromID = await connection.query(query);
  console.log("debug: " + deleteFromID);
  return res.json(deleteFromID).send()
})




app.listen(3000)