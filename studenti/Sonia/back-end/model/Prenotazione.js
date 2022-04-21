const { logger } = require("../common/logging");
const { listPrenotazione, prenotazioneExistById, getPrenotazioneById, updatePrenotazione, insertPrenotazione, prenotazioneDeleteById } = require("./prenotazione.dao");

class Prenotazione {
    constructor(p) {
        if (p) {
            if (p.id) this.id = p.id;

            if (p.id_persona) this.id = p.id_persona;
            if (p.nome) this.nome = p.nome;
            if (p.cognome) this.cognome = p.cognome;
            if (p.codice_fiscale) this.codFisc = p.codice_fiscale;
            if (p.data_nascita) this.date = p.data_nascita;

            if (p.id_postazione) this.id_post = p.id_postazione;
            if (p.luogo) this.luogo = p.luogo;
            if (p.data_ora) this.data_ora = p.data_ora;
        }
}

static async lista (pagenum) {
    let listaPrenotazioneDAO = await listPrenotazione();
    let res = [];
    logger.debug("Richiesta pagina num=" , pagenum);
    listaPrenotazioneDAO.forEach((e) => {
        res.push(new Prenotazione(e));
    });
    logger.silly('Prenotazione Model: list = ', res);
    return res;

}

// get by id 
static async get (id) {
    let getByIdDAO = await getPrenotazioneById(id);
    if (getByIdDAO) {return new Prenotazione(getByIdDAO);}
    return null;
}

static async exists (id) {
    return await prenotazioneExistById(id);
}

static async find (id) {
    return await prenotazioneExistById(id);
}

static async delete(id) {
    return await prenotazioneDeleteById(id);
}

setId (x) {
    if ((x == null) || typeof(x) == 'undefined') throw 'Nome cannot be null';
    return this.id = x;
}

getId () {
    return this.id;
}

setIdPers (x) {
    if ((x == null) || typeof(x) == 'undefined') throw 'This cannot be null';
    return this.persona_id = x;
}

getIdPers () {
    return this.persona_id;
}

setNome (x) {
    if ((x == null) || typeof(x) == 'undefined') throw 'Nome cannot be found';
    this.nome = x;
}

getNome () {
    return this.nome;
}

setCognome (x) {
    if ((x == null) || typeof(x) == 'undefined') throw 'Cognome cannot be found';
    this.cognome = x;
}

getCognome () {
    return this.cognome;
}
setCodFisc (x) {
    this.codFisc = x;
}

getCodFisc () {
    return this.codFisc;
}

setDate (x) {
    this.date = x;
}

getDate () {
    return this.date;
}
setTS (x) {
    this.ts = x;
}

getTS () {
    return this.ts;
}

setIdPost (x) {
    if ((x == null) || typeof(x) == 'undefined') throw 'This cannot be null';
    return this.postazione_id = x;
}

getIdPost () {
    return this.postazione_id;
}

setLuogo (x) {
    this.luogo = x;
}

getLuogo () {
    return this.luogo;
}

setDataOra (x) {
    this.data_ora = x;
}

getDataOra () {
    return this.data_ora;
}

// salvo la prenotazione
async save () {
    if (typeof(this.id) != 'undefined' && this.id != null) {
        let res = await updatePrenotazione (this.id, this.nome, this.cognome, this.codFisc, this.date, this.ts);
        if (! res) throw 'save prenotazione failed (update case).';
    } else {
        let res = await insertPrenotazione (this.nome, this.cognome, this.codFisc, this.date, this.ts);
        this.setId(res);
        if (! res) throw 'save prenotazione failed (insert case).' 
    }
}
          
}

module.exports = {
    Prenotazione
}