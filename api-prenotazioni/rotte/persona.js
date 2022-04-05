const { Router } = require('express');
const { listPersona, getPersonaById } = require('../db/dao/persona.dao');
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
routerPersona.post('/', () => { })

/**
 * Modifichiamo una persona
 */
routerPersona.put('/:id_persona', checkPersonaExists, () => { })

/**
 * Modifichiamo alcuni campi di una persona
 */
routerPersona.patch('/:id_persona', checkPersonaExists, () => { })

/**
 * Eliminiamo una persona
 */
routerPersona.delete('/:id_persona', checkPersonaExists, () => { })

// routerPersona.use('/:id_persona/prenotazione', checkPersonaExists, routerPrenotazionePersona);
// routerPersona.use('/:id_persona/somministrazione', routerSomministrazionePersona);

module.exports = {
  routerPersona
};