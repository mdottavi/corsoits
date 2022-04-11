const { Router } = require('express');
const { listaPersone, listaPersoneFiltratePerData, getPersonaById, insertPersona, updatePersona, softDelete } = require('../dao/persona.dao');
const { checkPersonaExists } = require('../middleware/persona-middle');


const routerPersona = Router();

//GET lista delle persone
routerPersona.get("/", async (req,res) => {
    console.log('siamo nell handler get');
    const persone = await listaPersone();
    return res.json(persone).send()
});

//GET lista delle persone create in una certa data
routerPersona.get('/filter/:data_creazione', async (req,res) => {
    const persone = await listaPersoneFiltratePerData(req.params.data_creazione);
    return res.json(persone).send()
  });


//GET Persona by ID
routerPersona.get('/:id_persona', checkPersonaExists, async (req, res) => {
    const persona = await getPersonaById(req.params.id_persona);
    return res.json(persona).send();
  })
  
//POST Creazione persona
routerPersona.post('/', async(req,res)=> {
    const {nome,cognome,codice_fiscale,data_nascita} = req.body;
    const id_persona = await insertPersona(nome,cognome,codice_fiscale,data_nascita);
    return res.json({
        "ID Utente creato": id_persona
    })
})

//PUT MODIFICA CAMPI PERSONA
routerPersona.put('/:id_persona', checkPersonaExists, async (req, res) => {
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    const id_persona = req.params.id_persona;
    const ok = await updatePersona(id_persona, nome, cognome, codice_fiscale, data_nascita);
    if (ok) {
      res.status(204).json({
          id_persona
    }).send()
    } else {
      res.status(500).json({
        message: 'oops'
      })
    }
  })

//DELETE Soft delete persona impostando il campo is_deleted=1
routerPersona.delete('/:id_persona/soft', checkPersonaExists, async (req, res) => {
    const persona_canc =await softDeletePersona(req.params.id_persona)
    if(persona_canc){
      return res.status(204).send("Persona cancellata con successo");
    }
  })


module.exports = {
    routerPersona
  };