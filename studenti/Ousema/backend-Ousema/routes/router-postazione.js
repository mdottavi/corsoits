const { Router } = require('express');
const PostazioneController = require('../controllers/PostazioneController');


const routerPostazione = Router();

routerPostazione.get('/', PostazioneController.lista);



module.exports = {
    routerPostazione
}