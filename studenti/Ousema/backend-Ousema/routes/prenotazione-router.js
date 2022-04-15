const { Router } = require('express');
const routerPrenotazione = Router();
const PrenotazioneController = require ('../controllers/PrenotazioneController');


/**""
 * lista delle prenotazioni
 */
 routerPrenotazione.get('/', PrenotazioneController.lista);

module.exports = routerPrenotazione;