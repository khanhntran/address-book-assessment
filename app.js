const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./routes/index');
const contact = require('./routes/contactRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', index);
app.use(contact);
app.use((req, res) => {
  res.status(404).send('Sorry, page not found.');
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
module.exports = app;
