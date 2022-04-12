const { routerPersona } = require("./persona");

function ConnectRouter (app) {
    app.use('/persona', routerPersona);
}

module.exports = {
    ConnectRouter
}