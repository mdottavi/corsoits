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

  // simple query
  connection.query(
    'select * from persona',
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );

  return res.json({
    ok: false
  });
})

app.listen(3000);