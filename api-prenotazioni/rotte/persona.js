const { Router } = require('express');
const { listPersona, getPersonaById, insertPersona, updatePersona, updateCampiPersona, softDelete, updateFotoPersona } = require('../db/dao/persona.dao');
const { checkPersonaExists } = require('../middlewares/persona-exists');
const { writeFile } = require('fs/promises');
const { randomUUID } = require('crypto');
const { raw } = require('body-parser');
// const { routerPrenotazionePersona } = require('./prenotazione-persona');
const routerPersona = Router();

/**
 * lista delle persone
 */
routerPersona.get('/', async (req, res) => {
  const persone = await listPersona();
  return res.json(persone).send()
})
// app.get('/lista', () => {})

/**
 * ottiene una singola persona tramite id
 */
routerPersona.get('/:id_persona', checkPersonaExists, async (req, res) => {
  const persona = await getPersonaById(req.params.id_persona);
  return res.json(persona).send();
})

/**
 * Creiamo una persona
 */
routerPersona.post('/', async (req, res) => {
  const { nome, cognome, codice_fiscale, data_nascita } = req.body;
  let percorsoFile;
  if (req.files?.immagine) {
    const randomName = randomUUID();
    percorsoFile = `${randomName}-${req.files.immagine.name}`;
    await writeFile(`files/${percorsoFile}`, req.files.immagine.data);
    await updateFotoPersona(id_persona, percorsoFile)
  }
  const id_persona = await insertPersona(nome, cognome, codice_fiscale, data_nascita, percorsoFile);
  return res.json({
    id_persona
  });
})

/**
 * Modifichiamo una persona
 */
routerPersona.put('/:id_persona', checkPersonaExists, async (req, res) => {
  const { nome, cognome, codice_fiscale, data_nascita } = req.body;
  const id_persona = req.params.id_persona;

  const ok = await updatePersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
  if (ok) {
    res.status(204).send()
  } else {
    res.status(500).json({
      message: 'oops'
    })
  }
})

/**
 * Modifichiamo una persona
 */
routerPersona.put('/:id_persona/foto',  checkPersonaExists,
  raw({
    type: [
      'image/png',
      'image/jpeg',
    ]
  }),
  async (req, res) => {
    console.log(req.files);
    console.log(req.body);
    const randomName = randomUUID();
    let estensione;
    switch(req.headers['content-type']) {
      case 'image/png':
        estensione = '.png'
        break;
      case 'image/jpeg':
        estensione = '.jpg'
        break;
    }
    const id_persona = req.params.id_persona;
    percorsoFile = `${randomName}${estensione}`;
    await writeFile(`files/${percorsoFile}`, req.body);
    await updateFotoPersona(id_persona, percorsoFile)
    res.status(204).send();
  })


/**
 * Modifichiamo alcuni campi di una persona
 */
routerPersona.patch('/:id_persona', checkPersonaExists, async (req, res) => {
  let { nome, cognome, codice_fiscale, data_nascita } = req.body;
  // let personaInput = req.body;
  const id_persona = req.params.id_persona;
  // const persona = await getPersonaById(id_persona);
  // if(nome === undefined) {
  //   nome = persona.nome;
  // }
  // if(cognome === undefined) {
  //   cognome = persona.cognome;
  // }
  // if(codice_fiscale === undefined) {
  //   codice_fiscale = persona.codice_fiscale;
  // }
  // if(data_nascita === undefined) {
  //   data_nascita = persona.data_nascita;
  // }
  // for(const key in persona) {
  //   if(personaInput[key] === undefined) {
  //     personaInput[key] = persona[key];
  //   }
  // }
  // const { nome, cognome, codice_fiscale, data_nascita } = personaInputs;
  // const ok = await updatePersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
  const ok = await updateCampiPersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
  if (ok) {
    res.status(204).send()
  } else {
    res.status(500).json({
      message: 'oops'
    })
  }
})
/**
 * Eliminiamo una persona
 */
routerPersona.delete('/:id_persona', checkPersonaExists, () => { })


routerPersona.delete('/:id_persona/soft', checkPersonaExists, async (req, res) => {
  await softDelete(req.params.id_persona)
  return res.status(204).send();
})

// routerPersona.use('/:id_persona/prenotazione', checkPersonaExists, routerPrenotazionePersona);
// routerPersona.use('/:id_persona/somministrazione', routerSomministrazionePersona);

module.exports = {
  routerPersona
};