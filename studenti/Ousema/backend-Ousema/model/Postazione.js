
const { logger } = require('../common/logging');
const { listaPostazioni } = require('./postazione.dao');


class Postazione{
    constructor(p) {
        if (p) {
            if (p.id)                     this.id    =p.id;
            if (p.luogo)                  this.postazione  =p.luogo;
            if (p.data_ora)               this.slot  =p.data_ora;
        } 
    }    
    static async lista (pag) {
        let listaPostazioneDAO=await listaPostazioni(pag);
        let res=[];

        listaPostazioneDAO.forEach(e =>{
            res.push(new Postazione(e))
        })
        logger.silly("Prenotazione Model: list=" , res);
        return res;
    }

}
    
module.exports=Postazione;