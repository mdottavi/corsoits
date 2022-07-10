const { Router } = require('express');
const routerPostazione = Router();
const PostazioneController = require ('../controllers/PostazioneController');


/**""
 * lista delle prenotazioni
 */
 routerPostazione.get('/', PostazioneController.lista);
 routerPostazione.get('/crea', (req, res) => {return res.render("creapostazione",{luogo:"",data_ora:"",id:""}) } );
 routerPostazione.post('/', PostazioneController.crea);
 routerPostazione.delete('/:id', PostazioneController.checkId, PostazioneController.elimina);
 routerPostazione.get('/:id', PostazioneController.checkId, PostazioneController.get);
 routerPostazione.put('/:id', PostazioneController.checkId, PostazioneController.edit);
 

module.exports = routerPostazione;