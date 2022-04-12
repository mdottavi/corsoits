const { hash } = require('bcrypt');
const { Router } = require('express');
const { insertUtente } = require('../db/dao/utente.dao');

const routerUtente = Router();

routerUtente.post('/', async (req, res) => {
  const { username, password, nome, cognome } = req.body;
  const hashedPassword = await hash(password, 10);
  const utenteId = await insertUtente(username, hashedPassword, nome, cognome);
  res.json({
    utenteId
  }).send()
});

module.exports = {
  routerUtente
};