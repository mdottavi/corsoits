const Persona=require('../model/Persona');


class PersonaController {
      
    static async lista (req , res){
        let result=await Persona.lista();
        return res.json(result);    
    } 

    static async get (req,res) {
        let result=await Persona.get(req.params.id_persona);
        return res.json(result);
    }

    static async crea (req,res) {
        
        console.log (req.files);
        req.files.TS.mv('./files/' + req.files.TS.name);
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