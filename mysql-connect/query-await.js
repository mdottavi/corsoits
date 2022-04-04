
const mysql = require('mysql2/promise')

async function main() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'piattaforma_vaccini'
  })
  console.log('abbiamo fatto la connessione');

  // simple query

  try {
    const response = await connection.query('select * from persona')
    const results = response[0];
    const fields = response[1];
    console.log('ho fatto la query');
    console.log(results); // results contains rows returned by server

    for(const persona of results) {
      const prenotazioni = await connection.query('Select * from prenotazione');
      console.log('risultato query prenotazioni', prenotazioni[0])
    }
  } catch(err) {
    console.log(err);
  } finally {
    connection.end();
  }
}
console.log('inzio');
main();
console.log('fine');
