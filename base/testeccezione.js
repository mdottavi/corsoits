const Persona = require("../backend/model/Persona");
console.log ("inizio");
let maurizio=new Persona();
console.log ("dopo la new");
maurizio.setNome("Maurizio");
maurizio.setCognome("D'Ottavi");
console.log ("prima della setId");
try {
    maurizio.setId();
} catch (err) {
    console.log ("C'e' stato un errore...", err);
}


console.log ("fine");