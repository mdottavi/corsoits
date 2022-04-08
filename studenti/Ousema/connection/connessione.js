const mysql = require('mysql2/promise');
require('dotenv').config();

const createConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ousema97',
    database: 'piattaforma_vaccini'
  });
}

let connection;
const getConnection = async () => {
  if(!connection) {
    connection = await createConnection();
  }

  return connection;
}

module.exports = {
  createConnection,
  getConnection
}