const express = require('express');
const fs = require('fs');

const v3Router = express.Router();

v3Router.get('/', (req, res) => {
  return res.json({
    message: 'welcome to v3 test'
  })
});

const controllaSeIlFileEsiste = (req, res, next) => {
  const nomeFile = 'files/' + req.params.nomeFile;
  console.log('file richiesto: ' + nomeFile);
  if (!fs.existsSync(nomeFile)) {
    return res.status(404).json({
      message: 'il file non esiste'
    })
  }
  next();
}



v3Router.get('/contatori', (req, res) => {
  console.log('siamo nella rotta contatore lista v3');

  try {
    const listFiles = fs.readdirSync('files/');

    const listaFiltrata = listFiles.filter(
      nomeFile => nomeFile !== '.gitkeep'
    )
    return res.json(listaFiltrata);
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      errore: e.message
    })
  }
});
v3Router.head('/contatori/:nomeFile', controllaSeIlFileEsiste, (req, res) => {
  console.log('siamo nella rotta contatore v3');
  return res.status(204).send();
});

// v3Router.options() ?? TODO

v3Router.get('/contatori/:nomeFile', controllaSeIlFileEsiste, (req, res) => {
  console.log('siamo nella rotta contatore v3');

  try {
    const nomeFile = 'files/' + req.params.nomeFile;
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

v3Router.post('/contatori', (req, res) => {
  console.log('siamo nella rotta di creazione del contatore v3');

  try {
    const nomeFile = 'files/' + req.body.nomeFile;
    console.log('file richiesto: ' + nomeFile);

    if (!fs.existsSync(nomeFile)) {
      // il file non esiste, lo scrivo
      fs.writeFileSync(nomeFile, "0");
      return res.json({
        ok: true
      })
    } else {
      // il file esiste, non devo fare niente, errore client!
      return res.status(409).json({
        errore: 'il file esiste già'
      })
    }
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      errore: e.message
    })
  }
});

v3Router.delete('/contatori/:nomeFile', controllaSeIlFileEsiste, (req, res) => {
  console.log('siamo nella rotta contatore v3 delete');

  try {
    const nomeFile = 'files/' + req.params.nomeFile;
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

v3Router.put('/contatori/:nomeFile', controllaSeIlFileEsiste, (req, res) => {
  try {
    const nomeFile = 'files/' + req.params.nomeFile;
    const nuovoValore = req.body.nuovoValore;
    fs.writeFileSync(nomeFile, nuovoValore.toString());
    return res.json({
      ok: true,
      nuovoValore: nuovoValore
    })
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      errore: e.message
    })
  }
});

v3Router.patch('/contatori/:nomeFile', controllaSeIlFileEsiste, (req, res) => {
  try {
    const nomeFile = 'files/' + req.params.nomeFile;
    const incremento = req.body.incremento;

    let contenuto = fs.readFileSync(nomeFile);

    nuovocontenuto = parseInt(contenuto);
    nuovocontenuto = nuovocontenuto + incremento;

    fs.writeFileSync(nomeFile, nuovocontenuto.toString());
    return res.json({
      ok: true,
      nuovoValore: nuovocontenuto
    });
  } catch (e) {
    console.log(e);

    return res.status(500).json({
      errore: e.message
    })
  }
});

module.exports = {
  v3Router
}