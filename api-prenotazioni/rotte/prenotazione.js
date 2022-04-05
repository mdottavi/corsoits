const { Router } = require('express');

const routerPrenotazione = Router();

// Ousema lista prenotazioni
app.get('/prenotazione', () => {});
// {{sampleHost}}/prenotazione?id_persona=15132&luogo=pedaso
// Ousema singola prenotazione
app.get('/prenotazione/:id_prenotazione', () => {});

module.exports = {
  routerPrenotazione
}