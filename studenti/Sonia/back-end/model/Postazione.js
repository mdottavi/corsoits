const { logger } = require("../common/logging");
const { listPostazione, getPostazioneById, postazioneExistById, updatePostazione, insertPostazione } = require("./postazione.dao");

class Postazione {
    constructor(p) {
        if (p) {
            if (p.id) this.id = p.id;
            if (p.luogo) this.luogo = p.luogo;
            if (p.data_ora) this.data_ora = p.data_ora;
        }
}

static async lista (pagenum, luogo, disponibili) {
    let listaPostazioneDAO = await listPostazione(pagenum, luogo, disponibili);
    let res = [];
    logger.debug('RIchiesta pag num: ', pagenum);
    listaPostazioneDAO.forEach((e) => {
        res.push(new Postazione(e));
    });
    logger.silly('Postazione Model: list = ', res);
    return res;

}

// get by id 
static async get (id) {
    let getByIdDAO = await getPostazioneById(id);
    if (getByIdDAO) return new Postazione(getByIdDAO);
    return null;
}

static async exists (id) {
    return await postazioneExistById(id);
}

static async find (id) {
    return await postazioneExistById(id);
}

static async delete(id) {
    return await postazioneDeleteById(id);
}

setId (x) {
    if ((x == null) || typeof(x) == 'undefined') throw 'This cannot be null';
    return this.id = x;
}

getId () {
    return this.id;
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

// salvo la persona
async save () {
    if (typeof(this.id) != 'undefined' && this.id != null) {
        let res = await updatePostazione (this.id, this.luogo, this.data_ora);
        if (! res) throw 'save Postazione failed (update case).';
    } else {
        let res = await insertPostazione (this.id, this.luogo, this.data_ora);
        this.setId(res);
        if (! res) throw 'save Postazione failed (insert case).' 
    }
}
          
}

module.exports = {
    Postazione
}