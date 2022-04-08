const { getConnection } = require('../connessione');

const insertUtente = async (username, password, nome, cognome) => {
  const connection = await getConnection();
  const query = `INSERT INTO utente (username, password, nome, cognome)
  VALUES (?,?,?,?)`;
  const [res] = await connection.query(query, [username, password, nome, cognome]);
  return res.insertId;
}

const getUtenteByUsername = async (username) => {
  const connection = await getConnection();
  const query = `SELECT * FROM utente WHERE username = ?`;
  const [res] = await connection.query(query, [username]);
  return res[0];
}

module.exports = {
  insertUtente,
  getUtenteByUsername
}