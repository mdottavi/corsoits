const express = require('express')
const mysql = require('mysql2')
const app = express()

app.get('/test', function (req, res) {
  console.log('siamo nell handler test');
  // get the client

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
    'select * from persona',
    function (err, results, fields) {
      console.log('ho fatto la query');
      console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about results, if available

      connection.query(
        'select * from prenotazione',
        function (err, results, fields) {
          console.log('ho fatto la seconda query');
          console.log(results);
        }
      )
      res.json(results).send();
    }
  );
  console.log('abbiamo richiesto la query');

  // res.json({
  //   ok: false
  // }).send();
  // console.log('ho inviatola risposta');
})

app.listen(3000);