const { personaExistById, getPersonaById } = require("../db/dao/persona.dao");

const checkPersonaExist = async (req, res, next) => {
    console.log("Controllo se la persona esiste");
    const id_persona = req.paramas.id_persona;
    if(!id_persona) {
        return res.status(404).json({
            message: "Mi serve l'id della persona"
        }).send()
    }

    const eIntero = parseInt(id_persona);
    if(isNaN(eIntero)) {
        return res.status(400).json({
            messagge: "L'id della persona deve essere un numero intero"
        }).send()
    }

    const esiste = await personaExistById(id_persona);
    if(!esiste) {
        return res.status(404).json({
            messagge: "La persona non esiste"
        }).send()
    }
    next();
}

const checkAndGetPersona = async (req, res, next) => {
    console.log('Controllo se la persona esiste e la prendo');
    const id_persona = req.params.id_persona;
    if(!id_persona) {
      return res.status(404).json({
        message: "Mi serve l'id della persona"
      }).send()
    }
  
    const eIntero = parseInt(id_persona);
    if(isNaN(eIntero)) {
      return res.status(400).json({
        message: "L'id della persona deve essere un numero intero"
      }).send()
    }
  
    const persona = await getPersonaById(id_persona);
    if (!persona) {
      return res.status(404).json({
        message: 'La persona non esiste'
      }).send()
    }
    req.persona = persona;
    next();
  }

module.exports = {
    checkPersonaExist,
    checkAndGetPersona
}