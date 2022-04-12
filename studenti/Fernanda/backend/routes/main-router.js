const routerPersona=require('./persone-router.js');

function ConnectRouter(app){
    app.use('/persona',routerPersona);
}

modules.exports=ConnectRouter;
