const { config } = require("config");
const { getConnection } = require("../common/connection");
const { logger } = require("../common/logging");

const listPostazione = async (pagenum, luogo, disponibili) => {
  const connection = await getConnection();
  // let numres = config.get('max-results-per-page');
  let query = 'SELECT * FROM postazione';

  if (disponibili){
    query += 'SELECT postazione.*, prenotazione.id as pren_id FROM postazione LEFT JOIN prenotazione on postazione.id = prenotazione.postazione_id WHERE prenotazione.id ID NULL';
    }  

  if (luogo){
    if (disponibili) {
      query += ' AND luogo = ' + luogo + ' ';
    } else {
      query += 'WHERE luogo = ' + luogo + ' ';
    }  
  }

  if ( pagenum > 0 ) {
    let start=(pagenum-1) /* * numres*/;
    query += /* ' LIMIT '+numres */ + ' OFFSET '+start;
  } 
  logger.debug('Query:' + query);
  const [rows] = await connection.query(query);
  logger.debug('Query Result:', rows);
  return rows;
}

//   if (pagenum > 0) {
//     let start = (pagenum-1) /* numres */;
//     // query += /* ' LIMIT ' + numres + */ ' OFFSET ' + start;
// }
  // logger.debug('Query:' + query);
  // const [rows] = await connection.query(query);
  // logger.debug('Query Result: ' + rows);
  // return rows;

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
const insertPostazione = async (luogo, data_ora) => {
  const connection = await getConnection();
  const query = `INSERT INTO postazione (luogo, data_ora)
  VALUES (?,?)`;
  const [res] = await connection.query(query, [luogo, data_ora]);
  return res.insertId;
}

const updatePostazione = async (id, luogo, data_ora) => {
  const connection = await getConnection();
  const query = `UPDATE postazione SET luogo = ?, data_ora = ?
  WHERE id = ?`;
  const [res] = await connection.query(query, [luogo, data_ora, id]);
  return res.affectedRows === 1;
}

const postazioneDeleteById = async (id_postazione) => {
  const connection = await getConnection();
  const query = 'DELETE FROM postazione WHERE id = ?';
  const [res] = await connection.query(query, [id_postazione]);
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
  listPostazione,
  getPostazioneById,
  postazioneExistById,
  insertPostazione,
  updatePostazione,
  postazioneDeleteById
}