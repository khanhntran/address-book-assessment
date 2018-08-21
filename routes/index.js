const express = require('express');
bodyParser = require('body-parser');
const elasticsearch = require('../elasticsearch');
const router = express.Router();

router.get('/', (req, res) => {
  elasticsearch
    .indexMapping()
    .then((result) => {
      res.status(200).send(`Index mapped.`);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
