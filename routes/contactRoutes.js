const express = require('express');
bodyParser = require('body-parser');
const elasticsearch = require('../elasticsearch');
const router = express.Router();

router.get('/contact/:name', (req, res) => {
  elasticsearch
    .getContact(req.params.name)
    .then((result) => {
      if (result.hits.hits.length === 0) {
        throw 'Contact does not exist';
      } else {
        res.status(200).send(result);
      }
    })
    .catch((error) => res.status(500).send(error));
});

router.get('/contact', (req, res) => {
  elasticsearch
    .getAllContacts()
    .then((result) => {
      res.status(200).send(
        result.hits.hits.map((hit) => {
          return hit._source;
        })
      );
    })
    .catch((error) => res.status(500).send(error));
});

router.post('/contact', (req, res) => {
  elasticsearch
    .newContact(req.body.name, req.body.address)
    .then((result) => {
      if (result.result === 'created') {
        res.send(
          'New contact created: \n' +
            JSON.stringify(
              { name: req.body.name, address: req.body.address },
              null,
              2
            )
        );
      }
    })
    .catch((error) => res.status(500).send(error));
});

router.put('/contact/:name', (req, res) => {
  elasticsearch
    .updateContact(req.params.name, req.body.name, req.body.address)
    .then((result) => {
      if (result.updated === 0) {
        throw 'Update failed. Contact does not exist.';
      } else if (result.updated !== 0 && result.updated == result.total) {
        res
          .status(200)
          .send(
            `All contacts with name: ${
              req.params.name
            } have been updated with the following: \n` +
              JSON.stringify(
                { name: req.body.name, address: req.body.address },
                null,
                2
              )
          );
      } else {
        throw `Something went wrong during updating where total number of results didn't match total number of updates.`;
      }
    })
    .catch((error) => res.status(500).send(error));
});

router.delete('/contact/:name', (req, res) => {
  elasticsearch
    .deleteContact(req.params.name)
    .then((result) => {
      if (result.deleted === 0) {
        throw 'Delete failed. Contact does not exist.';
      } else if (result.deleted !== 0 && result.deleted === result.total) {
        res
          .status(200)
          .send(
            `All contacts with name: ${req.params.name} have been deleted.`
          );
      } else {
        throw `Something went wrong during deletion where total number of results didn't match total number of deletions.`;
      }
    })
    .catch((error) => res.status(500).send(error));
});

module.exports = router;
