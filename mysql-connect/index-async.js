const express = require('express')
const mysql = require('mysql2/promise')
const app = express()

app.get('/test', async function (req, res) {
  console.log('siamo nell handler test');
  // get the client
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'piattaforma_vaccini'
  });
  // create the connection to database
  try {
   
    console.log('abbiamo fatto la connessione');
    // simple query
    const query = await connection.query('select * from persona'); // ci mette 1 secondo
    const query2 = await connection.query('select * from prenotazione'); // ci mette 3 secondi
    // ci ha messo 4 secondi;

    // da qui
    const [contemporaneo1, contemporaneo2] = await Promise.all([
      connection.query('select * from persona'),  // ci mette 1 secondo
      connection.query('select * from prenotazione') // ci mette 3 secondi
    ])
    // a qui 3 secondi

    const results = query[0];
    const fiedls = query[1];
  
    console.log('ho fatto la query');
    console.log(results); // results contains rows returned by server
    // console.log(fields); // fields contains extra meta data about results, if available
    res.json(results).send();

    console.log('abbiamo richiesto la query');
  } catch (err) {
    res.status(500).json({
      messaggio: "C'è stato un errore"
    })
  } finally {
    connection.end();
  }
  // }).send();
  // console.log('ho inviatola risposta');
});

app.listen(3000);