require('dotenv').config();
const express = require('express');
const { json, urlencoded } = require('body-parser');
const { routerPersona } = require('./rotte/persona');
const app = express()

app.use(express.static('files'));
app.use(json());
app.use(urlencoded({ extended: true }));


middleware1= (req, res, next)=>{
console.log("siamo nel mw1");
next();
}

app.get ('/persona/',middleware1, (req, res)=>{
    console.log("siamo nella get da cui otterremo una lista persone");
    return res.json({
        message : "va tutto bene, dopo la dao invierò la lista"
    }).send();
})

app.get ('/persona/:id_persona',middleware1, (req, res)=>{
    console.log("siamo nella get della persona attraverso l'ID");
    const id_persona= req.params.id_persona;
    return res.json({
        message : `va tutto bene, dopo la dao invierò i dati della persona con ID ${id_persona} `
    }).send();
})

app.post ('/persona/', middleware1, (req, res)=>{
    console.log("siamo nella post: creo una persona");
    const { nome, cognome, codice_fiscale, data_nascita } = req.body;
    return res.json({
        message : "va tutto bene, dopo la dao inserirò la persona"
    }).send();
})


//app.use('/persona', routerPersona);





app.listen(3000);
