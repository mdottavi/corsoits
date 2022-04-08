const express = require('express');
const { json, urlencoded } = require('body-parser');
const { listaPersone,getPersonaById, insertPersona, updatePersona, softDelete, listaPersoneFiltratePerData } = require('./dao/persona.dao');
const { checkPersonaExists } = require('./middleware/persona-middle');
const { createConnection } = require('net');
require('dotenv').config();


const app = express()
app.use(json());
app.use(urlencoded({ extended: true }));

//GET lista delle persone
app.get("/persone", async (req,res) => {
    console.log('siamo nell handler get');
    const persone = await listaPersone();
    return res.json(persone).send()
})

//GET lista delle persone create in una certa data
app.get("/persone/:data_creazione", async (req,res) => {
  const persone = await listaPersoneFiltratePerData(req.params.data_creazione);
  return res.json(persone).send()
})

//GET Persona by ID
app.get('/persona/:id_persona', checkPersonaExists, async (req, res) => {
    const persona = await getPersonaById(req.params.id_persona);
    return res.json(persona).send();
  })

//POST Creazione persona
app.post('/persona', async(req,res)=> {
    const {nome,cognome,codice_fiscale,data_nascita} = req.body;
    const id_persona = await insertPersona(nome,cognome,codice_fiscale,data_nascita);
    return res.json({
        "ID Utente creato": id_persona
    })
})

//PUT MODIFICA CAMPI PERSONA
app.put('/persona/:id_persona', checkPersonaExists, async (req, res) => {
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const id_persona = req.params.id_persona;
  
    const ok = await updatePersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
    if (ok) {
      res.status(204).json({
          id_persona
    }).send()
    } else {
      res.status(500).json({
        message: 'oops'
      })
    }
  })

//DELETE Soft delete persona impostando il campo is_deleted=1
app.delete('/persona/:id_persona/soft', checkPersonaExists, async (req, res) => {
    await softDelete(req.params.id_persona)
    return res.status(204).send("Persona cancellata con successo");
  })

app.listen(3000);