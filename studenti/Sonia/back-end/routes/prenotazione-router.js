const { Router } = require('express');
const { PrenotazioneController } = require('../controllers/PrenotazioneController');

const routerPrenotazione = Router();

/**
 * lista delle persone
 */
 routerPrenotazione.get('/crea', (req, res) => {
  return res.render('creaprenotazione', {});
});
routerPrenotazione.get('/', PrenotazioneController.listPrenotazione);
routerPrenotazione.post('/', PrenotazioneController.crea);
routerPrenotazione.get('/crea', PrenotazioneController.bakeCreationData);
routerPrenotazione.delete('/:id', PrenotazioneController.checkId, PrenotazioneController.elimina);
routerPrenotazione.get('/:id', PrenotazioneController.checkId, PrenotazioneController.get);

// routerPrenotazione.put('/:id', PrenotazioneController.checkId, PrenotazioneController.edit);
// routerPrenotazione.get('/:id/mod', PrenotazioneController.checkId, PrenotazioneController.bakeCreationData);

module.exports = {
  routerPrenotazione
}