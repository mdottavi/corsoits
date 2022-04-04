const mysql = require('mysql2/promise')

console.log('inzio');

// create the connection to database

let connection;

mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'piattaforma_vaccini'
}).then(
  conn => {
    connection = conn;
    console.log('abbiamo fatto la connessione');

    // simple query
    return connection.query('select * from persona')
  }
).then(
  (response) => {
    const results = response[0];
    const fields = response[1];
    console.log('ho fatto la query');
    console.log(results); // results contains rows returned by server
  }
).catch(
  (err) => {
    console.log(err);
  }
).finally(
  () => {
    connection.end();
  }
);



console.log('fine');