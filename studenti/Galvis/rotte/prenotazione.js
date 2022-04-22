const express = require('express');
const { listaPrenotazione, insertPrenotazione } = require('../db/dao/prenotazione.dao');
const { checkAndGetPersona } = require('../middlewares/persona-exists');
const { checkPrenotazioneExists, checkAndGetPrenotazione } = require('../middlewares/prenotazione-exist');
const routerPrenotazione = express.Router();
const routerPrenotazioneId = express.Router();

routerPrenotazione
.route('/')
.get(async (req, res) => {
    const persone = await listaPrenotazione();
    return res.json(persone).send()
})
.post(async (req, res) =>{
    const {persona_id,somministrazione_id,data_ora,luogo} = req.body;
    const id_prenotazione = await insertPrenotazione(persona_id,somministrazione_id,data_ora,luogo);
    return res.json({
        "L'id della prenotazione è stato creato": id_prenotazione
    })
})

routerPrenotazioneId
.route('/:id_prenotazione')
.get(checkAndGetPrenotazione, async (req, res)  => {
    return res.json(req.prenotazione).send();
})
.put(checkPrenotazioneExists, async(req, res) => {
    
})