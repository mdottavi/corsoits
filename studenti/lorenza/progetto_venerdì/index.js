require('dotenv').config();
const {checkPersonaExist, checkAndGetPersonaById} = require('./mw/mw.persona.js')
const {getPersonaById, personaExistById, listaPersone, createPersona,modificaPersona, aggiornaCampiPersona, cancellaPerId} = require('./db/dao/persona.dao.js')
const mysql2 = require ('mysql2/promise')
const express = require('express');
const { json, urlencoded } = require('body-parser');
//const { routerPersona } = require('./rotte/persona');
const app = express()

app.use(express.static('files'));
app.use(json());
app.use(urlencoded({ extended: true }));


app.get ('/persona/', async (req, res)=>{
    console.log("siamo nella get da cui otterremo una lista persone");
    const persone = await listaPersone()
    return res.json(persone).send();
})

app.get ('/persona/:id_persona',checkAndGetPersonaById, async (req, res)=>{
    console.log("siamo nella get della persona attraverso l'ID");
    return res.json(req.persona).send();
})

app.post ('/persona/',  async (req, res)=>{
    console.log("siamo nella post: creo una persona");
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const id_persona = await createPersona(nome, cognome, codice_fiscale, data_nascita )
    return res.json({
        "id_persona_inserita ":id_persona}).send(); 
    })

app.put ('/persona/:id_persona', checkPersonaExist, async (req, res)=>{
    console.log("siamo nella put: modifico un record persona");
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const id_persona = req.params.id_persona;
    const statoRichiesta = await modificaPersona(id_persona, nome, cognome, codice_fiscale, data_nascita )
    if(!statoRichiesta){
        return res.status(500).json({
            message: "c'è stato un problema"
        }).send();
    }
    res.status(204).send();; 
    })

app.patch ('/persona/:id_persona', checkPersonaExist, async(req, res)=>{
    let { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const id_persona = req.params.id_persona;
    const ok = await aggiornaCampiPersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
    if (ok) {
      return res.status(204).send()
    } else {
      return res.status(500).json({
        message: "c'è stato un errore"
      });
    }
})

app.delete('/persona/:id_persona', checkPersonaExist, async (req, res) => { 
    const id_persona = req.params.id_persona;
    const cancellato = await cancellaPerId(id_persona);
    if(cancellato){
    return res.status(200).json({
      message: 'il record è stato eliminato'
    }).send()
    }else{
       return res.status(500).send();
    }
     
  })

//app.use('/persona', routerPersona);





app.listen(3000);
