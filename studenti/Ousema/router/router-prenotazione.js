const { Router } = require('express');
const { listaPrenotazioni, getPrenotazioneById, getPrenotazioneByDate, getPrenotazioneByLuogo, insertPrenotazione, softDeletePrenotazione } = require('../dao/prenotazione.dao');
const { checkPersonaExists } = require('../middleware/persona-middle');

const routerPrenotazione = Router();


routerPrenotazione.get('/', async (req, res) => {
    const persone = await listaPrenotazioni();
    return res.json(persone).send()
  })

routerPrenotazione.get('/:id_prenotazione', async (req,res) => {
    const prenotazione = await getPrenotazioneById(req.params.id_prenotazione);
    return res.json(prenotazione).send();
  });

routerPrenotazione.get('/data/:data_prenotazione', async (req,res) => {
    const prenotazione = await getPrenotazioneByDate(req.params.data_prenotazione);
    return res.json(prenotazione).send();
  });

routerPrenotazione.get('/luogo/:luogo', async (req,res) => {
    const prenotazione = await getPrenotazioneByLuogo(req.params.luogo);
    return res.json(prenotazione).send();
  });

routerPrenotazione.post('/', async(req,res)=> {
    const {persona_id,somministrazione_id,data_ora,luogo} = req.body;
    const id_prenotazione = await insertPrenotazione(persona_id,somministrazione_id,data_ora,luogo);
    return res.json({
        "ID prenotazione creato": id_prenotazione
    })
})

routerPrenotazione.delete('/:id_prenotazione/soft', async (req, res) => {
    const prenotazione_canc = await softDeletePrenotazione(req.params.id_prenotazione)
    if(prenotazione_canc){
      return res.status(204).send("Prenotazione cancellata con successo");
    }
  })


module.exports = {
    routerPrenotazione
}