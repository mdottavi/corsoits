
const express = require("express")
const app = express()
const { getConnection } = require("./connectionSql")

function MDW1 (req, res, next) {
    console.log("Ho creato un Middleware")
    next()
}

function MDW2 (req, res, next) {
    console.log("Ho creato un altro Middleware, questo è privato")
    next()
}

app.use(MDW1);

app.get("/test", (req, res) => {
    console.log("CIAO");
    res.end();
})

app.get('/', async function (req, res) {
    const connection = await getConnection();
    const query = await connection.query("SELECT * FROM Persona");
    console.log(query[0].map(persona => {
        persona.denominazione = persona.nome + " " + persona.cognome
        return persona
    }))
    res.end()
});

app.post("/", MDW2, (req, res) => {
    console.log("Sei nella POST.")
    res.end()
})



app.listen(3000)