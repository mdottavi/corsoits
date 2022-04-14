const { listaPrenotazioni } = require("./prenotazione.dao");
const { logger } = require('../common/logging');


class Prenotazione{
    constructor(p) {
        if (p) {
            if (p.id)                     this.id    =p.id;
            if (p.persona_id)             this.persID  =p.persona_id;
            if (p.somministrazione_id)    this.sommID=p.somministrazione_id;
            if (p.data_ora)               this.slot =p.data_ora;
            if (p.luogo)                  this.postazione   =p.luogo;
        } 
    }    
    static async lista (pag) {
        let listaPrenotazioneDAO=await listaPrenotazioni(pag);
        let res=[];

        listaPrenotazioneDAO.forEach(e =>{
            res.push(new Prenotazione(e))
        })
        logger.silly("Prenotazione Model: list=" , res);
        return res;
    }
}

module.exports=Prenotazione;