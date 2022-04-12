require('dotenv').config();
const express = require('express');
const app = express();


//test generale
app.get('/test', (req, res) => {
    res.json({
        messaggio: 'Test'
    }).send()
});


app.listen(3000);