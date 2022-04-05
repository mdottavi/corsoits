// prevediamo che in req.params.id_persona ci sia l'id della persona
const checkPersonaExists = (req, res, next) => {
  console.log('controllo se la persona esiste');
  //TODO: controllare se esiste veramente
  const esiste = false;
  if (esiste) {
    return res.status(404).json({
      message: 'la prsona non esiste'
    }).send()
  }
  next();
}

module.exports = {
  checkPersonaExists
}