const Persona=require('./model/Persona');

class PersonaController{

    async listPersone(){
        let res=Persona.lista();

    }

    async get(id){
        let res=await Persona.get(id);
    }
    async find (cognome,nome){
        if(nome=null){
            res=await Persona.find(cognome);
        }else{
            res=await Persona.find(cognome, nome);
        }
    }

    
}