const { getConnection } = require('../connessione')

const listPersona = async () => {
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * FROM persona')
  return rows;
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

module.exports = {
    listPersona, 
    personaExistById, 
    getPersonaById
  }