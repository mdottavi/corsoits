const{Router}=require('express');
const routerPersona=Router();
const PersonaController= require('../controllers/PersonaController');
/**
 * lista delle persone
 */
routerPersona.get('/',async(req,res)=>{
    //const persone=await listPersona();
    let persone=[];
    return res.json(persone).send()
})

module.exports=routerPersona;