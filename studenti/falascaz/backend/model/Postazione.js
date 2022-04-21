
const { listPostazione, getPostazioneById, insertPostazione, updatePostazione, postazioneExistById, postazioneDeleteById } = require('./postazione.dao');
const config= require('config');
const { logger } = require('../common/logging');

class Postazione {
    constructor(p) {
        if (p) {
            if (p.id)                  this.id =p.id;
            if (p.data_ora)            this.data_ora =p.data_ora;
            if (p.luogo)               this.luogo =p.luogo;
        } 
    }    
    
    static async lista (pagenum,luogo,disponibili) {
        let listaPostazioneDAO=await listPostazione(pagenum,luogo,disponibili);
        let res=[];
        logger.debug("Richiesta pagina num=" , pagenum);

        listaPostazioneDAO.forEach( e => {
            res.push(new Postazione(e));
        });
        logger.silly("Postazione Model: list=" , res);
        return res;
    }

    static async get(id) {
        let pf=await getPostazioneById(id);
        if (pf) { return new Postazione(pf);}
        return null;
    }

    static async exists(id) {
        return await postazioneExistById(id);
    }

    static async find(id) {
        return await postazioneExistById(id);
    }

    static async delete(id) {
        return await postazioneDeleteById(id);
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
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
            // id e' definito quindi dobbiamo aggiornare il recordo della Postazione
            let res= await updatePostazione (this.id, this.data_ora, this.luogo);
            if (! res) throw 'save Postazione failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertPostazione ( this.data_ora, this.luogo);
            this.setId(res);
            if (! res) throw 'save Postazione failed (insert case).'; 
        }
    }

}

module.exports = Postazione;
