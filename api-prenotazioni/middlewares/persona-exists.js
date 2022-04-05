const { personaExistById } = require('../db/dao/persona.dao');

// prevediamo che in req.params.id_persona ci sia l'id della persona
const checkPersonaExists = async (req, res, next) => {
  console.log('controllo se la persona esiste');
  const id_persona = req.params.id_persona;
  if(!id_persona) {
    return res.status(404).json({
      message: "mi serve l'id persona"
    }).send()
  }

  const eIntero = parseInt(id_persona);
  if(isNaN(eIntero)) {
    return res.status(400).json({
      message: "l'id della persona deve essere un intero"
    }).send()
  }

  const esiste = await personaExistById(id_persona);
  if (!esiste) {
    return res.status(404).json({
      message: 'la prsona non esiste'
    }).send()
  }
  next();
}

module.exports = {
  checkPersonaExists
}