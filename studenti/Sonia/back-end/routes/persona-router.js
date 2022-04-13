const { Router } = require('express');
const { PersonaController } = require('../controllers/PersonaController');

const routerPersona = Router();

/**
 * lista delle persone
 */
routerPersona.get('/', PersonaController.listPersona);

routerPersona.post('/', async (req, res) => {
  // const persone = await listPersona();
  return PersonaController.crea(req, res);
  // let persone = [];
  // return res.json(persone).send()
});

routerPersona.get('/:id_persona', async (req, res) => {
  return PersonaController.get (req, res);
});

module.exports = {
  routerPersona
}