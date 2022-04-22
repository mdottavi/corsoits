const { Router } = require('express');
const { listPersona, getPersonaById, insertPersona, updatePersona, updateCampiPersona, softDelete, updateFotoPersona } = require('../db/dao/persona.dao');
const { checkPersonaExists, checkAndGetPersona } = require('../middlewares/persona-exists');
const { writeFile } = require('fs/promises');
const { randomUUID } = require('crypto');
const { raw } = require('body-parser');
// const { routerPrenotazionePersona } = require('./prenotazione-persona');
const routerPersona = Router();

routerPersona.get('/', async (req, res) => {
  const persone = await listPersona();
  return res.json(persone).send()
})

routerPersona.post('/', async (req, res) => {
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    let percorsoFile;
    if (req.files?.immagine) {
      const randomName = randomUUID();
      percorsoFile = `${randomName}-${req.files.immagine.name}`;
      await writeFile(`files/${percorsoFile}`, req.files.immagine.data);
    }
    const id_persona = await insertPersona(nome, cognome, codice_fiscale, data_nascita, percorsoFile);
    return res.json({
      id_persona
    });
})




module.exports = {
    routerPersona
};