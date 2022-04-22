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

        if ( req.accepts("html") ) {
            return res.render("listprenotazione",{lista:result});
        } else {
            return res.json(result);
        }
        
    } 
    static async elimina (req,res) {
        try {
            if (await Prenotazione.delete(req.params.id_prenotazione) ) {
            logger.debug("Prenotazione eliminato ", req.params.id_prenotazione);
            res.status(200).send('Ok');
            } else {
                logger.error("Errore Cancellazione Prenotazione", req.params.id_prenotazione);
                res.status(400).send ("Errore Cancellazione Prenotazione");
            }
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async get (req,res) {
        let result;
        if ( ! req.Prenotazione ) {
            result=await Prenotazione.get(req.params.id_prenotazione);
        } else {
            result = req.Prenotazione;
        }
        
        if ( req.accepts("html") ) {
            return res.render("creaprenotazione",result);
        } else {
            return res.json(result);
        }
    }


}

module.exports=PrenotazioneController;