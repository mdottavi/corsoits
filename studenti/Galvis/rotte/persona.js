const express = require ('express');
const { listPersona, insertPersona } = require('../db/dao/persona.dao');
const routerPersona = express.Router();

routerPersona.get('/', async (req, res) => {
    const persone = await listPersona();
    return res.json(persone).send()
})
.post('/', async (req, res) => {
    const { nome, cognome, codice_fiscale, data_nascita} = req.body;
    const id_persona = await insertPersona(nome, cognome, codice_fiscale, data_nascita);
    return res.json({
        id_persona
    })
})


module.exports = {
    routerPersona
}