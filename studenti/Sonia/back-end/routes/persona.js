const { Router } = require('express');

const routerPersona = Router();

/**
 * lista delle persone
 */
routerPersona.get('/', async (req, res) => {
  // const persone = await listPersona();
  let persone = [];
  return res.json(persone).send()
});

module.exports = {
  routerPersona
}