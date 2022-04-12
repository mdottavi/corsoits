const { Router } = require('express');
const { listPersona, getPersonaById, insertPersona, updatePersona, updateCampiPersona, softDelete, updateFotoPersona, cancellaPerId } = require('../db/dao/persona.dao');
const { checkPersonaExists, checkAndGetPersona } = require('../middlewares/persona-exists');
const { writeFile } = require('fs/promises');
const { randomUUID } = require('crypto');


const routerPersona = Router();

//lista  persone
routerPersona.get('/', async (req, res) => {
  const persone = await listPersona();
  return res.json(persone).send()
})

//ottieniamo una singola persona attraverso id
routerPersona.get('/:id_persona', checkAndGetPersona, async (req, res) => {
  return res.json(req.persona).send();
})

//creiamo una persona
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

//modifichiamo persona
routerPersona.put('/:id_persona', checkPersonaExists, async (req, res) => {
  const { nome, cognome, codice_fiscale, data_nascita } = req.body;
  const id_persona = req.params.id_persona;

  const ok = await updatePersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
  if (ok) {
    res.status(204).send()
  } else {
    res.status(500).json({
      message: 'errore!'
    })
  }
})



//modifichiamo solo alcuni campi di persona
routerPersona.patch('/:id_persona', checkPersonaExists, async (req, res) => {
  let { nome, cognome, codice_fiscale, data_nascita } = req.body;
  const id_persona = req.params.id_persona;
  

  const ok = await updateCampiPersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
  if (ok) {
    res.status(204).send()
  } else {
    res.status(500).json({
      message: 'errore!'
    })
  }
})
//eliminiamo persona
 routerPersona.delete('/:id_persona', checkPersonaExists, async (req, res) => { 
  try{
  const id_persona = req.params.id_persona;
  const cancellato = await cancellaPerId(id_persona);
  res.status(200).json({
    message: 'eliminato!'
  }).send();
  }catch(e){
    console.log('error: ' + e);
    res.status(500).send();
  }
   
})

routerPersona.delete('/:id_persona/soft', checkPersonaExists, async (req, res) => {
  await softDelete(req.params.id_persona)
  return res.status(204).send();
})

module.exports = {
  routerPersona
};