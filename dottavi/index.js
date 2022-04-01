const express= require("express");
const fs=require ("fs");
console.log("ciao");


function MW (req, res, next) {
    console.log('MW: ' + req.method + " " + req.url );
    //res.write("ciao dal middleware MW");
    if ( req.method != "GET"  && req.method != "POST" && req.method != "DELETE"   ) {
        res.status(404);
        res.write("Not supported");
        res.end();
        return res;
    }
    next();
}
  
const app=express();

app.use(MW);

app.get('/', function pippo (req, res) {
    console.log("ciao da /");

    if (req.query.pag )  {
        res.write ("Richiesta pagina numero:" + req.query.pag + "\n");
    }

    res.write("ciao");
    res.write(" from ");
    res.end("server");
    //res.send("ciao from server");
});

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

app.listen(9000);