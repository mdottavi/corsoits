const { Router } = require('express');
const { checkPersonaExists } = require('../middlewares/persona-exists');

const routerPrenotazionePersona = Router();

routerPrenotazionePersona.use(checkPersonaExists);

// lista delle prenotazioni di una persona
app.get('/', () => {})

// Singola prenotazione di una persona
app.get('/:id_prenotazione', () => {})
// {{sampleHost}}/persona/:id_persona/prenotazione?luogo=pedaso

module.exports = {
  routerPrenotazionePersona
}