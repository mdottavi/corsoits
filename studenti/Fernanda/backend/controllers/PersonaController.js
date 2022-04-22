const Persona=require('../model/Persona');

const PersonaView=require('../views/PersonaView');

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

// parametri in form (http://nomedominio/nome/:chiave/url/:chiave2?chiave=valore&chiave2=valore2)
//                                       ^^^^^^^^^^^^^^^^^^^^^^^^^
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
        let result=await Persona.lista();
        //return res.json(result);    
        //return PersonaView(res, result );
        return res.render("listpersona",{lista:result});
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

        console.log (req.files);
        let np=new Persona();
        
        if (req.body.nome) np.setNome(req.body.nome);
        if (req.body.cognome) np.setCognome(req.body.cognome);
        if (req.body.CF) np.setCodFis(req.body.CF);
        if (req.body.date) np.setDataNascita(req.body.date);
        if ( req.files?.TS ) {
            np.setTesseraSanitaria(req.files.TS.name);
            req.files.TS.mv('./files/' + req.files.TS.name);    
        } else {
            np.setTesseraSanitaria("non pervenuta");
        }
        np.save();
        return res.end();
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