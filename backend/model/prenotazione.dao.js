const { getConnection } = require('../common/connessione')
const config= require('config');
const { logger } = require('../common/logging');

const listPrenotazione = async (pagenum) => {
  const connection = await getConnection();
  let numres=config.get('max-results-per-page');
  let query='SELECT * FROM prenotazione';
  if ( pagenum > 0 ) {
    let start=(pagenum-1)*numres;
    query += ' LIMIT '+numres + ' OFFSET '+start;
  } 
  logger.debug('Query:' + query);
  const [rows] = await connection.query(query);
  logger.debug('Query Result:', rows);
  return rows;
}

const prenotazioneExistById = async (id_prenotazione) => {
  const connection = await getConnection();
  const query = 'SELECT 1 FROM prenotazione WHERE id = ?';
  const [rows] = await connection.query(query, [id_prenotazione]);
  return rows.length > 0;
}

const getPrenotazioneById = async (id_prenotazione) => {
  const connection = await getConnection();
  const query = 'SELECT * FROM prenotazione WHERE id = ?';
  const [rows] = await connection.query(query, [id_prenotazione]);
  return rows[0];
}
// ALT + 0 0 9 6 => `
const insertPrenotazione = async (persona_id, data_ora, luogo, somministrazione_id=null) => {
  const connection = await getConnection();
  const query = `INSERT INTO prenotazione (persona_id, somministrazione_id, data_ora, luogo) VALUES (?,?,?,?,?)`;
  const [res] = await connection.query(query, [persona_id, somministrazione_id, data_ora, luogo]);
  return res.insertId;
}

const updatePrenotazione = async (id, persona_id, data_ora, luogo,somministrazione_id=null) => {
  const connection = await getConnection();
  const query = `UPDATE prenotazione SET persona_id = ?, somministrazione_id = ?, data_ora = ?, luogo = ? WHERE id = ?`;
  const [res] = await connection.query(query, [persona_id, somministrazione_id, data_ora, luogo, id]);
  return res.affectedRows === 1;
}

module.exports = {
  listPrenotazione,
  prenotazioneExistById,
  getPrenotazioneById,
  insertPrenotazione,
  updatePrenotazione
}