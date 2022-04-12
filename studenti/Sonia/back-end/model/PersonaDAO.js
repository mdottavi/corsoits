
// finalizzo nel DAO tutto ciò che ha a che fare con mysql
class PersonaDAO {
    constructor(j) {
        if (j.nome) {
            this.nome = j.nome;
        }
        if (j.cognome) {
            this.cognome = j.cognome;
        }
        if (j.codice_fiscale) {
            this.codice_fiscale = j.codice_fiscale;
        }
        if (j.data_nascita) {
            this.data_nascita = j.data_nascita;
        }
        if (j.foto_tessera_sanitaria) {
            this.foto_tessera_sanitaria = j.foto_tessera_sanitaria;
        }
    }

        // metodo statico per interrogare il database
        static listPersona = async () => { 
            const connection = await getConnection();

            // faccio la lista delle persone
            const [rows] = await connection.query('SELECT * FROM persona');

            // preparo un array vuoto
            let result = [];

            // per ogni elemento risultato dall'array creo una person DAO e la metto nell'array dei risultati
            rows.forEach((o) => {
                // 'o' è il risultato del database
                result.push(new PersonaDAO(o));
            });
            return result;
        }

        personaExistById = async (id_persona) => {
            const connection = await getConnection();
            const query = 'SELECT 1 FROM persona WHERE id = ?';
            const [rows] = await connection.query(query, [id_persona]);
            return rows.length > 0;
          }
}

module.exports = {
    PersonaDAO
}