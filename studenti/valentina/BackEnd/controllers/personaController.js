const Persona=require('./model/Persona');

class personaContoller {
    async listPersona() {
        let res=Persona.lista();

    } 
    async get(id){
        let res=await Persona.get(id);
    }
    async find(cognome, nome){
        if(nome=null){
            await Persona.find(cognome);
        }else {
            res=await Persona.find(cognome,nome);
        }
    }
}