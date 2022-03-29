const http = require ('http');

let opzioni={
    host:"localhost",
    port: 9000,
    path: "/contatore",
    method: "GET"
};

function miafunzioneCheGestisceIlRisultato (res){
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      console.log("Ricecuto:" + d);
    });
  }

let req=http.request(opzioni, miafunzioneCheGestisceIlRisultato);
req.on('error', e => console.log("ERRORE: "+ e.toString()));
req.end();
console.log ("Fine?");
