const { Router } = require('express');
const routerPrenotazione = Router();
const PrenotazioneController = require ('../controllers/PrenotazioneController');


/**""
 * lista delle prenotazioni
 */
 routerPrenotazione.get('/', PrenotazioneController.lista);
 routerPrenotazione.delete('/:id_prenotazione', PrenotazioneController.elimina);
 routerPrenotazione.get('/:id', PrenotazioneController.get);

module.exports = routerPrenotazione;