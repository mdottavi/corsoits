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
    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                logger.debug("PrenotazioneController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico");
                }
                let p;
                p=await Prenotazione.get(req.params.id);
                if (p ) {
                    logger.debug("PrenotazioneController checkId found",p);
                    req.Prenotazione=p;
                    next();
                }  else {
                    logger.error("PrenotazioneController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                logger.error("Errore Cancellazione Prenotazione - id non fornito");
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            logger.error ("ERRORE:", err);
            return res.status(500).send ("Internal Server Error");
        }            
    }

    static async elimina (req,res) {
        try {
                 if (await Prenotazione.delete(req.params.id) ) {
                    logger.debug("PrenotazioneController eliminato ", req.params.id);
                    res.status(200).send('Ok');
                } else {
                    logger.error("Errore Cancellazione Prenotazione", req.params.id);
                    res.status(400).send ("Errore Cancellazione Prenotazione");
                }
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

}

module.exports=PrenotazioneController;