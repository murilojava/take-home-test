
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(require('./routes/routes'));

app.use((req, res, next) => {
  console.log("Rota não encontrada");
  return res.status(404).send("Rota na encontrada");
});

app.listen(port, () => {
  console.log(`Project run on:${port}`)
})