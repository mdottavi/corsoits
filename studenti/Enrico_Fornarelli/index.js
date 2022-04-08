const express= require('express');
const mysql = require('mysql2')
const app = express()


app.get('/test', function (req, res) {
    console.log('siamo nell handler test');

const connessione=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'piattaforma_vaccini'
})

connessione.query(
    'select * from persona',
    function (err, results, fields) {
      console.log('ho fatto la query');
      console.log(results);


      connessione.query(
        'select * from prenotazione',
        function (err, results, fields) {
          console.log('ho fatto la seconda query');
          console.log(results);
        }
      )
      res.write.json(results).send();
      
    });
      console.log('abbiamo richiesto la query');

      res.json({
        ok: false
      }).send();
       console.log('ho inviatola risposta');
    
});

app.post('/agg', function(req,res){
    console.log('siamo nel post')

    const connessionepost=mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: 'piattaforma_vaccini'
    })

    connessionepost.query(
        "insert into piattaforma_vaccini.persona values(null,'giovanni','filinelli','grfrf457','1997-09-10',null,'1992-10-10','2011-11-11')",
        function (err, results, fields) {
            console.log('ho fatto la query post');
            console.log(results);

            res.json(results).send();
        })

        

        console.log('abbiamo richiesto la query');

      res.json({
        ok: false
      }).send();
       console.log('ho inviatola risposta');

})

app.listen(3000)