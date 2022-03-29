let {SommaUno, MoltiplicaPerDue, miafunzione, miafunzionePerRiferimento}= require('./ilmiomodulo');
let modulo= require('./ilmiomodulo');
let os = require('os');
let path = require('path');
let fs = require('fs');
let MiaClasse=require ("./miaclasse");
let _ = require ("lodash");


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

MiaClasse.metodoX();

let oggetto1=new MiaClasse();
console.log("oggetto1=" + oggetto1);
oggetto1.dimmichisei();

let oggetto2=new MiaClasse("Maurizio");
console.log("oggetto2=" + oggetto2);
oggetto2.dimmichisei();

let oggetto3=new MiaClasse("Maurizio", "D'Ottavi", "di", "gate-away.com");
console.log("oggetto3=" + oggetto3);
oggetto3.dimmichisei();

console.log ("ok siamo alla fine del primo giorno di corso.");

function funzione1 () {
    console.log ("sono nella funzione 1");
}
funzione1();
let funzione2=function () {
    console.log ("sono nella funzione anonima");

}
funzione2();

let funzione3= (p) => {
    console.log("Arrow Function:"+p);
   };
funzione3 (3);

((p) => {
     console.log("Arrow Function:"+p)
    }
    ) (3);

(p => console.log("Arrow Function:"+p)  ) (4);

oggetto3.setLaMiaToDoList("comprare i libri", "comprare le penne", "andare a scuola");
console.log("La mia todo list e' :" , oggetto3.getLaMiaToDoList());
oggetto3.setLaMiaToDoList("firmare il registro", "studiare");
console.log("La mia todo list e' :" , oggetto3.getLaMiaToDoList());
let arraytemp=[...oggetto3.getLaMiaToDoList()];
let ultimo=arraytemp.pop();
console.log("ultimo="+ ultimo);
console.log("array="+ arraytemp);

let primo=arraytemp.shift();
console.log("primo="+ primo);
console.log("array="+ arraytemp);

arraytemp.unshift("primo elemento");
console.log("array="+ arraytemp);

console.log("lunghezza array="+ arraytemp.length);

let a=0;
try {
    console.log ("Ciao siamo...");
    a=b+1;
} catch (e) {
  console.log ("  ===> ERROR:" + e.toString());
  a++;
}
console.log ("a= " + a);

console.log("Funzioni Matematiche:");
console.log("Ecco un numero casuale tra 0 e 1: " + Math.random());
let y=100;
console.log("Ecco un numero casuale tra 0 e y="+y+": " + Math.random()*y);
console.log("Ecco un numero INTERO casuale tra 0 e y="+y+": " + Math.floor(Math.random()*y));
let x=50;
//console.log("Ecco un numero INTERO casuale tra x="+x+" e y="+y+": " + Math.floor(Math.random()*(y-x)) + x);
console.log("Ecco un numero INTERO casuale tra x="+x+" e y="+y+": " + (x+ Math.floor(Math.random()*(y-x))));

let arr1=[1,2,3];
let arr2= [4,5,6];
let arr3 = _.concat(arr1,arr2);
console.log(arr3);


