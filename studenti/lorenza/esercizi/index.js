const express = require('express');
const bodyParser = require('body-parser');
const fs = require ('fs');
const { url } = require('inspector');

const app = express();
app.use(bodyParser.json());

const MW_cerca_file = function (req, res, next){
    console.log('controllo se il file esiste');
    const fileCheCerco = req.params.nomefile;
    if(!fileCheCerco) {
        return res.status(404).json({
        message: "mi serve il nome del file"
        }).send()
    }    
    if (!fs.existsSync(fileCheCerco)) {
        return res.status(404).json({
        message: 'il file non esiste'
        }).send()
    }
    next();
    }


app.get('/:nomefile', MW_cerca_file, (req, res)=>{
    try{
    const fileCheCerco = req.params.nomefile;
    res.json({message: 'file trovato'});
    let c = fs.readFileSync('dati.dat');
    res.write(json(c));
    }catch(e){
        res.status(500).json({message: "c'è stato un errore",
                                errore : e});
    }
    })

app.post('/:nomefile', (req, res)=>{
    console.log('creiamo un nuovo file')
    const nomefile = req.params.nomefile;
    try{
    const c={}
    c.nome='Lorenza';
    c.cognome='pilota';
    c.citta='san benedetto del tronto';
    fs.writeFileSync(nomefile, JSON.stringify(c));    
    }catch(e){
        res.status(500).json({message: "c'è stato un errore",
                                errore : e});
    }
    res.json({message: 'file creato'});
    })

app.put('/:nomefile', MW_cerca_file, (req, res)=>{
    console.log('Modifichiamo un file esistente')
    const nomefile = req.params.nomefile;
    try{
    const c={}
    c.nome='Maria';
    c.cognome='Cancella';
    c.citta='Pietra Camela';
    fs.writeFileSync(nomefile, JSON.stringify(c));    
    }catch(e){
        res.status(500).json({message: "c'è stato un errore",
                                errore : e});
    }
    res.json({message: 'file modificato'});
    })

app.patch('/:nomefile', MW_cerca_file, (req, res)=>{
    console.log('Modifichiamo parte di un file esistente')
    const nomefile = req.params.nomefile;
    try{
    //restituisce il json scritto nel file (parse, parsa il buffer)
    let cont = JSON.parse(fs.readFileSync(nomefile));
    console.log(cont)
    const c={}
    c.nome='Maria';
    c.cognome = cont.cognome;
    c.citta='Pietra Camela';
    fs.writeFileSync(nomefile, JSON.stringify(c));    
    }catch(e){
        res.status(500).json({message: "c'è stato un errore",
                                errore : e});
    }
    res.json({message: 'file modificato solo nei campi desiderati'});
    })

app.delete('/:nomefile', MW_cerca_file, (req, res)=>{
    console.log('Eliminiamo il file')
    const nomefile = req.params.nomefile;
    try{
    fs.unlinkSync(nomefile);    
    }catch(e){
        res.status(500).json({message: "c'è stato un errore",
                                errore : e});
    }
    res.json({message: 'file eliminato'});
    })


app.listen(9000)