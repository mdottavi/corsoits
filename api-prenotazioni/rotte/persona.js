const { Router } = require('express');
const { checkPersonaExists } = require('../middlewares/persona-exists');
// const { routerPrenotazionePersona } = require('./prenotazione-persona');
const routerPersona = Router();

/**
 * lista delle persone
 */
routerPersona.get('/', () => { })
// app.get('/lista', () => {})

/**
 * ottiene una singola persona tramite id
 */
routerPersona.get('/:id_persona', checkPersonaExists, () => { })

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