const { getConnection } = require("../common/connessione");
const config= require('config');
const { logger } = require('../common/logging');


const listaPrenotazioni = async (pag) => {
    const connection = await getConnection();
    let numres=config.get('max-results-per-page');
    let query='SELECT * FROM prenotazione'
    if (pag>0){
        let start=(pag-1)*numres;
        query +=' LIMIT '+numres+' OFFSET '+start;
        logger.debug(pag)
    }
    const [rows] = await connection.query(query);
    logger.debug(query);
    return rows;
}

const getPrenotazioneById = async(id_prenotazione) =>{
    const connection = await getConnection();
    const query = 'SELECT * FROM prenotazione WHERE id = ?';
    const [rows] = await connection.query(query, [id_prenotazione]);
    return rows[0];
}

const getPrenotazioneByDate = async(date) =>{
    const connection = await getConnection();
    const query = 'SELECT * FROM prenotazione WHERE Date(data_ora) = ?';
    const [rows] = await connection.query(query, [date]);
    return rows;
}

const getPrenotazioneByLuogo = async(luogo) =>{
    const connection = await getConnection();
    const query = 'SELECT * FROM prenotazione WHERE luogo = ?';
    const [rows] = await connection.query(query, [luogo]);
    return rows;
}

const insertPrenotazione = async(persona_id,data_ora,luogo) =>{
    const connection = await getConnection();
    const query = `INSERT INTO prenotazione (persona_id,data_ora,luogo) VALUES (?,?,?)`;
    const [res] = await connection.query(query, [persona_id,data_ora,luogo]);
    return res.insertId;
}

const softDeletePrenotazione = async(id_prenotazione) =>{
    const connection = await getConnection();
    const query = `UPDATE prenotazione SET annullato_il = CURRENT_TIMESTAMP WHERE id = ?`
    const [res] = await connection.query(query, [id_prenotazione]);
    return res.affectedRows === 1;
}

module.exports = {
    listaPrenotazioni,
    getPrenotazioneById,
    getPrenotazioneByDate,
    getPrenotazioneByLuogo,
    insertPrenotazione,
    softDeletePrenotazione
}