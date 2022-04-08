const mysql = require('mysql2/promise');

const createMyConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'piattaforma_vaccini'
  });
}

let connection;
const getMyConnection = async () => {
    if (!connection) {
        connection = createMyConnection();
    }

    return connection;
}

module.exports = {
    createMyConnection,
    getMyConnection
}