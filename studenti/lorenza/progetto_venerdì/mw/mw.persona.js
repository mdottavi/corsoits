const {getPersonaById,personaExistById} = require ('../db/dao/persona.dao.js')

const checkPersonaExist = async (req, res,next)=>{
    const id_persona = req.params.id_persona;
    if(!id_persona){
        res.json({message : "deve essere inserito l'ID"
        }).send()
    }
    id_numerico = parseInt(id_persona)
    if(isNaN(id_numerico)){
        res.json({
            message: "l'ID deve essere un numero"}).send()
        }
    const esiste = await personaExistById(id_persona)
    if(!esiste){
        res.status(404).json({
            message : "La persona cercata non esiste nel DB"
        }).send();
        }
    next();
    }

const checkAndGetPersonaById = async (req, res,next)=>{
    const id_persona = req.params.id_persona;
    if(!id_persona){
        res.json({message : "deve essere inserito l'ID"
        }).send()
    }
    const id_numerico = parseInt(id_persona)
    if(isNaN(id_numerico)){
        res.json({
            message: "l'ID deve essere un numero"}).send()
        }
    const persona = await getPersonaById(id_persona)
    if(!persona){
        res.status(404).json({
            message : "La persona cercata non esiste nel DB"
        }).send();
        }
    req.persona = persona;
    next();
        }

    module.exports = {checkPersonaExist,checkAndGetPersonaById}