const { getMyConnection } = require("../connection");

const listaPersone = async () => {
    const connection = await getMyConnection();
    const [ rows ] = await connection.query('SELECT * FROM persona');
    return rows;
}

const personById = async (person_id) => {
    const connection = await getMyConnection();
    const query = 'SELECT * FROM persona WHERE id = ?';
    const res = await connection.query(query, [person_id]);
    console.log(res);
    const [rows] = res;
    return rows[0];
}

const insertPerson = async (nome, cognome, codice_fiscale, data_nascita) => {
    const connection = await getMyConnection();
    const query = `INSERT INTO persona (nome, cognome, codice_fiscale, data_nascita)
    VALUES (?,?,?,?)`;
    const [res] = await connection.query(query, [nome, cognome, codice_fiscale, data_nascita]);
    return res.insertId;
  }

const updatePerson = async (id, nome, cognome, codice_fiscale, data_nascita) => {
    const connection = await getMyConnection();
    const query = 'UPDATE persona SET nome = ?, cognome = ?, codice_fiscale = ?, data_nascita = ? WHERE id = ?';
    const [ res ] = await connection.query(query, [nome, cognome, codice_fiscale, data_nascita, id]);
    return res.affectedRows === 1;
}

const deletePerson = async (person_id) => {
    const connection = await getMyConnection();
    const query = 'DELETE FROM persona WHERE id = ?';
    const [ res ] = await connection.query(query, [person_id]);
    return res.affectedRows === 1;
}

// for middleware
const personExistsById = async (person_id) => {
    const connection = await getMyConnection();
    const query = 'SELECT 1 FROM persona WHERE id = ?';
    const rows = await connection.query(query, [person_id]);
    return rows.length > 0;
}


module.exports = {
    listaPersone,
    personById,
    insertPerson,
    updatePerson,
    deletePerson,
    personExistsById
}