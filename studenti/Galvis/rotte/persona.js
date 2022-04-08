const express = require ('express');
const { listPersona } = require('../db/dao/persona.dao');
const routerPersona = express.Router();

routerPersona.get('/', async (req, res) => {
    const persone = await listPersona();
    return res.json(persone).send()
})


module.exports = {
    routerPersona
}