
class MiaClasse {
    constructor (p="D'Ottavi",...args) {

        this.parametroInterno=p;
        console.log("DEBUG: " + this.parametroInterno);
        if (args.length >0  ){
            for (let i=0; i<args.length; i++) {
                this.parametroInterno += " " + args[i] ;
                console.log("DEBUG: " + this.parametroInterno);
            }
        } 
    }
    static metodoX () {
        console.log("Ciaso io sono il metodoX e sono statico");
    }
    dimmichisei () {
        console.log("Ciaso io sono "+this.parametroInterno);
    }

}

module.exports=MiaClasse;