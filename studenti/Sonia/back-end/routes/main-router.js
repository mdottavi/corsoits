const { routerPersona } = require("./persona-router");

function ConnectRouter (app) {
    app.use('/persona', routerPersona);
}

module.exports = {
    ConnectRouter
}