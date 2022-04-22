const express = require("express")
const app = express()
const fs = require("fs")

app.post("/tryManipolateFile", (req, res) => {
    fs.writeFileSync("./files/ProvaFile", "Ciao")
    res.end()
});

app.post("/tryManipolateFile2", (req, res) => {
    fs.writeFileSync("./files/ProvaFileAgain", "Ciao again")
    res.end()
});

app.delete("/tryManipolateFile", (req, res) => {
    fs.unlinkSync("./files/ProvaFile")
    res.end()
});

app.listen(3000);