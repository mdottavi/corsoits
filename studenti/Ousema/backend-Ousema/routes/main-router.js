const routerPersona=require ('./router-persona.js');
const { routerPostazione } = require('./router-postazione.js');
const { routerPrenotazione } = require('./router-prenotazione.js');

function ConnectRouter (app) {
    app.use('/persona', routerPersona);
    app.use('/prenotazione', routerPrenotazione);
    app.use('/postazione', routerPostazione);
}

module.exports = ConnectRouter;