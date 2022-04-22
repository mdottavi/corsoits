const { getMyConnection } = require("../connection");

const listPrenotazioni = async () => {
    const connection = await getMyConnection();
    const [ rows, fields ] = await connection.query('SELECT * FROM prenotazione');
    return rows;
}

const insertPrenotazione = async () => {
    const connection = await getMyConnection();
    const query = `INSERT INTO prenotazione (persona_id, data_ora, luogo) SELECT id, ?, ? FROM persona`;
    const [res] = await connection.query(query, [persona_id, data_ora, luogo]);
    return res.insertId;
}

module.exports = {
    listPrenotazioni,
    insertPrenotazione
}