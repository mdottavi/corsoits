const { getConnection } = require("../connesione")


const listPersona = async () => {
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM persona')
    return rows;
}

const insertPersona = async (nome, cognome, codice_fiscale, data_nascita) => {
    const connection = await getConnection();
    const query =  `INSERT INTO persona (nome, cognome, codice_fiscale, data_nascita)
    VALUES (?,?,?,?)`;
    const [res] = await connection.query(query, [nome, cognome, codice_fiscale, data_nascita]);
    return res.insertId;
}

const personaExistById = async (id_persona)  => {
    const connection = await getConnection();
    const query = `SELECT * FROM persona WHERE id = ?`;
    const [rows] = await connection.query(query, [id_persona]);
    return rows.length > 0;
}

const getPersonaById = async (id_persona) => {
    const connection = await getConnection();
    const query = `SELECT * FROM persona WHERE id = ?`;
    const [rows] = await connection.query(query, [id_persona]);
    return rows[0];
}

const updatePersona = async (id, nome, cognome, codice_fiscale, data_nascita) => {
    const connection = await getConnection();
    const query = `UPDATE persona SET nome = ?, cognome = ?, codice_fiscale = ?, data_nascita = ?
    WHERE id = ?`;
    const [res] = await connection.query(query, [nome, cognome, codice_fiscale, data_nascita, id]);
    return res.affectedRows === 1;
}

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
  
    params.push(id);
    const query = `UPDATE persona SET ${campi.map(campo => campo + ` = ?`).join(',')} WHERE id = ?`;
    const [res] = await connection.query(query, params);
    return res.affectedRows === 1;
}

const deleteById = async (id) => {
  const connection = await getConnection();
  const query = `DELETE FROM persona WHERE id = ?`;
  const [res] = await connection.query(query,[id]);
  return res.affectedRows===1;
}

module.exports = {
    listPersona,
    insertPersona,
    personaExistById,
    getPersonaById,
    updatePersona,
    updateCampiPersona,
    deleteById

}