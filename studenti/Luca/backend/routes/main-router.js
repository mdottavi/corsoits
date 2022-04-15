const routerPersona=require ('./persona-router.js');

function ConnectRouter (app) {
    app.use('/persona', routerPersona);
}

module.exports = ConnectRouter;