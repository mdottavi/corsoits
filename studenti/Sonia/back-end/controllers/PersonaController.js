const { Persona } = require("../model/persona");

// nel controller ci metto le funzionalità per la GUI (interfaccia)
class PersonaController {

    static async listPersona (req, res) {
        let result = await Persona.lista();
        // return res.json(result);
        return res.render("listPersona", {lista: result});
    }

    static async get (req, res) {
        let result = await Persona.get(req.params.id_persona);
        return res.json(result);
    }


    static async crea (req, res) {
    
        // scrive quello che ha ricevuto in termini di files
        console.log(req.files);
        // let np = new Persona();

        // if (req.body.nome) np.nome = req.body.nome;
        // if (req.body.cognome) np.cognome = req.body.cognome;
        // if (req.body.codFisc) np.codFisc = req.body.codFisc;
        // if (req.body.date) np.date = req.body.date;
        // // il ? serve per dire che se files è definito allora deve eseguire
        // if (req.files?.ts) {
        //     np.setTS(req.files.ts.name);
        req.files.ts.mv('./files/' + req.files.ts.name);
        // } else {
        //     np.setTS('non pervenuta');
        // }
        // np.save();
        // console.log("np = ", np);
        // req.files.ts.mv('./files/' + req.files.ts.name);
        return res.end();
    }
    
    static async find (cognome, nome) {
        if (nome = null) {
            res = await Persona.find(cognome);
        } else {
            res = await Persona.find(cognome, nome);
        }
    }

    // // prova 1
    // async getById (id_persona) {
    //     let res = await Persona.getById(id_persona);
    // }
}

module.exports = {
    PersonaController
}