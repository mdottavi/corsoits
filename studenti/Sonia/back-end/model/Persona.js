const { getConnection } = require("../db/connection");
const { PersonaDAO } = require("./PersonaDAO");

class Persona {
    constructor(p) {
        if (p) {
            if (p instanceof Persona) {
                this._persona = p;
            } else {
                this._persona = PersonaDAO();
            }
    } else {
        this._persona = new PersonaDAO({});
    }
}

static lista () {
    let listaPersonaDAO = PersonaDAO.listPersona();
    let res = []
;    listaPersonaDAO.forEach((e) => {
        res.push(new Persona(e));
    });
    return res;

}
          
}

module.exports = {
    Persona
}