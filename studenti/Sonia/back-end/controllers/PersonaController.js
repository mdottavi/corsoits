const { Persona } = require("../model/persona");

// nel controller ci metto le funzionalità per la GUI (interfaccia)
class PersonaController {
    async listPersona () {
        let res = await Persona.lista();
    }

    async get (id) {
        let res = await Persona.get(id);
    }
    
    async find (cognome, nome) {
        if (nome = null) {
            await Persona.find(cognome);
        } else {
        let res = await Persona.find(cognome, nome);
        }
    }
}