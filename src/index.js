
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;1


app.use(require('./routes/routes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Project run on:${port}`)
})