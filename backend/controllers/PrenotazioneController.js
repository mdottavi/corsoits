const Prenotazione=require('../model/Prenotazione');
const { logger } = require('../common/logging');

class PrenotazioneController {
    static async lista (req , res){
        let pagnum=1;
        if (req.query.pag) {
            pagnum=req.query.pag;
        }
        logger.debug ("PrenotazioneController:" + pagnum);

        let result=await Prenotazione.lista(pagnum);
        //return res.json(result);    
        //return PersonaView(res, result );
        if ( req.accepts("html") ) {
            return res.render("listprenotazione",{lista:result});
        } else {
            return res.json(result);
        }
        
    } 

}

module.exports=PrenotazioneController;