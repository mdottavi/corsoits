function som (p) {
    return p+1;
}

function MoltiplicaPerDue (p) {
    return p*2;
}
function DividiPerDue (p) {
    return p/2;
}

function miafunzione (p1){
   p1=p1+1;
   return p1;
}
function miafunzionePerRiferimento (a){
    let b = [...a];
    a[0]="Maurizio";
    return a;
 }
module.exports.SommaUno=som;
module.exports.DividiPerDue=DividiPerDue;
module.exports.MoltiplicaPerDue=MoltiplicaPerDue;
module.exports.miafunzione=miafunzione;
module.exports.miafunzionePerRiferimento=miafunzionePerRiferimento;





