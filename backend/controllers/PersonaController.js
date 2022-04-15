const Persona=require('../model/Persona');
const { randomUUID } = require('crypto');

const PersonaView=require('../views/PersonaView');
const { logger } = require('../common/logging');

// parametgri in querystring (http://nomedominio/url?chiave=valore&chiave2=valore2)
//                                                   ^^^^^^^^^^^^^
//                                                    querystring
//   req.query.chiave
//   req.query.chiave2

// parametgri in url (http://nomedominio/nome/:chiave/url/:chiave2?chiave=valore&chiave2=valore2)
//                                       ^^^^^^^^^^^^^^^^^^^^^^^^^
//                                               url
//   req.params.chiave
//   req.params.chiave2

// parametri in form/json (http://nomedominio/nome/:chiave/url/:chiave2?chiave=valore&chiave2=valore2)
//                                          ^^^^^^^^^^^^^^^^^^^^^^^^^
//                                               url
//   req.body.chiave
//   req.body.chiave2

// files in form (http://nomedominio/nome/:chiave/url/:chiave2?chiave=valore&chiave2=valore2)
//
//   req.files.TS (dove TS e' il nome del campo di input del form )
//   req.files.TS.mv req.files.TS.name


class PersonaController {
    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                logger.debug("PersonaController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico");
                }
                let p;
                p=await Persona.get(req.params.id);
                if (p ) {
                    logger.debug("PersonaController checkId found",p);
                    req.Persona=p;
                    next();
                }  else {
                    logger.error("PersonaController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                logger.error("Errore Cancellazione Persona - id non fornito");
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            logger.error ("PersonaController ERRORE:", err);
            return res.status(500).send ("Internal Server Error");
        }            
    }
      
    static async lista (req , res){
        if (req.query.q){
            if ( !req.params ) req.params={};
            req.params.id=req.query.q;
            return PersonaController.get(req,res);
        } 
        let pagnum=1;
        logger.debug ("PAGENUM ESTERNO:" + pagnum);
        if (req.query.pag) {
            pagnum=req.query.pag;
            logger.debug ("PAGENUM INTERNO:" + pagnum);
        }
        logger.debug ("PAGENUM INTERNO2:" + pagnum);
        //
        if (!req.accepts("html") && req.accepts("xml")) {
            pagnum=-1;
        }

        let result=await Persona.lista(pagnum);
        //return res.json(result);    
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

    static async get (req,res) {
        let result;
        if ( ! req.Persona ) {
            result=await Persona.get(req.params.id);
        } else {
            result = req.Persona;
        }
        
        if ( req.accepts("html") ) {
            return res.render("creapersona",result);
        } else {
            return res.json(result);
        }
    }

    static async crea (req,res) {
        try {
            logger.debug ("PersonaController: crea: files: ",req.files);
            logger.debug ("PersonaController: crea: body: ",req.body);
            let np=new Persona();
            
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.cognome) np.setCognome(req.body.cognome);
            if (req.body.CF) np.setCodFis(req.body.CF);
            if (req.body.date) np.setDataNascita(req.body.date);
            if ( req.files?.TS ) {
                let nome_file_TS=randomUUID()+".jpg";
                np.setTesseraSanitaria(nome_file_TS);
                req.files.TS.mv('./files/' + nome_file_TS);    
            } else {
                np.setTesseraSanitaria("non pervenuta");
            }
            logger.debug("Creo nuova persona:", np);
            await  np.save();
            res.status(201).send("Created");
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Persona.delete(req.params.id) ) {
                    logger.debug("PersonaController eliminato ", req.params.id);
                    res.status(200).send('Ok');
                } else {
                    logger.error("PersonaControllerErrore Cancellazione Persona", req.params.id);
                    res.status(400).send ("Errore Cancellazione Persona");
                }
        } catch (err) {
            logger.error ("PersonaController ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Persona ) {
                np=await Persona.get(req.params.id);
            } else {
                np = req.Persona;
            }
            logger.debug ("PersonaController: edit: files: ",req.files);
            logger.debug ("PersonaController: edit: body: ",req.body);
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.cognome) np.setCognome(req.body.cognome);
            if (req.body.CF) np.setCodFis(req.body.CF);
            if (req.body.date) np.setDataNascita(req.body.date);
            if ( req.files?.TS ) {
                let nome_file_TS=randomUUID()+".jpg";
                np.setTesseraSanitaria(nome_file_TS);
                req.files.TS.mv('./files/' + nome_file_TS);    
            } else {
                np.setTesseraSanitaria("non pervenuta");
            }
            logger.debug("Salvo persona:", np);
            await  np.save();
            res.status(200).send("Ok");
            //return PostazioneController.lista (req,res) ;
        } catch (err) {
            logger.error ("PersonaController ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=PersonaController;