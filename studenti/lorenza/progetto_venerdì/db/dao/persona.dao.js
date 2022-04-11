const { process_params } = require('express/lib/router');
const {getConnection} = require ('../connessione.js');

const listaPersone = async ()=>{
    const connessione = await getConnection();
    const [rows] = await connessione.query(`SELECT * FROM persona`)
    return rows;
}

const personaExistById = async (id)=>{
    const connessione = await getConnection();
    const query = `SELECT 1 FROM persona WHERE id =?`;
    const [res] = await connessione.query(query,[id])
    return res.length>0;
}


const getPersonaById = async (id_persona)=>{
    const connessione = await getConnection();
    const query = `SELECT * FROM persona WHERE id =?`;
    const [rows] = await connessione.query(query,[id_persona])
    return rows[0];
}

const createPersona = async (nome, cognome, codice_fiscale, data_nascita)=>{
    const connessione = await getConnection();
    const query = `INSERT INTO persona (nome, cognome, codice_fiscale, data_nascita)
    VALUES (?,?,?,?)`;
    const [rows] = await connessione.query(query,[nome, cognome, codice_fiscale, data_nascita])
    return rows.insertId;
}

const modificaPersona = async (id, nome, cognome, codice_fiscale, data_nascita)=>{
    const connessione = await getConnection();
    const query = `UPDATE persona 
    SET nome=?, cognome=?, codice_fiscale=?, data_nascita=?
    WHERE id=?`;
    const [res] = await connessione.query(query,[nome, cognome, codice_fiscale, data_nascita,id])
    return res.affectedRows===1
}
const aggiornaCampiPersona = async (id, nome, cognome, codice_fiscale, data_nascita)=>{
    const connessione = await getConnection();
    const campi = [];
    const parametri= [];
    if (nome!==undefined){
        campi.push("nome");
        parametri.push(nome);
    }
    if (cognome!==undefined){
        campi.push("cognome");
        parametri.push(cognome);
    }
    if (codice_fiscale!==undefined){
        campi.push("codice_fiscale");
        parametri.push(codice_fiscale);
    }
    if (data_nascita!==undefined){
        campi.push("data_nascita");
        parametri.push(data_nascita);
    }
    parametri.push(id);
    const query = `UPDATE persona SET ${campi.map(campo=>campo+ "= ?").join(',')} WHERE id=?`;
    const [res]= await connessione.query(query, parametri);
    return res.affectedRows === 1;
}

const cancellaPerId = async (id) =>{
    const connection = await getConnection();
    const query = `DELETE FROM persona WHERE id = ?`;
    const [res] = await connection.query(query,[id]);
    return res.affectedRows===1;
  }

module.exports={
    personaExistById,
    getPersonaById,
    listaPersone,
    createPersona,
    modificaPersona,
    aggiornaCampiPersona,
    cancellaPerId}