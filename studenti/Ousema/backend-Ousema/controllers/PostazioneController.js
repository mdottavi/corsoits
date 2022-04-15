const Postazione = require("../model/Postazione");



class PostazioneController {
      
    static async lista (req , res){
        let pag=1
        if (req.query.pag){
            pag=req.query.pag
        }
        let result=await Postazione.lista(pag);

        // if ( req.accepts("html") ) {
        //     return res.render("listpostazione",{lista:result});
        // } else {
        //     return res.json(result);
        // }
        return res.json(result);
        
    } 
    static async get2 (req,res,id) {
        let result=await Postazione.get(id);
        
        return res.json(result);
    }

    static async get (req,res) {
        let result=await Postazione.get(req.params.id_postazione);
        
        return res.json(result);
    }
}

module.exports=PostazioneController;