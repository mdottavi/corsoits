
class MiaClasse {
    constructor (p="D'Ottavi",...args) {
        this.todolist=[];

        this.parametroInterno=p;
        console.log("DEBUG: " + this.parametroInterno);
        if (args.length >0  ){
            for (let i=0; i<args.length; i++) {
                this.parametroInterno += " " + args[i] ;
                console.log("DEBUG: " + this.parametroInterno);
            }
        } 
    }
    setLaMiaToDoList (...parametri) {
        for (let i=0; i<parametri.length; i++) {
            this.todolist.push(parametri[i]) ;
            console.log("Ora la mia ToDo List e':" ,this.todolist )   ;     
        }
        //console.log("Ora la mia ToDo List e':" ,this.todolist )   ;     
    }

    getLaMiaToDoList (...parametri) {
        return this.todolist;
    }

    static metodoX () {
        console.log("Ciaso io sono il metodoX e sono statico");
    }
    dimmichisei () {
        console.log("Ciaso io sono "+this.parametroInterno);
    }

}

module.exports=MiaClasse;