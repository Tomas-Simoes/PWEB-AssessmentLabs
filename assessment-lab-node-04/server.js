const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://bro:bro@lab-node-03.xkde5ma.mongodb.net/?retryWrites=true&w=majority&appName=lab-node-03';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB conectado com sucesso'))
  .catch(err => console.log('MongoDB erro: ', err));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const now = new Date(Date.now());
  console.log("A request was made [ " + req.method + " ] Date : " + now.toLocaleString());
  next();
});

const routes = require("./Controllers/notas");

app.use("/notas", routes.router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`ASLabNode web running on ${port}`);
});