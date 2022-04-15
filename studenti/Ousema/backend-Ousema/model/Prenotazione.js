const { listaPrenotazioni } = require("./prenotazione.dao");
const { logger } = require('../common/logging');


class Prenotazione{
    constructor(p) {
        if (p) {
            if (p.id)                     this.id    =p.id;
            if (p.persona_id)             this.persID  =p.persona_id;
            if (p.postazione_id)          this.postID  =p.postazione_id_id;
            if (p.somministrazione_id)    this.sommID=p.somministrazione_id;
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
    static async get(id) {
        let pf=await getPrenotazioneById(id);
        if (pf) { return new Prenotazione(pf);}
        return null;
    }

    static async exists(id) {
        return await prenotazioneExistById(id);
    }

    static async find(id) {
        return await prenotazioneExistById(id);
    }

    // id
    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    //persona_id
    setPersona_id(x) {
        this.persona_id=x;
    }
    getPersona_id() {
        return this.persona_id;
    }

    //somministrazione_id
    setSomministrazione_id(x) {
        this.somministrazione_id=x;
    }
    getSomministrazione_id() {
        return this.somministrazione_id;
    }

    //data_ora
    setData_ora(x) {
        this.data_ora=x;
    }
    getData_ora() {
        return this.data_ora;
    }

    //luogo
    setLuogo(x) {
        this.luogo=x;
    }
    getLuogo() {
        return this.luogo;
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            // id e' definito quindi dobbiamo aggiornare il recordo della Prenotazione
            let res= await updatePrenotazione (this.id, this.persona_id, this.somministrazione_id, this.data_ora, this.luogo);
            if (! res) throw 'save Prenotazione failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertPrenotazione (this.persona_id, this.somministrazione_id, this.data_ora, this.luogo);
            this.setId(res);
            if (! res) throw 'save Prenotazione failed (insert case).'; 
        }
    }

}
    
module.exports=Prenotazione;