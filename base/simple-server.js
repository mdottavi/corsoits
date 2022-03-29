const http = require ('http');
const https = require ('https');
const fs= require('fs');

function funzioneDiGestionedelleRichieste (req,res) {
   console.log ("ciao");
   res.end("Ciao Navigatore");
}

//let server=http.createServer( funzioneDiGestionedelleRichieste);

let server=http.createServer( (req,res) => {
    console.log (req.url);
    
    if (req.url == "/") {
        res.write("Ciao Navigatore....");
        res.write("Sei nella Home Page");
    } else if (req.url == "/maurizio") {
        res.write("Ciao Navigatore....");
        res.write("Sei nella pagina di maurizio");
    } if ( req.url == "/contatore" ) {
        let cc=fs.readFileSync("contatore.dat");
        res.write(cc);
    } else {
        res.write("Sei nel posto sbagliato");
    }
    console.log ("ciao");
    res.end();
 });


server.listen(9000);

