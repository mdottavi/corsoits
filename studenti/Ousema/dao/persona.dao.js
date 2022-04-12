const { getConnection } = require("../connection/connessione");


const listaPersone = async() =>{
    const connection = await getConnection();
    const [rows] = await connection.query("SELECT * FROM persona WHERE is_deleted=0")
    return rows
}

const listaPersoneFiltratePerData = async(date) =>{
  const connection = await getConnection();
  const query = "SELECT * FROM persona WHERE is_deleted=0 AND Date(created_at) = ?"
  const [rows] = await connection.query(query,[date])
  return rows
}

const personaExistById = async (id_persona) => {
    const connection = await getConnection();
    const query = 'SELECT 1 FROM persona WHERE id = ?';
    const [rows] = await connection.query(query, [id_persona]);
    return rows.length > 0;
  }

const getPersonaById = async (id_persona) => {
    const connection = await getConnection();
    const query = 'SELECT * FROM persona WHERE id = ?';
    const [rows] = await connection.query(query, [id_persona]);
    return rows[0];
  }

const insertPersona = async (nome, cognome, codice_fiscale, data_nascita) => {
    const connection = await getConnection();
    const query = `INSERT INTO persona (nome, cognome, codice_fiscale, data_nascita)
    VALUES (?,?,?,?)`;
    const [res] = await connection.query(query, [nome, cognome, codice_fiscale, data_nascita]);
    return res.insertId;
  }

const updatePersona = async (id, nome, cognome, codice_fiscale, data_nascita) => {
    const connection = await getConnection();
    const query = `UPDATE persona SET nome = ?, cognome = ?, codice_fiscale = ?, data_nascita = ?
    WHERE id = ?`;
    const [res] = await connection.query(query, [nome, cognome, codice_fiscale, data_nascita, id]);
    return res.affectedRows === 1;
  }

const softDeletePersona = async (id_persona) => {
    const connection = await getConnection();
    const query = `UPDATE persona SET is_deleted = 1 WHERE id = ?`
    const [res] = await connection.query(query, [id_persona]);
    return res.affectedRows === 1;
  }

module.exports = {
    listaPersone,
    getPersonaById,
    personaExistById,
    insertPersona,
    updatePersona,
    softDeletePersona,
    listaPersoneFiltratePerData
}