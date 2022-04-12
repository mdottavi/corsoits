require('dotenv').config(); //richiamo libreria senza variabile
const express = require('express'); // assegno libreria express nella variabile express
console.log(process.env.MYSQL_USER + " " + process.env.MYSQL_USER);