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
        //return res.json(result);    
        //return PersonaView(res, result );
        if ( req.accepts("html") ) {
            return res.render("listpostazione",{lista:result});
        } else {
            return res.json(result);
        }
        
    } 
    static async crea (req,res) {
        try {
            let np=new Postazione();
            logger.debug("req.body:", req.body);
            if (req.body.luogo) np.setLuogo(req.body.luogo);
            if (req.body.data_ora) np.setData_ora(req.body.data_ora);            
            logger.debug("Creo nuova Postazione:", np);
            await  np.save();
            res.status(201).send("Created");
            //return PostazioneController.lista (req,res) ;
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                logger.debug("PostazioneController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico");
                }
                let p;
                p=await Postazione.get(req.params.id);
                if (p ) {
                    logger.debug("PostazioneController checkId found",p);
                    req.Postazione=p;
                    next();
                }  else {
                    logger.error("PostazioneController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                logger.error("Errore Cancellazione Postazione - id non fornito");
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            logger.error ("ERRORE:", err);
            return res.status(500).send ("Internal Server Error");
        }            
    }

    static async elimina (req,res) {
        try {
                 if (await Postazione.delete(req.params.id) ) {
                    logger.debug("PostazioneController eliminato ", req.params.id);
                    res.status(200).send('Ok');
                } else {
                    logger.error("Errore Cancellazione Postazione", req.params.id);
                    res.status(400).send ("Errore Cancellazione Postazione");
                }
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async get (req,res) {
        let result;
        if ( ! req.Postazione ) {
            result=await Postazione.get(req.params.id);
        } else {
            result = req.Postazione;
        }
        
        if ( req.accepts("html") ) {
            return res.render("creapostazione",result);
        } else {
            return res.json(result);
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Postazione ) {
                np=await Postazione.get(req.params.id);
            } else {
                np = req.Postazione;
            }
            logger.debug("req.body:", req.body);
            if (req.body.luogo) np.setLuogo(req.body.luogo);
            if (req.body.data_ora) np.setData_ora(req.body.data_ora);            
            logger.debug("Salvo la Postazione:", np);
            await  np.save();
            res.status(200).send("Ok");
            //return PostazioneController.lista (req,res) ;
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=PostazioneController;