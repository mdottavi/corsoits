const { Persona } = require("../model/persona");
const { randomUUID } = require('crypto');
const { logger } = require("../common/logging");

// nel controller ci metto le funzionalità per la GUI (interfaccia)
class PersonaController {

    static async listPersona (req, res) {
        if (req.query.q) return PersonaController.getPag(req,res,req.query.q);
        let pagnum = 1;
        logger.debug ('PAGNUM ESTERNO: ' + pagnum);
        if (req.query.pag) {
            pagnum = req.query.pag;
            logger.debug ('PAGNUM INTERNO: ' + pagnum);
        }
        logger.debug ('PAGNUM INTERNO 2:' + pagnum);

        if (!req.accepts('html') && req.accepts('xml')) {
            pagnum = 1;
        }
        let result = await Persona.lista(pagnum);
        // return res.json(result);
        if (/*il client accetta html :*/ req.accepts('html') ) {
            return res.render("listPersona", {lista: result});
        } else {
            return res.json(result);
        } 
    }

    static async getPag (req, res, id) {
        let result = await Persona.get(id);
        return res.json(result);
    }

    static async get (req, res) {
        let result = await Persona.get(req.params.id_persona);
        return res.json(result);
    }


    static async crea (req, res) {
        try {
        // scrive quello che ha ricevuto in termini di files
            // console.log(req.files);
            let np = new Persona();

            if (req.body.nome) np.nome = req.body.nome;
            if (req.body.cognome) np.cognome = req.body.cognome;
            if (req.body.codFisc) np.codFisc = req.body.codFisc;
            if (req.body.date) np.date = req.body.date;
            // il ? serve per dire che se files è definito allora deve eseguire
            if (req.files?.ts) {
                np.setTS(req.files.ts.name);
                let nomeTS = randomUUID() + '.jpg';
                np.setTS(nomeTS);
                req.files.ts.mv('./files/' + nomeTS);
            } else {
                np.setTS('non pervenuta');
            }
            logger.debug('Creo nuova persona: ', np);
            await np.save();
            console.log("np = ", np);
            return /* primo modo per cambiare pagina quando si aggiunge una persona :*/ PersonaController.listPersona(req, res); 
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Persona ) {
                np=await Persona.get(req.params.id_persona);
            } else {
                np = req.Persona;
            }
            logger.debug("req.body:", req.body);
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.cognome) np.setCognome(req.body.cognome);            
            if (req.body.codFisc) np.setCodFisc(req.body.codFisc);            
            if (req.body.date) np.setDate(req.body.date);            
            if (req.body.ts) np.setTS(req.body.ts);            
            logger.debug("Salvo la Persona:", np);
            await  np.save();
            res.status(200).send("Ok");
            //return PostazioneController.lista (req,res) ;
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

    static async checkId (req,res,next) {
        try {
            if (req.params.id_persona ) {
                logger.debug("PersonaController checkId req.params.id_persona:", req.params.id_persona);
                const eIntero = parseInt(req.params.id_persona);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id must be a number");
                }
                let p;
                p=await Persona.get(req.params.id_persona);
                if (p ) {
                    logger.debug("PersonaController checkId found",p);
                    req.Persona=p;
                    next();
                }  else {
                    logger.error("PersonaController checkId Errore - id non trovato");
                    return res.status(404).send ("id not found");                    
                }               
            } else {
                logger.error("Errore Cancellazione Persona - id non fornito");
                return res.status(404).send("id not given");
            }
        } catch (err) {
            logger.error ("ERRORE:", err);
            return res.status(500).send ("Internal Server Error");
        }            
    }

    static async delPersona (req,res) {
        try {
                 if (await Persona.delete(req.params.id_persona) ) {
                    logger.debug("PersonaController eliminato ", req.params.id_persona);
                    res.status(200).send('Ok');
                } else {
                    logger.error("Errore Cancellazione Persona", req.params.id_persona);
                    res.status(400).send ("Errore Cancellazione Persona");
                }
        } catch (err) {
            logger.error ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }
    
    // static async find (cognome, nome) {
    //     if (nome = null) {
    //         res = await Persona.find(cognome);
    //     } else {
    //         res = await Persona.find(cognome, nome);
    //     }
    // }

    // // prova 1
    // async getById (id_persona) {
    //     let res = await Persona.getById(id_persona);
    // }
}

module.exports = {
    PersonaController
}