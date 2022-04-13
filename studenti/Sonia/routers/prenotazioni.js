const Router = require('express');
const { listPrenotazioni, insertPrenotazione } = require('../database/dao/prenotazioni.dao');

myRouterPrenotazioni = Router();

myRouterPrenotazioni.get('/', async (req, res) => {
    try {
        const prenotazioni = await listPrenotazioni();
        return res.json(prenotazioni).send();
    } catch (e) {
        res.json ({
            error: e.message
        });
    }
});

// insert a new person
myRouterPrenotazioni.post('/', async (req, res) => {
    try {
      const { persona_id, data_ora, luogo } = req.body;
      const reserve_id = await insertPrenotazione(persona_id, data_ora, luogo);
      return res.json({
        reserve_id
      });
    } catch (e) {
      return res.status(500).json({
        errore: e.message
      })
    }
  });

module.exports = {
    myRouterPrenotazioni
}