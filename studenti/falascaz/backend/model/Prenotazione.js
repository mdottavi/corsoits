
const { listPrenotazione, getPrenotazioneById, insertPrenotazione, updatePrenotazione, prenotazioneExistById, prenotazioneDeleteById, updateCampiPrenotazione, softDelete, updateFotoPrenotazione } = require('./prenotazione.dao');
const config= require('config');
const { logger } = require('../common/logging');

class Prenotazione {
    constructor(p) {
        if (p) {
            if (p.id)                     this.id    =p.id;

            if (p.pers_id)                this.pers_id    =p.pers_id;
            if (p.nome)                   this.nome  =p.nome;
            if (p.cognome)                this.cognome=p.cognome;
            if (p.codice_fiscale)         this.CodFis =p.codice_fiscale;
            if (p.data_nascita)           this.date   =p.data_nascita;
            if (p.foto_tessera_sanitaria) this.TS     =p.foto_tessera_sanitaria;

            if (p.post_id)                this.post_id    =p.post_id;
            if (p.luogo)                  this.luogo     =p.luogo;
            if (p.data_ora)               this.data_ora     =p.data_ora;

            if (p.somm_id)                this.somministrazione_id    =p.somministrazione_id;

        } 
    }    
    
    static async lista (pagenum) {
        let listaPrenotazioneDAO=await listPrenotazione(pagenum);
        let res=[];
        logger.debug("Richiesta pagina num=" , pagenum);

        listaPrenotazioneDAO.forEach( e => {
            res.push(new Prenotazione(e));
        });
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

    static async delete(id) {
        return await prenotazioneDeleteById(id);
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    setPers_id(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.pers_id=x;
    }
    getPers_id() {
        return this.pers_id;
    }

    setNome(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.nome=x;
    }
    getNome() {
        return this.nome;
    }

    setCognome(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Cognome cannot be null';
        this.cognome=x;
    }
    getCognome() {
        return this.cognome;
    }

    setCodFis(x) {
        this.CodFis=x;

    }
    getCodFis() {
        return this.CodFis;
    }

    setDataNascita (x) {
        this.date=x;
    }
    getDataNascita () {
        return this.date;
    }

    setTesseraSanitaria (x) {
        this.TS=x;
    }
    getTesseraSanitaria () {
        return this.TS;
    }


    setPost_id(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.post_id=x;
    }
    getPost_id() {
        return this.post_id;
    }    
    setData_ora(x) {
        this.data_ora=x;
    }
    getData_ora() {
        return this.data_ora;
    }

    setLuogo(x) {
        this.luogo=x;
    }
    getLuogo() {
        return this.luogo;
    }

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            // id e' definito quindi dobbiamo aggiornare il recordo della prenotazione
            let res= await updatePrenotazione (this.id, this.pers_id, this.post_id );
            if (! res) throw 'save Prenotazione failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertPrenotazione ( this.pers_id, this.post_id);
            this.setId(res);
            if (! res) throw 'save Prenotazione failed (insert case).'; 
        }
    }

}

module.exports = Prenotazione;
