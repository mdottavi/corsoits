const { getConnection } = require("../connection/connessione")


const listaPrenotazioni = async () => {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM prenotazione WHERE annullato_il is null')
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

const insertPrenotazione = async(persona_id,somministrazione_id,data_ora,luogo) =>{
    const connection = await getConnection();
    const query = `INSERT INTO prenotazione (persona_id, somministrazione_id, data_ora, luogo)
    VALUES (?,?,?,?)`;
    const [res] = await connection.query(query, [persona_id,somministrazione_id,data_ora,luogo]);
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