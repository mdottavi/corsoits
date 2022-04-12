class Classetta {
    constructor (a) {
        this.campo=a;
    }
    static metodoStatico (p) {
        console.log ("Parametro passato a metodo statico:"+p);
        return;
    }
    metodoIstanziato (p) {
        console.log ("Parametro passato a metodo istanziato:"+p + " campo:"+this.campo);
        return;
    }
}

module.exports = Classetta;