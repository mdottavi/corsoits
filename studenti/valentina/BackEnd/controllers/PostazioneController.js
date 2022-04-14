const Postazione=require('../model/Postazione');
const { logger } = require('../common/logging');

class PostazioneController {
    static async lista (req , res){
        let luogo=null;
        let disponibili=false;
        let pagnum=1;
        if (req.query.pag) {
            pagnum=req.query.pag;
        }
        if (req.query.luogo) {
            luogo=req.query.luogo;
        }
        logger.debug("req.query.libero="+ req.query.libero);
        if (typeof (req.query.libero) != 'undefined') {
            disponibili=true;
        }

        logger.debug ("PostazioneController pag=" + pagnum + "luogo="+ luogo + "disponibili=" + disponibili);

        let result=await Postazione.lista(pagnum,luogo,disponibili);
        return res.json(result);    
        //return PersonaView(res, result );
        if ( req.accepts("html") ) {
            return res.render("listpersona",{lista:result});
        } else if (req.accepts("xml")) {
            res.set("Content-Type", "application/xml");
            return res.render("listpersonaxml",{lista:result});
        } else {
            return res.json(result);
        }
        
    } 

}

module.exports=PostazioneController;