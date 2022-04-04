const mysql = require('mysql2/promise');
require('dotenv').config();

const getConnection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_PASSWORD,
    database: 'piattaforma_vaccini'
  });
}

module.exports = {
  getConnection
}