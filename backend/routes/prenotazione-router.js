const { Router } = require('express');
const routerPrenotazione = Router();
const PrenotazioneController = require ('../controllers/PrenotazioneController');


/**""
 * lista delle prenotazioni
 */
 routerPrenotazione.get('/', PrenotazioneController.lista);
 routerPrenotazione.delete('/:id', PrenotazioneController.checkId, PrenotazioneController.elimina);
 routerPrenotazione.get('/:id', PrenotazioneController.checkId, PrenotazioneController.get);

module.exports = routerPrenotazione;