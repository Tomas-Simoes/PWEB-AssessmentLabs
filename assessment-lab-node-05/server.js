const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

const clientController = require('./controllers/userController');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', clientController);

app.listen(port, () => {
  console.log(`ASLabNode web running on ${port}`);
});
