const { getConnection } = require('../common/connessione')
const config= require('config');
const { logger } = require('../common/logging');

const listPrenotazione = async (pagenum) => {
  const connection = await getConnection();
  let numres=config.get('max-results-per-page');
  let query=`SELECT prenotazione.*, 
                    postazione.id as post_id, postazione.luogo , postazione.data_ora,
                    persona.id as pers_id, persona.nome, persona.cognome, persona.codice_fiscale, persona.data_nascita, persona.foto_tessera_sanitaria
                    FROM prenotazione  
                LEFT JOIN postazione ON prenotazione.postazione_id = postazione.id
                LEFT JOIN persona    ON prenotazione.persona_id = persona.id
     `;
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
  let query=`SELECT prenotazione.*, 
              postazione.id as post_id, postazione.luogo , postazione.data_ora,
              persona.id as pers_id, persona.nome, persona.cognome, persona.codice_fiscale, persona.data_nascita, persona.foto_tessera_sanitaria
              FROM prenotazione  
              LEFT JOIN postazione ON prenotazione.postazione_id = postazione.id
              LEFT JOIN persona    ON prenotazione.persona_id = persona.id 
              WHERE prenotazione.id = ?
`
  const [rows] = await connection.query(query, [id_prenotazione]);
  return rows[0];
}
// ALT + 0 0 9 6 => `
const insertPrenotazione = async (persona_id, postazione_id, somministrazione_id=null) => {
  const connection = await getConnection();
  const query = `INSERT INTO prenotazione (persona_id, somministrazione_id, postazione_id) VALUES (?,?,?)`;
  const [res] = await connection.query(query, [persona_id, somministrazione_id, postazione_id]);
  return res.insertId;
}

const updatePrenotazione = async (id, persona_id, postazione_id,somministrazione_id=null) => {
  const connection = await getConnection();
  const query = `UPDATE prenotazione SET persona_id = ?, somministrazione_id = ?, postazione_id= ? WHERE id = ?`;
  const [res] = await connection.query(query, [persona_id, somministrazione_id, postazione_id, id]);
  return res.affectedRows === 1;
}

const prenotazioneDeleteById = async (id_prenotazione) => {
  const connection = await getConnection();
  const query = 'DELETE FROM prenotazione WHERE id = ?';
  const [res] = await connection.query(query, [id_prenotazione]);
  logger.debug('Query:' + query);
  return res.affectedRows === 1;;
}

module.exports = {
  listPrenotazione,
  prenotazioneExistById,
  getPrenotazioneById,
  insertPrenotazione,
  updatePrenotazione,
  prenotazioneDeleteById
}