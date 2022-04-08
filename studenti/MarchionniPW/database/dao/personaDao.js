const { getConnection } = require('../connessione')

const listPersona = async () => {
  const connection = await getConnection();
  const [rows] = await connection.query('SELECT * FROM persona')
  return rows;
}

const prova = 404

module.exports = {
    listPersona, 
    prova
  }