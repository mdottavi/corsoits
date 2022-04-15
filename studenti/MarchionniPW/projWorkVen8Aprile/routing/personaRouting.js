const express = require('express')
const router = express.Router()
const {listPersona} = require('../database/dao/personaDao');
const { checkPersonaExists, checkAndGetPersona } = require('../middle/check');

// prova per il Get di lista persone
router.get('/lista', async (req, res) => {
    const persone = await listPersona();
    return res.json(persone).send()
})


// prova per il Get di una singola persona
router.get('/:id_persona', checkAndGetPersona, async (req, res) => {
    return res.json(req.persona).send()
})

// prova per il Get di una singola key del Json
// router.get('/:id_persona/:componente', checkAndGetPersona, async (req, res) => {
//     let compo = req.params.componente;
//     return res.json(req.persona[compo]).send()
// })
  

module.exports = router
