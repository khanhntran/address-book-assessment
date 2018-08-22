const chai = require('chai');
const chaiHttp = require('chai-http');
const elasticsearch = require('elasticsearch');
const app = require('../app');
const should = chai.should();

const HOST = 'http://localhost:9200';
const INDEX_NAME = 'people';
const INDEX_TYPE = 'contact';

const client = elasticsearch.Client({
  host: HOST
});

chai.use(chaiHttp);

before(() => {
  return client
    .deleteByQuery({
      index: INDEX_NAME,
      type: INDEX_TYPE,
      body: {
        query: {
          match_all: {}
        }
      }
    })
    .then(() => {
      client.index({
        index: INDEX_NAME,
        type: INDEX_TYPE,
        body: {
          name: 'Pudge',
          address: '123 Main Street'
        }
      });
      client.index({
        index: INDEX_NAME,
        type: INDEX_TYPE,
        body: {
          name: 'Andy',
          address: '100 Jefferson Dr'
        }
      });
      client.index({
        index: INDEX_NAME,
        type: INDEX_TYPE,
        body: {
          name: 'puttest',
          address: 'test address'
        }
      });
      client.index({
        index: INDEX_NAME,
        type: INDEX_TYPE,
        body: {
          name: 'deletetest',
          address: 'Delete street'
        }
      });
    });
});

describe('Contact Tests', () => {
  describe('Base Route Test (/)', () => {
    it('Should create index mapping when hitting the base route', (done) => {
      chai
        .request(app)
        .get('/')
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe('NotFound Test (/notfound)', () => {
    it('Should respond back with not found when accessing non-routed pages', (done) => {
      chai
        .request(app)
        .get('/notfound')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('/GET Tests', () => {
    it('Should receive all contacts when accessing /contact', (done) => {
      chai
        .request(app)
        .get('/contact')
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it('Should receive specific contact when accessing /contact/:name', (done) => {
      chai
        .request(app)
        .get('/contact/pudge')
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe('/POST Test', () => {
    it('Should have status 200 on success', (done) => {
      chai
        .request(app)
        .post('/contact')
        .send({
          name: 'mocha test',
          address: 'test address'
        })
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe('/PUT Test', () => {
    it('Should have status 200 on successful update', (done) => {
      chai
        .request(app)
        .put('/contact/puttest')
        .send({
          name: 'updatedput',
          address: 'updated address'
        })
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('Should have status 500 on failed update', (done) => {
      chai
        .request(app)
        .put('/contact/notexist')
        .end((error, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });

  describe('/DELETE Test', () => {
    it('Should have status 200 on successful deletion', (done) => {
      chai
        .request(app)
        .delete('/contact/deletetest')
        .end((error, response) => {
          response.should.have.status(200);
          done();
        });
    });
    it('Should have status 500 on failed deletion', (done) => {
      chai
        .request(app)
        .delete('/contact/notexist')
        .end((error, response) => {
          response.should.have.status(500);
          done();
        });
    });
  });
});
