const express = require('express');
const fs = require('fs');

const v2Router = express.Router();

v2Router.get('/', (req, res) => {
  return res.json({
    message: 'welcome to v2 test'
  })
});

v2Router.get('/contatori/:nomeFile', (req, res) => {
  console.log('siamo nella rotta contatore v2');

  try {
    const nomeFile = req.params.nomeFile;
    console.log('file richiesto: ' + nomeFile);
    if (!fs.existsSync(nomeFile)) {
      return res.status(404).json({
        message: 'il file non esiste'
      })
    }

    const contenuto = fs.readFileSync(nomeFile);
    console.log("contenuto file =" + contenuto);
    const nuovocontenuto = parseInt(contenuto);
    return res.json({
      conto: nuovocontenuto
    })
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      errore: e.message
    })
  }
});

v2Router.post('/contatori', (req, res) => {
  console.log('siamo nella rotta di aggiornamento del contatore v2');

  try {
    const nomeFile = req.body.nomeFile;
    const incremento = req.body.incremento;
    console.log('file richiesto: ' + nomeFile);
    console.log('incremento richiesto: ' + incremento);

    let nuovocontenuto = null;

    if (!fs.existsSync(nomeFile)) {
      nuovocontenuto = incremento;
    } else {
      let contenuto = fs.readFileSync(nomeFile);
      console.log("contenuto file=" + contenuto);
      nuovocontenuto = parseInt(contenuto);
      nuovocontenuto = nuovocontenuto + incremento;
      console.log("Tipo di nuovoconteuto " + typeof (nuovocontenuto));
    }

    fs.writeFileSync(nomeFile, nuovocontenuto.toString());
    return res.json({
      ok: true
    })
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      errore: e.message
    })
  }
});

v2Router.delete('/contatori/:nomeFile', (req, res) => {
  console.log('siamo nella rotta contatore v2 delete');

  try {
    const nomeFile = req.params.nomeFile;
    console.log('file richiesto: ' + nomeFile);
    if (!fs.existsSync(nomeFile)) {
      return res.status(404).json({
        message: 'il file non esiste'
      })
    }

    fs.unlinkSync(nomeFile);
    console.log("abbiamo eliminato il file");
    return res.status(204).send()
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      errore: e.message
    })
  }
});


module.exports = {
  v2Router
}