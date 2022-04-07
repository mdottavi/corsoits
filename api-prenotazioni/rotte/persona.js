const { Router } = require('express');
const { listPersona, getPersonaById, insertPersona, updatePersona, updateCampiPersona, softDelete } = require('../db/dao/persona.dao');
const { checkPersonaExists } = require('../middlewares/persona-exists');
// const { routerPrenotazionePersona } = require('./prenotazione-persona');
const routerPersona = Router();

/**
 * lista delle persone
 */
routerPersona.get('/', async (req, res) => {
  const persone = await listPersona();
  return res.json(persone).send()
})
// app.get('/lista', () => {})

/**
 * ottiene una singola persona tramite id
 */
routerPersona.get('/:id_persona', checkPersonaExists, async (req, res) => {
  const persona = await getPersonaById(req.params.id_persona);
  return res.json(persona).send();
})

/**
 * Creiamo una persona
 */
routerPersona.post('/', async (req, res) => {
  const { nome, cognome, codice_fiscale, data_nascita } = req.body;
  const id_persona = await insertPersona(nome, cognome, codice_fiscale, data_nascita);
  return res.json({
    id_persona
  });
})

/**
 * Modifichiamo una persona
 */
routerPersona.put('/:id_persona', checkPersonaExists, async (req, res) => {
  const { nome, cognome, codice_fiscale, data_nascita } = req.body;
  const id_persona = req.params.id_persona;

  const ok = await updatePersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
  if (ok) {
    res.status(204).send()
  } else {
    res.status(500).json({
      message: 'oops'
    })
  }
})

/**
 * Modifichiamo alcuni campi di una persona
 */
routerPersona.patch('/:id_persona', checkPersonaExists, async (req, res) => {
  let { nome, cognome, codice_fiscale, data_nascita } = req.body;
  // let personaInput = req.body;
  const id_persona = req.params.id_persona;
  // const persona = await getPersonaById(id_persona);
  // if(nome === undefined) {
  //   nome = persona.nome;
  // }
  // if(cognome === undefined) {
  //   cognome = persona.cognome;
  // }
  // if(codice_fiscale === undefined) {
  //   codice_fiscale = persona.codice_fiscale;
  // }
  // if(data_nascita === undefined) {
  //   data_nascita = persona.data_nascita;
  // }
  // for(const key in persona) {
  //   if(personaInput[key] === undefined) {
  //     personaInput[key] = persona[key];
  //   }
  // }
  // const { nome, cognome, codice_fiscale, data_nascita } = personaInputs;
  // const ok = await updatePersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
  const ok = await updateCampiPersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
  if (ok) {
    res.status(204).send()
  } else {
    res.status(500).json({
      message: 'oops'
    })
  }
})
/**
 * Eliminiamo una persona
 */
routerPersona.delete('/:id_persona', checkPersonaExists, () => { })


routerPersona.delete('/:id_persona/soft', checkPersonaExists, async (req,res) => {
  await softDelete(req.params.id_persona)
  return res.status(204).send();
})

// routerPersona.use('/:id_persona/prenotazione', checkPersonaExists, routerPrenotazionePersona);
// routerPersona.use('/:id_persona/somministrazione', routerSomministrazionePersona);

module.exports = {
  routerPersona
};