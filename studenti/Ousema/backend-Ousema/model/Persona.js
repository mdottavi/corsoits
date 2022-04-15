
const { listPersona, getPersonaById, insertPersona, updatePersona, personaExistById, updateCampiPersona, softDelete, updateFotoPersona, personaDeleteById } = require('./persona.dao');
const config= require('config');
const { logger } = require('../common/logging');

class Persona {
    constructor(p) {
        if (p) {
            if (p.id)                     this.id    =p.id;
            if (p.nome)                   this.nome  =p.nome;
            if (p.cognome)                this.cognome=p.cognome;
            if (p.codice_fiscale)         this.CodFis =p.codice_fiscale;
            if (p.data_nascita)           this.date   =p.data_nascita;
            if (p.foto_tessera_sanitaria) this.TS     =p.foto_tessera_sanitaria;
        } 
    }    
    
    static async lista (pag) {
        let listaPersonaDAO=await listPersona(pag);
        let res=[];
//         for ( let i = 0; (i <  config.get('max-results-per-page')) && (i<listaPersonaDAO.length); i++ ) { 
// //       listaPersonaDAO.forEach( e => {
//             res.push(new Persona(listaPersonaDAO[i]));
//         }
        listaPersonaDAO.forEach(e =>{
            res.push(new Persona(e))
        })
        logger.silly("Persona Model: list=" , res);
        return res;
    }

    static async get(id) {
        let pf=await getPersonaById(id);
        if (pf) { return new Persona(pf);}
        return null;
    }

    static async exists(id) {
        return await personaExistById(id);
    }

    static async find(id) {
        return await personaExistById(id);
    }

    static async delete(id) {
        return await personaDeleteById(id);
    }


    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    existId () {
        if (this.id == null || typeof(this.id) == 'undefined') return false;
        return true; 
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
        // Qui potremmo testare che il codice Fiscale sia settato correttamente
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

    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            // id e' definito quindi dobbiamo aggiornare il recordo della persona
            let res= await updatePersona (this.id, this.nome, this.cognome, this.CodFis, this.date, this.TS);
            if (! res) throw 'save Persona failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertPersona (this.nome, this.cognome, this.CodFis, this.date, this.TS);
            this.setId(res);
            if (! res) throw 'save Persona failed (insert case).'; 
        }
    }

}

module.exports = Persona;
