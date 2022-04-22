const Classetta=require ('./classetta');
const miaClassetta=require ('./classetta');

let oggetto1=new Classetta("cane");
let oggetto2=new Classetta("gatto");

oggetto1.metodoIstanziato("ciao");
oggetto2.metodoIstanziato("ciao");

Classetta.metodoStatico("ciao2");
Classetta.metodoIstanziato("ciao3");
