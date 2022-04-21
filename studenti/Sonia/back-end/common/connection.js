const mysql = require('mysql2/promise');
const config = require('config');

const createConnection = async () => {
  console.log('trying connection...');
  return await mysql.createConnection({
    host: 'localhost' /* config.get('dbdomain') se si ha un dominio si mette all'interno del default se si scrive così*/,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: 'piattaforma_vaccini'
  });
}

let connection;
const getConnection = async () => {
    if (!connection) {
        connection = await createConnection();
    }

    return connection;
}

module.exports = {
    createConnection,
    getConnection
}