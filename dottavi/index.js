const express= require("express");
const fs=require ("fs");

const bodyParser = require('body-parser');

console.log("ciao");


function MW (req, res, next) {
    console.log('MW: ' + req.method + " " + req.url );
    //res.write("ciao dal middleware MW");
    if ( req.method != "GET"  && req.method != "POST" && req.method != "DELETE"  && req.method != "PUT" ) {
        res.status(404);
        res.write("Not supported");
        res.end();
        return res;
    }
    next();
}
  
const app=express();
app.use(bodyParser.json());
app.use(MW);

// Semplice get
app.get('/', function pippo (req, res) {
    console.log("ciao da /");
    res.write("ciao");
    res.write(" from ");
    res.end("server");
    //res.send("ciao from server");
});

// esercizio2: Semplice get e Post
app.get('/esercizio2', function (req, res) {
    console.log('get esercizio2');
    if (!fs.existsSync("esercizio2.dat")) {
        res.status(404);
        res.send("ERROR: File not found");
        return res;
    }
    let c=fs.readFileSync("esercizio2.dat");
    res.write(c);
    //return res;
    res.end();

});

app.post('/esercizio2', function (req, res) {
    console.log('post esercizio2');
    let casual=Math.floor(Math.random()*1000);
    let c=fs.writeFileSync("esercizio2.dat",casual.toString());
    res.send("ok\n");
    return res;
});

// esercizio3: Esercizio su semplice delete

app.delete('/esercizio3', function (req,res,next) {
    console.log('mw delete esercizio3');
    next();
}, 
function (req, res,next) {
console.log('delete esercizio3');
if ( !fs.existsSync("contatore2.dat")) {
console.log("Il file none isste");
return res.status(404).json({errore:"Il file non esiste"});
}
fs.unlinkSync("esercizio2.dat");
res.send("ok\n");
next;
});

// esercizio4: Esercizio su lettura di parametri dell'URL (REST)
// nelle rappresentazioni REST il parametro indica la risorsa.
app.get('/esercizio4', function (req, res) {
    console.log('get esercizio4 senza parametri');
    res.write('get esercizio4 senza parametri');
    //return res;
    res.end();

});

app.get('/esercizio4/:filename', function (req, res) {
    console.log('get esercizio4');
    if (!fs.existsSync(req.params.filename)) {
        res.status(404);
        res.send("ERROR: File "+req.params.filename+" not found");
        return res;
    }
    let c=fs.readFileSync(req.params.filename);
    res.write(c);
    //return res;
    res.end();

});

app.post('/esercizio4/:filename', function (req, res) {
    console.log('post esercizio4');
    let casual=Math.floor(Math.random()*1000);
    let c=fs.writeFileSync(req.params.filename,casual.toString());
    res.send("ok\n");
    return res;
});

app.delete('/esercizio4/:filename', function (req, res) {
    console.log('delete esercizio4');
    if ( !fs.existsSync(req.params.filename)) {
        console.log("Il file "+req.params.filename+" non esiste");
        return res.status(404).json({errore:"Il file non esiste"});
    }
    fs.unlinkSync(req.params.filename);
    res.send("ok\n");
});


app.put('/esercizio4/:filename', function (req, res) {
    console.log('put esercizio4');
    let nuovocontenuto=req.query.contenuto;
    let c=fs.writeFileSync(req.params.filename,nuovocontenuto.toString());
    res.send("ok\n");
});


// Esercizio su lettura di parametri della richiesta da  QueryString
app.get('/esercizioquerystring', function pippo (req, res) {
    console.log("ciao da esercizioquerystring");
    if (req.query.pag )  {
        res.write ("Richiesta pagina numero:" + req.query.pag + "\n");
    }
    if (req.query.num )  {
        res.write ("Richiesta numero risultati:" + req.query.num + "\n");
    }
    if (req.query.cat )  {
        req.query.cat.forEach( (e) => res.write ("Richiesta categoria:" + e + "\n") );
        res.write ("Richiesta categoria:" + req.query.cat.length + "\n");
    }
    res.end();
    //res.send("ciao from server");
});


app.get('/copy', function pippo (req, res) {
    if (req.query.file1 )  {
        res.write ("Richiesta pagina numero:" + req.query.pag + "\n");
    }
    if (req.query.file2 )  {
        res.write ("Richiesta numero risultati:" + req.query.num + "\n");
    }
    fs.copyFileSync(req.query.file1 , req.query.file2)

});

// esercizio6 : 
app.get('/getjson', function pippo (req, res) {
    let c={
          nome: "Maurizio",
          cognome: "D'ottavi",
          data : "23/04/2022",
          postazione: "AscoliPiceno1",
          progressivo: 1
    };
    c.progressivo += 3;
    c.nome += " (di battesimo)";
    res.json(c);
    //res.send(JSON.stringify(c));
    return;
});

app.put('/putjson/:nomeJson', function pippo (req, res) {
    let c={};
    c.nome=req.body.nome;
    c.cognome=req.body.cognome;
    c.data=req.body.data;
    c.postazione=req.body.postazione;
    c.progressivo=req.body.progressivo;
    const nomejson = req.params.nomeJson;
    fs.writeFileSync(nomejson+".json",JSON.stringify(c));
    res.json(c);
    return;
});


app.listen(9000);