const Router = require('express');
const { listaPersone, personById, insertPerson } = require('../database/dao/persona.dao');

const myRouterPersona = Router();

// get all people
myRouterPersona.get('/', async (req, res) => {
    const persone = await listaPersone();
    return res.json(persone).send();
});

// get one person by id
myRouterPersona.get('/:person_id', async (req, res) => {
  const person = await personById(req.params.person_id);
  return res.json(req.person).send();
});

// insert a new person
myRouterPersona.post('/', async (req, res) => {
  const { nome, cognome, codice_fiscale, data_nascita } = req.body;
  const person_id = await insertPerson(nome, cognome, codice_fiscale, data_nascita);
  return res.json({
    person_id
  });
});

module.exports = {
    myRouterPersona
}
