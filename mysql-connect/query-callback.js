const mysql = require('mysql2')

console.log('inzio');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'piattaforma_vaccini'
});

console.log('abbiamo fatto la connessione');
// simple query
connection.query(
  'select * from alieno',
  function (err, results, fields) {
    if(err) {
      console.log('errore', err)
    } else {
      console.log('ho fatto la query');
      console.log(results); // results contains rows returned by server
    }
    connection.end();
  }
);

console.log('fine');