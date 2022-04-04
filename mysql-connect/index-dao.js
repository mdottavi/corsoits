require('dotenv').config();
const express = require('express')
const { listaPersone } = require('./persona.dao');
const app = express()

app.get('/test', async function (req, res) {
  console.log('siamo nell handler test');
  try {
    const results = await listaPersone();
    const risultati_puliti = results.map(persona => {
      persona.denominazione = persona.nome + ' ' +  persona.cognome;
      return persona;
    })
    console.log(risultati_puliti); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
    res.json(risultati_puliti).send();

    console.log('abbiamo richiesto la query');
  } catch (err) {
    res.status(500).json({
      messaggio: "C'è stato un errore"
    })
  }
  // }).send();
  // console.log('ho inviatola risposta');
});

app.listen(3000);