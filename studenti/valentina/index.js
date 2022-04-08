require('dotenv').config();
import express from 'express';
import { routerPersona } from './rotte/persona';
const app = express();

app.get('/test', (req, res) => {
    console.log("Here")
    res.json({
        messaggio: 'funziona tutto'
      }).send()
});

app.use('/persona', routerPersona);

app.listen(3000);