const { listPersona, personaExistById, getPersonaById, updatePersona, insertPersona } = require("./persona.dao");

class Persona {
    constructor(p) {
        if (p) {
            if (p.id) this.id = p.id;
            if (p.nome) this.nome = p.nome;
            if (p.cognome) this.cognome = p.cognome;
            if (p.codice_fiscale) this.codFisc = p.codice_fiscale;
            if (p.data_nascita) this.date = p.data_nascita;
            if (p.foto_tessera_sanitaria) this.ts = p.foto_tessera_sanitaria;
        }
}

static async lista () {
    let listaPersonaDAO = await listPersona();
    let res = [];
    listaPersonaDAO.forEach((e) => {
        res.push(new Persona(e));
    });
    console.log ('Persona Model: list = ', res);
    return res;

}

// get by id 
static async get (id) {
    let getByIdDAO = await getPersonaById(id);
    if (getByIdDAO) {return new Persona(getByIdDAO);}
    return null;
}

static async exists (id) {
    return await personaExistById(id);
}

static async find (id) {
    return await personaExistById(id);
}

setId (x) {
    if ((x == null) || typeof(x) == 'undefined') throw 'Nome cannot be null';
    return this.id = x;
}

getId () {
    return this.id;
}

existId () {
    if ((this.id == null) || typeof(this.id) == 'undefined') return false;
    return true;
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

// salvo la persona
async save () {
    if (typeof(this.id) != 'undefined' && this.id != null) {
        let res = await updatePersona (this.id, this.nome, this.cognome, this.codFisc, this.date, this.ts);
        if (! res) throw 'save Persona failed (update case).';
    } else {
        let res = await insertPersona (this.nome, this.cognome, this.codFisc, this.date, this.ts);
        this.setId(res);
        if (! res) throw 'save Persona failed (insert case).' 
    }
}
          
}

module.exports = {
    Persona
}