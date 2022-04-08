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
    const connection = getMyConnection();
    const query = 'UPDATE persona SET nome = ?, cognome = ?, data_nascita = ?, codice_fiscale = ?, data_nascita = ? WHERE id = ?';
    const [ res ] = await connection.query(query [nome, cognome, codice_fiscale, data_nascita]);
    return res.affectedRows === 1;
}


module.exports = {
    listaPersone,
    personById,
    insertPerson,
    updatePerson
}