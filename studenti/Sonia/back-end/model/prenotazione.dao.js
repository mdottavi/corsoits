const { config } = require("config");
const { getConnection } = require("../common/connection");
const { logger } = require("../common/logging");

const listPrenotazione = async (pagenum) => {
  const connection = await getConnection();
  // let numres=config.get('max-results-per-page');
  let query=`SELECT prenotazione.*, 
                    postazione.id as post_id, postazione.luogo , postazione.data_ora,
                    persona.id as pers_id, persona.nome, persona.cognome, persona.codice_fiscale, persona.data_nascita, persona.foto_tessera_sanitaria
                    FROM prenotazione  
                LEFT JOIN postazione ON prenotazione.postazione_id = postazione.id
                LEFT JOIN persona    ON prenotazione.persona_id = persona.id
     `;
  if ( pagenum > 0 ) {
    let start=(pagenum-1) /* *numres */;
    query += /* ' LIMIT '+numres + */ ' OFFSET '+start;
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
  const query = `SELECT prenotazione.*, 
    postazione.id as post_id, postazione.luogo , postazione.data_ora,
    persona.id as pers_id, persona.nome, persona.cognome, persona.codice_fiscale, persona.data_nascita, persona.foto_tessera_sanitaria
    FROM prenotazione  
  LEFT JOIN postazione ON prenotazione.postazione_id = postazione.id
  LEFT JOIN persona    ON prenotazione.persona_id = persona.id
  WHERE prenotazione.id = ?`;
  const [rows] = await connection.query(query, [id_prenotazione]);
  return rows[0];
}
// ALT + 0 0 9 6 => `
const insertPrenotazione = async (id_persona, postazione_id, id_somministrazione=null) => {
  const connection = await getConnection();
  const query = `INSERT INTO prenotazione (persona_id, somministrazione_id, postazione_id)
  VALUES (?,?,?)`;
  const [res] = await connection.query(query, [id_persona, id_somministrazione, postazione_id]);
  return res.insertId;
}

const updatePrenotazione = async (id, id_persona, postazione_id, id_somministrazione=null) => {
  const connection = await getConnection();
  const query = `UPDATE prenotazione SET persona_id = ?, somministrazione_id = ?, postazione_id = ?
  WHERE id = ?`;
  const [res] = await connection.query(query, [id, id_persona, postazione_id, id_somministrazione=null]);
  return res.affectedRows === 1;
}

const prenotazioneDeleteById = async (id_prenotazione) => {
  const connection = await getConnection();
  const query = 'DELETE FROM prenotazione WHERE id = ?';
  const [res] = await connection.query(query, [id_prenotazione]);
  return res.affectedRows === 1;
}

// ^^^^^^^^^^^^^^^^^^^^^^^^^

const updateCampiPersona = async (id, nome, cognome, codice_fiscale, data_nascita) => {
  const connection = await getConnection();
  const campi = [];
  const params = [];
  if (nome !== undefined) {
    campi.push('nome');
    params.push(nome);
  }
  if (cognome !== undefined) {
    campi.push('cognome');
    params.push(cognome);
  }
  if (codice_fiscale !== undefined) {
    campi.push('codice_fiscale');
    params.push(codice_fiscale);
  }
  if (data_nascita !== undefined) {
    campi.push('data_nascita');
    params.push(data_nascita);
  }
  // campi = ['nome', 'cognome']
  // campi = ['nome = ?', 'cognome = ?']

  params.push(id);
  const query = `UPDATE persona SET ${campi.map(campo => campo + ` = ?`).join(',')} WHERE id = ?`;
  const [res] = await connection.query(query, params);
  return res.affectedRows === 1;
}

/**
 * @deprecated il soft delete non è prefisto per la persona 
*/
const softDelete = async (id_persona) => {
  const query = `UPDATE persona SET is_deleted = 1 WHERE id = ?`
  const [res] = await connection.query(query, [id_persona]);
  return res.affectedRows === 1;
}

module.exports = {
  listPrenotazione,
  getPrenotazioneById,
  prenotazioneExistById,
  insertPrenotazione,
  updatePrenotazione,
  prenotazioneDeleteById
}