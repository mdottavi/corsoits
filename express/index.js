const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')

// // create application/json parser
const jsonParser = bodyParser.json()

const middleware = (req, res, next) => {
  next();
}

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(middleware)
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

app.listen(3000);