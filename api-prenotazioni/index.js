require('dotenv').config();
const express = require('express');
const { routerPersona } = require('./rotte/persona');
const { routerPrenotazionePersona } = require('./rotte/prenotazione-persona');
const { json, urlencoded } = require('body-parser');
const fileUpload = require('express-fileupload');
const { routerUtente } = require('./rotte/utente');
const { getUtenteByUsername } = require('./db/dao/utente.dao');
const { compare } = require('bcrypt');
const { randomUUID } = require('crypto');

const tokens = {};

const app = express()

app.use(express.static('files'));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(fileUpload());

app.get('/test', function (req, res) {
  res.json({
    messaggio: 'funziona tutto'
  }).send()
});

app.use('/persona', routerPersona);
app.use('/persona/:id_persona/prenotazione', routerPrenotazionePersona);
app.use('/prenotazione', routerPersona);
app.use('/utente', routerUtente);



app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const utente = await getUtenteByUsername(username);
  if(utente) {
    const match = await compare(password, utente.password);
    if(match) {
      const newToken = randomUUID();
      tokens[newToken] = {
        utente_id: utente.id,
        scadenza: (new Date).getTime() + ( 1000 * 60 * 60 )
      }
      return res.json({
        token: newToken
      }).send();
      //è il vero utente
    }
  }
  return res.status(404).json({
    message: 'Username o password non trovati'
  })
})

const controllaAutenticazione = (req, res, next) => {
  const header = req.headers['authorization'];
  if(!header) {
    return res.status(401).json({
      messaggio: 'metti header per favore'
    })
  }
  const [bearer, token] = header.split(' ');
  if(bearer !== 'Bearer' || !token || token.lenth === 0) {
    return res.status(401).json({
      messaggio: 'metti header per bene per favore'
    })
  }
  if(!(token in tokens)) {
    return res.status(401).json({
      messaggio: 'token sconosciuto'
    })
  }
  req.utente = tokens[token].utente_id;
  next();
  // Controlliamo in qualche modo il token
}

app.get('/rotta-protetta', controllaAutenticazione, (req, res) => {
  res.json({
    message: 'funziona',
    utente: req.utente
  })
})

app.listen(3000);

