const Router = require('express');
const { listaPersone, personById, insertPerson, updatePerson, deletePerson } = require('../database/dao/persona.dao');
const { checkPerson } = require('../middlewares/check-person');

const myRouterPersona = Router();

// get all people
myRouterPersona.get('/', async (req, res) => {
  try {
    const persone = await listaPersone();
    return res.json(persone).send();
  } catch (e) {
    res.json({
      message: "something went wrong"
    });
  }
});

// get one person by id
myRouterPersona.get('/:person_id', checkPerson, async (req, res) => {
  try {
    const person = await personById(req.params.person_id);
    return res.json(req.person).send();
  } catch (e) {
    res.json({
      message: "something went wrong"
    });
  }
});

// insert a new person
myRouterPersona.post('/', async (req, res) => {
  try {
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const person_id = await insertPerson(nome, cognome, codice_fiscale, data_nascita);
    return res.json({
      person_id
    });
  } catch (e) {
    return res.status(500).json({
      errore: e.message
    })
  }
});

// modify an existing person
myRouterPersona.put('/:person_id', checkPerson, async (req, res) => {
  try {
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const person_id = req.params.person_id;
    const updated = await updatePerson(person_id, nome, cognome, codice_fiscale, data_nascita);
    res.json({
      up,
      message: "person succesfully updated"
    });
} catch {
  return res.status(500).json({
    errore: e.message
  })
}
});

// modify some values of an existing person
myRouterPersona.patch('/:person_id', checkPerson, async (req, res) => {
  try {
    let { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const person_id = req.params.person_id;
    const person = personById(person_id);
    if (nome === undefined) {
      nome = person.nome;
    }
    if (cognome === undefined) {
      cognome = person.cognome;
    }
    if (codice_fiscale === undefined) {
      codice_fiscale = person.codice_fiscale;
    }
    if (data_nascita === undefined) {
      data_nascita = person.data_nascita;
    }

    const updated = await updatePerson(person_id, nome, cognome, codice_fiscale, data_nascita);
    res.json({
      updated,
      message: "person succesfully updated"
    });
} catch {
  return res.status(500).json({
    errore: e.message
  })
}
});

// delete a specific person
myRouterPersona.delete('/:person_id', checkPerson, async (req, res) => {
  try {
    const person = await deletePerson(req.params.person_id);
    return res.json({
      person,
      message: "person succesfully deleted"
      }).send();
  } catch {
    return res.status(500).json({
      errore: e.message
      });
  }
});

module.exports = {
    myRouterPersona
}
