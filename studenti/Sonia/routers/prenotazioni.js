const Router = require('express');
const { listPrenotazioni } = require('../database/dao/prenotazioni.dao');

myRouterPrenotazioni = Router();

myRouterPrenotazioni.get('/', async (req, res) => {
    try {
        const prenotazioni = await listPrenotazioni();
        return res.json(prenotazioni).send();
    } catch (e) {
        res.json ({
            message: "something went wrong",
            error: e.message
        });
    }
});

module.exports = {
    myRouterPrenotazioni
}