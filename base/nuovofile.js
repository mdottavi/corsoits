let {SommaUno, MoltiplicaPerDue, miafunzione, miafunzionePerRiferimento}= require('./ilmiomodulo');
let modulo= require('./ilmiomodulo');
let os = require('os');
let path = require('path');
let fs = require('fs');
let MiaClasse=require ("./miaclasse");

let VariabileDue=SommaUno;
let nomevarnumerica=12;  //variable
let nomevariablestringa="abc"; //stringa
let nomevariabileboolean=true; //boolean
let nomearray=[1,2,"stringa", nomevariabileboolean]; //array
let nomeoggetto={ "campo1": 12, 
                  "campo2":"stringa", 
                  "campo3": [1,2,3], 
                  "campo4":{"c1": 1, "c2":2}}; // oggetti


/* 
   un commento
   un altro commento
*/

if (!nomevariabileboolean || nomevarnumerica == 132) {
    console.log("Ciao");
};

for (let i =0; i< 10 ; i=i+1) {
    console.log ("Numero:" + modulo.MoltiplicaPerDue(i));
    
    console.log ("Numero:" + SommaUno(i));
    
}

console.log("__dirname=" + __dirname);
console.log("__filename=" + __filename);
console.log ("os.cpus=" + JSON.stringify(os.cpus()));
console.log ("os.cpus=" +os.cpus());
//console.log ("os.freemem=" , JSON.stringify(os.freemem()));

console.log ("nome programma=" , path.basename(__filename));

let stringa="1";

console.log(stringa+1);
console.log(parseInt(stringa)+1);

let contenuto=fs.readFileSync("contatore.dat");
console.log("contenuto file=" +contenuto );
let nuovocontenuto=parseInt(contenuto);

nuovocontenuto++;
//nuovocontenuto=nuovocontenuto+1;
console.log("Tipo di nuovoconteuto " + typeof(nuovocontenuto));
fs.writeFileSync("contatore.dat", nuovocontenuto.toString());
console.log("Nuovo valore del contatore=" + nuovocontenuto);

let var1=23;
console.log ("risultato=" + miafunzione(var1));
console.log ("var1=" +var1);

let ar1=["23","D'Ottavi"];
let ar2= [...ar1]; //spread operator
let ar4= ["23","D'Ottavi"]; //spread operator

let ar3= ar1;

console.log ("risultato=" + miafunzionePerRiferimento(ar1));
console.log ("risultato=" + miafunzionePerRiferimento(["23","D'Ottavi"]));

console.log ("ar1=" +ar1);


console.log ("ar2=" +ar2);
console.log ("ar3=" +ar3);

let oggetto1=new MiaClasse();
console.log("oggetto1=" + oggetto1);
oggetto1.metodoX();