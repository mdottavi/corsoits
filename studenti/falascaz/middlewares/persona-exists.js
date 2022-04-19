const { personaExistById, getPersonaById } = require('../db/dao/persona.dao');

const checkPersonaExists = async (req, res, next) => {
  console.log('controllo se la persona esiste');
  const id_persona = req.params.id_persona;
  if(!id_persona) {
    return res.status(404).json({
      message: "necessario un id persona"
    }).send()
  }

  const eIntero = parseInt(id_persona);
  if(isNaN(eIntero)) {
    return res.status(400).json({
      message: "Richiesto un numero intero"
    }).send()
  }

  const esiste = await personaExistById(id_persona);
  if (!esiste) {
    return res.status(404).json({
      message: 'la persona non esiste'
    }).send()
  }
  next();
}

const checkAndGetPersona = async (req, res, next) => {
  const id_persona = req.params.id_persona;
  if(!id_persona) {
    return res.status(404).json({
      message: "mi serve l'id persona"
    }).send()
  }

  const eIntero = parseInt(id_persona);
  if(isNaN(eIntero)) {
    return res.status(400).json({
      message: "Richiesto un numero intero"
    }).send()
  }

  const persona = await getPersonaById(id_persona);
  if (!persona) {
    return res.status(404).json({
      message: 'la persona non esiste'
    }).send()
  }
  req.persona = persona;
  next();
}

module.exports = {
  checkPersonaExists,
  checkAndGetPersona
}
