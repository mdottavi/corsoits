
const utentePuoLeggere = (req, res, next) => {
  const checker = false;
    if (!checker) {
      return res.status(403).json({
        message: 'forbidden'
      }).send()
    }
    next();
}

module.exports = {
    utentePuoLeggere
}
