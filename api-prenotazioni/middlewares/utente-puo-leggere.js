// prevediamo che in req.params.id_persona ci sia l'id della persona
const utentePuoLeggere = (req, res, next) => {
  console.log("controllo se l'utente è autorizzato");
  //TODO: controllare se esiste veramente
  const isGino = false;
  if (!isGino) {
    return res.status(403).json({
      message: 'forbidden'
    }).send()
  }
  next();
}

module.exports = {
  utentePuoLeggere
}