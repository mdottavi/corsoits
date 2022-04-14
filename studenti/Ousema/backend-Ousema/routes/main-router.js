const routerPersona=require ('./persona-router.js');
const { routerPrenotazione } = require('./router-prenotazione.js');

function ConnectRouter (app) {
    app.use('/persona', routerPersona);
    app.use('/prenotazione', routerPrenotazione);
}

module.exports = ConnectRouter;