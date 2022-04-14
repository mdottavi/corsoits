const { Router } = require('express');
const routerPostazione = Router();
const PostazioneController = require ('../controllers/PostazioneController');


/**""
 * lista delle prenotazioni
 */
 routerPostazione.get('/', PostazioneController.lista);

module.exports = routerPostazione;