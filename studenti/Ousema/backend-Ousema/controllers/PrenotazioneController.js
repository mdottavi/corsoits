const Prenotazione = require("../model/Prenotazione");




class PrenotazioneController {
      
    static async lista (req , res){
        let pag=1
        if (req.query.pag){
            pag=req.query.pag
        }
        let result=await Prenotazione.lista(pag);

        if ( req.accepts("html") ) {
            return res.render("listprenotazione",{lista:result});
        } else {
            return res.json(result);
        }
        
        
    } 
    static async get2 (req,res,id) {
        let result=await Prenotazione.get(id);
        
        return res.json(result);
    }

    static async get (req,res) {
        let result=await Prenotazione.get(req.params.id_persona);
        
        return res.json(result);
    }
}

module.exports=PrenotazioneController;