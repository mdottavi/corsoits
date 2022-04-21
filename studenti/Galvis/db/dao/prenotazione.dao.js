const { getConnection } = require("../connesione")

const listaPrenotazione = async () => {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM prenotazione WHERE annulato_il IS NULL')
    return rows;
}

const insertPrenotazione = async (persona_id,somministrazione_id,data_ora,luogo) =>{
    const connection = await getConnection();
    const query = `INSERT INTO prenotazione (persona_id, somministrazione_id, data_ora, luogo)
    VALUES (?,?,?,?)`;
    const [res] = await connection.query(query, [persona_id,somministrazione_id,data_ora,luogo]);
    return res.insertId;
}

const prenotazioneExistById = async(id_prenotazione) => {
    const connection = await getConnection();
    const query = `SELECT * FROM prenotazione WHERE id = ?`;
    const [rows] = await connection.query(query, [id_prenotazione]);
    return rows.length > 0;
}

const getPrenotazioneById = async (id_prenotazione) => {
    const connection = await getConnection();
    const query = 'SELECT * FROM prenotazione WHERE id = ?';
    const [rows] = await connection.query(query, [id_prenotazione]);
    return rows;
}

module.exports = {
    listaPrenotazione,
    insertPrenotazione,
    prenotazioneExistById,
    getPrenotazioneById
}