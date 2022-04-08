const express = require("express")
const app = express()

function MDW1 (req, res, next) {
    console.log("Ho creato un Middleware")
    next()
}

function MDW2 (req, res, next) {
    console.log("Ho creato un altro Middleware, questo è privato")
    next()
}

app.use(MDW1);

app.get("/", (req, res) => {
    console.log("Sei nel GET.")
    res.end()
})

app.post("/testPOST", MDW2, (req, res) => {
    console.log("Sei nella POST.")
    res.end()
})

app.listen(3000)