const { Router } = require('express');
const routerPersona = Router();
const PersonaController = require ('../controllers/PersonaController');


/**
 * lista delle persone
 */
routerPersona.get('/', async (req, res) => {
  //const persone = await listPersona();
  return PersonaController.lista (req,res);
  //let persone=[];
  //return res.json(persone).send();
})

routerPersona.post('/', async (req, res) => {
  //const persone = await listPersona();
  return PersonaController.crea (req,res);
  //let persone=[];
  //return res.json(persone).send();
})


routerPersona.get('/:id_persona', async (req, res) => {
  //const persone = await listPersona();
  return PersonaController.get (req,res);
  //let persone=[];
  //return res.json(persone).send();
})

module.exports = routerPersona;