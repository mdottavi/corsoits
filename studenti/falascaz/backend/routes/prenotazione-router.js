const { Router } = require('express');
const routerPrenotazione = Router();
const PrenotazioneController = require ('../controllers/PrenotazioneController');

 routerPrenotazione.get('/', PrenotazioneController.lista);
 routerPrenotazione.post('/', PrenotazioneController.crea);
 routerPrenotazione.get('/crea', PrenotazioneController.bakeCreationUpdateData );
 routerPrenotazione.delete('/:id', PrenotazioneController.checkId, PrenotazioneController.elimina);
 routerPrenotazione.get('/:id', PrenotazioneController.checkId, PrenotazioneController.get);

 routerPrenotazione.put('/:id', PrenotazioneController.checkId, PrenotazioneController.edit);
 routerPrenotazione.get('/:id/mod', PrenotazioneController.checkId, PrenotazioneController.bakeCreationUpdateData);
module.exports = routerPrenotazione;