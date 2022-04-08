const express = require ('express');
const { listPersona, insertPersona, getPersonaById } = require('../db/dao/persona.dao');
const { checkPersonaExist, checkAndGetPersona } = require('../middlewares/persona-exists');
const routerPersona = express.Router();
const routerPersonaId = express.Router();

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

routerPersonaId
.route('/:id_persona')
.get( checkAndGetPersona ,async (req,res) => {
    const persona = await getPersonaById(req.params.id_persona);
    return res.json(persona).send();
})

module.exports = {
    routerPersona,
    routerPersonaId
}