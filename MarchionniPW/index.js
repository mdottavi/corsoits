const express = require('express')
const app = express()
const fs = require('fs')



app.get('/', function (req, res) {
    console.log("Server operativo!")
    res.write("ciao")
    res.end("mondo")
  })

  app.listen(3000)