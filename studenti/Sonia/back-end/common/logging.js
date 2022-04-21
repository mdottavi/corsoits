// tiro dentro winston con format
const { createLogger, transports, format } = require('winston');
//prendo alcune cose da format
const { combine, splat, timestamp, printf } = format;

// voglio che in ogni log ci sia il timestamp, il livello, il messaggio. Questo format FORMATTA una stringa
const myFormat = printf( ({level, message, timestamp, ...metadata}) => {
    let msg = `${timestamp} [${level}] ${message}`;
    if (metadata) {
        msg += JSON.stringify(metadata);
    }
    return msg;
});
const mysimpleFormat = printf( ({level, message, timestamp, ...metadata}) => {
    let msg = `${timestamp} [${level}] ${message}`;
    return msg;
})

// faccio il create logger
const logger = createLogger({
    colorize: true,

    transports: [
        new transports.Console({
            format: combine(
                format.colorize(),
                splat(),
                timestamp({format: 'YYY-MM-DD HH:mm:ss.SSS'}),
                mysimpleFormat
            ),
            level: 'warn'
        }),
        // d'ora in avanti uso logger e gli indico dove voglio che vadano a finire i log
        new transports.File({
            format: combine(

                splat(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                myFormat
            ),
            // gli dico di metterlo su un file che gli indico e gli do un livello
            filename: 'logs/all-logs.log',
            level: 'silly'
        }),
        new transports.File({
            format: combine(

                splat(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
                myFormat
            ),
            filename: 'logs/errors.log',
            level: 'error'
        })
    ]
});
logger.httpStream = {
    write: function(message, encoding) {
        logger.http(message);
    }
};
// esporto il logger
module.exports = {
    logger
}