const mysql = require('mysql2/promise');

const createConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: 'piattaforma_vaccini'
  });
}

let connection;
const getConnection = async () => {
    if (!connection) {
        connection = createConnection();
    }

    return connection;
}

module.exports = {
    createConnection,
    getConnection
}