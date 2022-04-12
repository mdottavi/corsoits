const PersonaDAO = require("./PersonaDAO")

class Persona {
    constructor(p){
        if(p) {
            if(p instanceof Persona) {
                this._persona = p;
            } else{
                this._persona=PersonaDAO(p);
            }
        } else {
            this._persona = new PersonaDAO({});
        }
    }
    static lista(){
        let listaPersonaDAO=PeronaDAO.listaPersona();
        let res= [];
        listaPersonaDAO.forEach(element => {
            res.push
            
        });
        
        return rows;
    }
}
new Persona ({"nome":"vale", "cognome":"damiani"});
let md= new Persona ({"nome":"vale", "cognome":"damiani"});
let md2= new Persona(md);
md.salva();
md.nome="Vale";
md.setNome("Vale");
md.setCodFisc("DMNVNT")