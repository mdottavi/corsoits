const { getConnection } = require("../connesione")


const listPersona = async () => {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM persona')
    return rows;
}

const insertPersona = async (nome, cognome, codice_fiscale, data_nascita) => {
    const connection = await getConnection();
    const query =  `INSERT INTO persona (nome, cognome, codice_fiscale, data_nascita)
    VALUES (?,?,?,?)`;
    const [res] = await connection.query(query, [nome, cognome, codice_fiscale, data_nascita]);
    return res.insertId;
}

module.exports = {
    listPersona,
    insertPersona
}