const { Router } = require('express');
const routerPersona = Router();
const PersonaController = require ('../controllers/PersonaController');


/**""
 * lista delle persone
 */
routerPersona.get('/', PersonaController.lista);

routerPersona.post('/', PersonaController.crea );

routerPersona.get('/crea', async (req, res) => {
   return res.render("creapersona",{});
} );

routerPersona.get('/:id_persona', async (req, res) => {
  //const persone = await listPersona();
  return PersonaController.get (req,res);
  //let persone=[];
  //return res.json(persone).send();
})
routerPersona.delete('/:id', PersonaController.elimina);
routerPersona.put('/:id', PersonaController.checkId, PersonaController.edit);

module.exports = routerPersona;