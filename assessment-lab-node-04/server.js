const express = require('express')
const app = express()
const router = express.Router();
const port = 3000
const path = require('path');
const routes = require("./Controllers/notas")
app.use(express.static(path.join(__dirname, 'public'))); // ou 'public' se usares uma pasta pública
app.use("/notas", routes.router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use((req, res, next) =>{
  const now = new Date(Date.now());
  console.log("A request was made [ " + req.method + " ] Date : " + now.toLocaleString());
  next();
})

app.listen(port, () => {
  console.log(`ASLabNode web running on ${port}`)
})


