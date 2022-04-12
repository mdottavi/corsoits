const PersonaDAO=require('./PersonaDAO');

class Persona{
    constructor(p){
        if(p){
            if(p instanceof Persona){
                this._persona=p;
            } else{//json data
                this._persona=new PersonaDAO(o);
            }
        }else{
            this._persona=new PersonaDAO({});
        }
    }

    static asynclista(){
        let listaPersonaDAO=await PersonaDAO.listaPersona();
        let res=[];
        listaPersonaDAO.forEach(e=>{
            res.push(new Persona(e));
        })
        return rows;
    }
}


let md=new Persona({'nome':'', 'cognome':''});

let md2= new Persona(md);
md.salva();
md.nome='Maurizio';

md.setNome('Maurizio');
md.setCodFisc("MRZ");