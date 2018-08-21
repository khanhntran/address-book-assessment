const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./routes/index');
const contact = require('./routes/contactRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(contact);
app.get('/', index);
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
