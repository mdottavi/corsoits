const express = require ('express');
const { listPersona, insertPersona, getPersonaById, updatePersona, updateCampiPersona, deleteById } = require('../db/dao/persona.dao');
const { checkPersonaExists, checkAndGetPersona } = require('../middlewares/persona-exists');
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
    return res.json(req.persona).send();
})
.put( checkPersonaExists, async (req, res) => {
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const id_persona = req.params.id_persona;
    
    const ok = await updatePersona ( id_persona, nome, cognome, codice_fiscale, data_nascita);
    if (ok) {
        res.status(204).send()
    } else {
        res.status(500).json({
            messagge: 'Si è riscontrato un errore non è possibile modificare la persona'
        })
    }
})
.patch( checkPersonaExists, async (req, res) => {
    let { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const id_persona = req.params.id_persona;

    const ok = await updateCampiPersona (id_persona, nome, cognome, codice_fiscale, data_nascita);
    if (ok) {
        res.status(204).send()
    } else {
        res.status(500).json({
            messagge: 'Si è riscontrato un errore non è possibile modificare la persona'
        })
    }
})
.delete( checkPersonaExists, async (req,res) => {
    /*Presumo l'id utilizzato anteriomente che viene cancellato rimane perchè created_at e update_at sono dati che rimangono nel db*/
        const id_persona = req.params.id_persona;
        const ok = await deleteById(id_persona);
        if (ok) {
            res.status(204).send()
        } else {
            res.status(500).json({
                messagge: 'Si è riscontrato un errore non è possibile cancellare questa persona'
            })
        }
})

module.exports = {
    routerPersona,
    routerPersonaId
}