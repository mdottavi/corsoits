const { getConnection } = require("../common/connessione");
const config= require('config');
const { logger } = require('../common/logging');


const listaPostazioni = async (pag) => {
    const connection = await getConnection();
    let numres=config.get('max-results-per-page');
    let query='SELECT * FROM postazione'
    if (pag>0){
        let start=(pag-1)*numres;
        query +=' LIMIT '+numres+' OFFSET '+start;
        logger.debug(pag)
    }
    const [rows] = await connection.query(query);
    logger.debug(query);
    return rows;
}

module.exports={
    listaPostazioni
}
