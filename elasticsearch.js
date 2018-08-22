const elasticsearch = require('elasticsearch');
const HOST = 'http://localhost:9200';

const client = elasticsearch.Client({
  host: HOST
  //log: 'info'
});

const INDEX_NAME = 'people';
const INDEX_TYPE = 'contact';

function indexMapping() {
  return client.indices.putMapping({
    index: INDEX_NAME,
    type: INDEX_TYPE,
    body: {
      properties: {
        name: {
          type: 'text'
        },
        address: {
          type: 'text'
        }
      }
    }
  });
}
exports.indexMapping = indexMapping;

function getContact(name) {
  return client.search({
    index: INDEX_NAME,
    type: INDEX_TYPE,
    body: {
      query: {
        query_string: {
          query: name
        }
      }
    }
  });
}
exports.getContact = getContact;

function getAllContacts() {
  return client.search({
    index: INDEX_NAME,
    type: INDEX_TYPE,
    body: {
      query: {
        match_all: {}
      }
    }
  });
}
exports.getAllContacts = getAllContacts;

function newContact(name, address) {
  return client.index({
    index: INDEX_NAME,
    type: INDEX_TYPE,
    body: {
      name: name,
      address: address
    }
  });
}
exports.newContact = newContact;

function updateContact(oldName, newName, newAddress) {
  return client.updateByQuery({
    index: INDEX_NAME,
    type: INDEX_TYPE,
    body: {
      query: {
        match: { name: oldName }
      },
      script: `ctx._source.name = '${newName}'; ctx._source.address = '${newAddress}';`
    },
    refresh: 'true'
  });
}
exports.updateContact = updateContact;

function deleteContact(name) {
  return client.deleteByQuery({
    index: INDEX_NAME,
    type: INDEX_TYPE,
    body: {
      query: {
        match: { name: name }
      }
    }
  });
}
exports.deleteContact = deleteContact;
