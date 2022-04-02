const express= require("express");
const bodyParser = require('body-parser');

console.log("Server express che salva i dati solo in memoria. Al restart si perde tutto.");

let StorageDelleRisorse=[
    {
        "nome":"Mario", 
        "cognome":"Verdi",
        "data" : "1/1/1970" }];
  
const app=express();
app.use(bodyParser.json());

// Semplice get
app.get('/', function  (req, res) {
    console.log("richiesta lista risorse:" +StorageDelleRisorse.length);
    res.json(StorageDelleRisorse);
});

// esercizio2: Semplice get e Post
app.get('/:indice', function (req, res) {
    console.log('get della risorsa numero: ' + req.params.indice);
    if (StorageDelleRisorse[req.params.indice]){
        return res.json(StorageDelleRisorse);
    } else {
        return res.status(404).json({});
    }
});

app.post('/', function (req, res) {
    console.log('creazione risorsa nuova');
    if (req.body) {
        StorageDelleRisorse.push(req.body);
        return res.json(StorageDelleRisorse.length-1);
    } else {
        return res.status(204).json(-1);
    }
});

app.listen(9000);