const { Router } = require('express');
const routerPersona = Router();
const PersonaController = require ('../controllers/PersonaController');


/**""
 * lista delle persone
 */

routerPersona.get('/', PersonaController.lista);
routerPersona.get('/crea', (req, res) => {return res.render("creapersona",{nome:"",cognome:"",id:"", CodFis:"", TS:"",date:""}) } );
routerPersona.post('/', PersonaController.crea);
routerPersona.delete('/:id', PersonaController.checkId, PersonaController.elimina);
routerPersona.get('/:id', PersonaController.checkId, PersonaController.get);
routerPersona.put('/:id', PersonaController.checkId, PersonaController.edit);



module.exports = routerPersona;