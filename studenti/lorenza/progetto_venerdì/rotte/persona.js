const express = require ('express');
const {Router} = require('express');

const {checkPersonaExist, checkAndGetPersonaById} = require('../mw/mw.persona.js')
const {listaPersone, createPersona,modificaPersona, aggiornaCampiPersona, cancellaPerId} = require('../db/dao/persona.dao.js')
const routerPersona = Router();
routerPersona.get ('/', async (req, res)=>{
    console.log("siamo nella get da cui otterremo una lista persone");
    const persone = await listaPersone()
    return res.json(persone).send();
})

routerPersona.get ('/:id_persona',checkAndGetPersonaById, async (req, res)=>{
    console.log("siamo nella get della persona attraverso l'ID");
    return res.json(req.persona).send();
})

routerPersona.post ('/',  async (req, res)=>{
    console.log("siamo nella post: creo una persona");
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const id_persona = await createPersona(nome, cognome, codice_fiscale, data_nascita )
    return res.json({
        "id_persona_inserita ":id_persona}).send(); 
    })

routerPersona.put ('/:id_persona', checkPersonaExist, async (req, res)=>{
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

routerPersona.patch ('/:id_persona', checkPersonaExist, async(req, res)=>{
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

routerPersona.delete('/:id_persona', checkPersonaExist, async (req, res) => { 
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

module.exports = {routerPersona}