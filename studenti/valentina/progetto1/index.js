require('dotenv').config();
const express = require('express');
const { routerPersona } = require('./rotte/persona');
const app = express();

middleware1= (req, res, next)=>{
    console.log("siamo nel mw1");
    next();
    }
app.get('/persona', middleware1, (req, res) => {
    console.log("Here")
    return res.json({
        messaggio: 'lista persone'
      }).send()
})
app.get ('/persona/:id_persona',middleware1, (req, res)=>{
    console.log("ID persona");
    const id_persona= req.params.id_persona;
    return res.json({
        message : "dati di ID persona ${id_persona}"
    }).send();
})

app.post ('/persona/', middleware1, (req, res)=>{
    console.log("creo una persona");
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    return res.json({
        message : "inserisco una nuova persona"
    }).send();
})

app.use('/persona', routerPersona);

app.listen(3000);