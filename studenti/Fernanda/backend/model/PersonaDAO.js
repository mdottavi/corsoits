const{getConnection}= require('../connessione')

class PersonaDAO{

    constructor(j){
        if(j.nome){
            this.nome=j.nome;
        }
        if(j.cognome){
            this.cognome=j.cognome;
        }
        if(j.codice_fiscale){
            this.codice_fiscale=j.codice_fiscale;
        }
        if(j.data_nascita){
            this.data_nascita=j.data_nascita;
        }
        if(j.foto_tessera_sanitaria){
            this.foto_tessera_sanitaria=j.foto_tessera_sanitaria;
        }
    }


static listPersona=async () =>{
    const connection = await getConnection();
    const [rows] = await connection.query('SELECT * FROM persona')
    let result=[];
    rows.forEach ((o) => {result.push(new PersonaDAO(o))});
    return result;
}

personaExistById=async(id_persona) =>{
    const connection=await getConnection();
    const query ='SELECT 1 FROM persona WHERE id=?';
    const[rows]=await connection.query(query,[id_persona]);
    return rows.lenght > 0;
}

getPersonaById=async (id_persona) => {
    const connection = await getConnection();
    const query ='SELECT * FROM WHERE id=?';
    const [rows]=await connection.query(query,[id_persona]);
    return rows[0];
}
//ALT+0 0 9 6 =>
insertPersona= async (nome,cognome, codice_fiscale, data_nascita, percorsoFile)=>{
    const connection = await getConnection();
    const query='INSERT INTO PERSONA (nome, cognome, codice_fiscale, data_nascita,foto_tessera';
    'VALUES(?,?,?,?)';
    const[res]= await connection.query(query,[nome,cognome, codice_fiscale, data_nascita, percorsoFile]);
    return res.insertId;
}

updatePersona=async(id,nome,cognome, codice_fiscale, data_nascita)=>{
    const connection = await getConnection();
    const query='UPDATE persona SET nome=?, codice_fiscale=?, data_nascita=?';
    'WHERE id=?';
    const [res]= await connection.query(query,[nome,cognome, codice_fiscale, data_nascita]);
    return res.affectedRows===1;
}

updateFotoPersona= async(id,pathFoto)=>{
    const connection=await getConnection();
    const query='UPDATE persona SET foto_tessera_sanitaria=? WHERE id=?';
    const[res]=await connection.query(query,[pathFoto,id]);
    return res.affectedRows===1;
}


}