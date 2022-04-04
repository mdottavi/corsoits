const express = require('express')
const app = express()

app.get('/test', function (req, res) {
  console.log('siamo nell handler test');



  return res.json({
    ok: false
  });
})

app.listen(3000);