const { prenotazioneExistById, getPrenotazioneById } = require("../db/dao/prenotazione.dao");

const checkPrenotazioneExists = async (req, res, next) => {
    console.log('Controllo se la prenotazione esiste');
    const id_prenotazione = req.params.id_prenotazione;
    if(!id_prenotazione) {
        return res.status(404).json({
            messagge: "Mi serve l'id della prenotazione"
        }).send()
    }

    const eIntero = parseInt(id_prenotazione);
    if(isNaN(eIntero)) {
        return res.status(404).json({
            message: "L'ide della prenotazione deve essere un numero intero"
        }).send()
    }

    const esiste = await prenotazioneExistById(id_prenotazione);
    if(!esiste) {
        return res.status(404).json({
            message: 'La prenotazione non esiste'
        }).send()
    }
    next();
}

const checkAndGetPrenotazione = async (req, res, next) => {
    console.log('Controllo se la presona esiste e la prendo');
    const id_prenotazione = req.paramas.id_prenotazione;
    if(!id_prenotazione) {
        return res.status(404).json({
            message: "Mi serve l'id della prenotazione"
        }).send()
    }

    const eIntero = parseInt(id_prenotazione);
    if(isNaN(eIntero)) {
        return res.status(400).json({
            message: "L'ide della prenotazione deve essere un numero"
        }).send()
    }

    const prenotazione = await getPrenotazioneById(id_prenotazione);
    if(!prenotazione) {
        return res.status(404).json({
            message: 'La prenotazione non esiste'
        }).send()
    }
    req.prenotazione = prenotazione
    next();
}

module.exports = {
    checkPrenotazioneExists,
    checkAndGetPrenotazione
}