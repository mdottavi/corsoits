const { getMyConnection } = require("../connection");

const listPrenotazioni = async () => {
    const connection = await getMyConnection();
    const [ rows, fields ] = await connection.query('SELECT * FROM prenotazione');
    return rows;
}

module.exports = {
    listPrenotazioni
}