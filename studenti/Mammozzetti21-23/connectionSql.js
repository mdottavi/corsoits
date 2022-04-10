const mysql = require('mysql2/promise');

let connection;

const getConnection = async () => {
  if(!connection) {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: "M@mmozzetti21",
      database: 'piattaforma_vaccini'
    });
  }
  return connection;
}

module.exports = {
  getConnection
}