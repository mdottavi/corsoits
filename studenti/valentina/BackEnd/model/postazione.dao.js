const { getConnection } = require('../common/connessione')
const config= require('config');
const { logger } = require('../common/logging');

const listPostazione = async (pagenum,luogo,disponibili) => {
  const connection = await getConnection();
  let numres=config.get('max-results-per-page');
  let query='SELECT * FROM postazione';
  if (disponibili) {
    query="SELECT postazione.* , prenotazione.id as pren_id FROM postazione left join prenotazione on postazione.id = prenotazione.postazione_id WHERE prenotazione.id IS NULL";
  }

  if ( luogo ) {
    if ( disponibili) {
      query += ' AND postazione.luogo ="'+luogo + '"';  
    } else {
      query += ' WHERE postazione.luogo ="'+luogo + '"';
    }
  } 

  if ( pagenum > 0 ) {
    let start=(pagenum-1)*numres;
    query += ' LIMIT '+numres + ' OFFSET '+start;
  } 
  logger.debug('Query:' + query);
  const [rows] = await connection.query(query);
  logger.debug('Query Result:', rows);
  return rows;
}

const postazioneExistById = async (id_postazione) => {
  const connection = await getConnection();
  const query = 'SELECT 1 FROM postazione WHERE id = ?';
  const [rows] = await connection.query(query, [id_postazione]);
  return rows.length > 0;
}

const getPostazioneById = async (id_postazione) => {
  const connection = await getConnection();
  const query = 'SELECT * FROM postazione WHERE id = ?';
  const [rows] = await connection.query(query, [id_postazione]);
  return rows[0];
}
// ALT + 0 0 9 6 => `
const insertPostazione = async (data_ora, luogo) => {
  const connection = await getConnection();
  const query = `INSERT INTO postazione (data_ora, luogo) VALUES (?,?)`;
  const [res] = await connection.query(query, [data_ora, luogo]);
  return res.insertId;
}

const updatePostazione = async (id, data_ora, luogo) => {
  const connection = await getConnection();
  const query = `UPDATE postazione SET data_ora = ?, luogo = ? WHERE id = ?`;
  const [res] = await connection.query(query, [data_ora, luogo, id]);
  return res.affectedRows === 1;
}

module.exports = {
  listPostazione,
  postazioneExistById,
  getPostazioneById,
  insertPostazione,
  updatePostazione
}