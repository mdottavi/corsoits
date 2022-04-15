const mysql = require('mysql2/promise');
const config= require('config');

const createConnection = async () => {
  return await mysql.createConnection({
    host: config.get('dbdomain'),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
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