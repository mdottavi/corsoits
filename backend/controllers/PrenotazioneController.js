const Prenotazione=require('../model/Prenotazione');
const Persona=require('../model/Persona');
const Postazione=require('../model/Postazione');

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
                p=await Prenotazione.exists(req.params.id);
                if (p ) {
                    logger.debug("PrenotazioneController checkId found",p);
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

    static async get (req,res) {
        let result=await Prenotazione.get(req.params.id);
        
        if ( req.accepts("html") ) {
            return res.render("viewpostazione",result);
        } else {
            return res.json(result);
        }
    }

    static async crea (req,res) {
        try {
            let np=new Prenotazione();
            logger.debug("req.body:", req.body);
            if (req.body.pers_id) np.setPers_id(req.body.pers_id);
            if (req.body.post_id) np.setPost_id(req.body.post_id);            
            logger.debug("Creo nuova Postazione:", np);
            await  np.save();
            res.status(201).send("Created");
            //return PostazioneController.lista (req,res) ;
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }
    
    static async bakeCreationUpdateData (req,res) {
        try {
            let luogo=null;
            if (req.query.luogo) {
                luogo=req.query.luogo;
            }
            let ep=null;
            if (typeof (req.params) != 'undefined' && typeof (req.params.id) != 'undefined') {
                // siamo nel caso di update... quindi carichiamo anche il pers_id e post_id della 
                // prenotazione corrente.
                ep=await Prenotazione.get(req.params.id);
            }
            let persone=[];
            persone=await Persona.lista();
            logger.debug("bakeCreationData: Persone trovate:",persone);
            let postazioni=[];
            postazioni=await Postazione.lista(0,luogo,true);
            logger.debug("bakeCreationData: Postazioni trovate:",postazioni);
            return res.render("creaprenotazione",{listaPersone: persone,listaPostazioni: postazioni, current:ep}) ;
        } catch (err) {
            logger.error ("PrenotazioneController. bakeCreationData ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }
    
    static async edit (req,res) {
        try {
            let np=await Prenotazione.get(req.params.id);

            logger.debug("req.body:", req.body);
            if (req.body.post_id) np.setPost_id(req.body.post_id);
            if (req.body.pers_id) np.setPers_id(req.body.pers_id);            
            logger.debug("Salvo la Prenotazione:", np);
            await  np.save();
            res.status(200).send("Ok");
            //return PostazioneController.lista (req,res) ;
        } catch (err) {
            logger.error ("PrenotazioneController edit ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }
}

module.exports=PrenotazioneController;