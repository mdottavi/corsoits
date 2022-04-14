const { Router } = require('express');
const PrenotazioneController = require('../controllers/PrenotazioneController');

const routerPrenotazione = Router();

routerPrenotazione.get('/', PrenotazioneController.lista);



module.exports = {
    routerPrenotazione
}