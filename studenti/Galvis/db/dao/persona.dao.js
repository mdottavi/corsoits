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

const personaExistById = async (id_persona)  => {
    const connection = await getConnection();
    const query = `SELECT * FROM persona WHERE id = ?`;
    const [rows] = await connection.query(query, [id_persona]);
    return rows.length > 0;
}

const getPersonaById = async (id_persona) => {
    const connection = await getConnection();
    const query = `SELECT * FROM persona WHERE id = ?`;
    const [rows] = await connection.query(query, [id_persona]);
    return rows[0];
}

module.exports = {
    listPersona,
    insertPersona,
    personaExistById,
    getPersonaById

}