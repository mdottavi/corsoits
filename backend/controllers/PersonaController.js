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
      
    static async lista (req , res){
        if (req.query.q) return PersonaController.get2(req,res,req.query.q);
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
    static async get2 (req,res,id) {
        let result=await Persona.get(id);
        
        return res.json(result);
    }

    static async get (req,res) {
        let result=await Persona.get(req.params.id_persona);
        
        return res.json(result);
    }

    static async crea (req,res) {
        try {
            console.log (req.files);
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
            return PersonaController.lista (req,res) ;
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async find (cognome, nome) {
        if (nome = null) {
            res=await Persona.find(cognome);
        } else {
             res=await Persona.find(cognome, nome);
        }
        
    }
}

module.exports=PersonaController;