const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const { v2Router } = require('./v2')

// // create application/json parser
const jsonParser = bodyParser.json()

const middlewareV2 = (req, res, next) => {
  console.log('sto entrando in v2');
  next();
}

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser)
app.use(urlencodedParser)


app.get('/', function (req, res) {
  console.log('siamo nell handler get');
  const risposta = {
    messaggio: 'GET World !'
  };
  return res.json(risposta)
})

app.get('/contatore', function (req, res) {
  console.log('siamo nella rotta contatore');
  let nuovocontenuto = null;
  try {
    
    let contenuto = fs.readFileSync("contatore.dat");
    console.log("contenuto file=" + contenuto);
    nuovocontenuto = parseInt(contenuto);
    
    return res.json({
      conto: nuovocontenuto
    })
  } catch(e) {
    console.log(e);
    
    return res.status(500).json({
      errore: e.message
    })
  }
})
app.post('/contatore', function (req, res) {
  console.log('siamo nella rotta di aggiornamento del contatore');
  
  try {
    let nuovocontenuto = null;
    let contenuto = fs.readFileSync("contatore.dat");
    console.log("contenuto file=" + contenuto);
    nuovocontenuto = parseInt(contenuto);
    nuovocontenuto++;
    console.log("Tipo di nuovoconteuto " + typeof(nuovocontenuto));
    fs.writeFileSync("contatore.dat", nuovocontenuto.toString());
    return res.json({
      ok: true
    })
  } catch(e) {
    console.log(e);
    let nuovocontenuto = 1;
    fs.writeFileSync("contatore.dat", nuovocontenuto.toString());
    return res.json({
      ok: true
    })
  }
  return res.status(500).json({
    errore: e.message
  })
})

app.use('/v2', middlewareV2, v2Router);

app.listen(3000);