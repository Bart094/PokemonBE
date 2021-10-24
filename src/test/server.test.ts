//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
 
chai.use(chaiHttp);

var assert = require('assert');
var http = require('http');
var should = chai.should();

//Test the server

describe('server', function () {
    before(function () {
        server.listen(5000);
    });

    after(function () {
        server.close();
    });
});


//Test API

describe('/EndPoint unknown', () => {
    it('it should return 404', (done) => {
      chai.request(server)
          .get('/pokemon')
          .end((err, res) => {
                res.should.have.status(404);
                res.should.to.be.json;
                res.body.should.be.a('object');
            done();
          });
    });
});

describe('/GET EndPoint 1', () => {
    it('it should return 200', (done) => {
      chai.request(server)
          .get('/pokemon/articuno')
          .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('articuno');
                res.body.should.have.property('name').be.a('string');
                res.body.should.have.property('description').be.a('string');
                res.body.should.have.property('habitat').eql('rare');
                res.body.should.have.property('habitat').be.a('string');
                res.body.should.have.property('is_legendary').eql(true);
                res.body.should.have.property('is_legendary').be.a('boolean');
            done();
          });
    });
});

describe('/GET EndPoint 1 Error', () => {
    it('it should return 404', (done) => {
      chai.request(server)
          .get('/pokemon/undefined')
          .end((err, res) => {
                res.should.have.status(404);
                res.should.to.be.json;
                res.body.should.be.a('object');
            done();
          });
    });
});

describe('/GET EndPoint 2 Legendary', () => {
    it('it should return 200', (done) => {
      chai.request(server)
          .get('/pokemon/translated/articuno')
          .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('articuno');
                res.body.should.have.property('name').be.a('string');
                res.body.should.have.property('description').be.a('string');
                res.body.should.have.property('habitat').eql('rare');
                res.body.should.have.property('habitat').be.a('string');
                res.body.should.have.property('is_legendary').eql(true);
                res.body.should.have.property('is_legendary').be.a('boolean');
            done();
          });
    });
});

describe('/GET EndPoint 2 Common', () => {
    it('it should return 200', (done) => {
      chai.request(server)
          .get('/pokemon/translated/ditto')
          .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql('ditto');
                res.body.should.have.property('name').be.a('string');
                res.body.should.have.property('description').be.a('string');
                res.body.should.have.property('habitat').eql('urban');
                res.body.should.have.property('habitat').be.a('string');
                res.body.should.have.property('is_legendary').eql(false);
                res.body.should.have.property('is_legendary').be.a('boolean');
            done();
          });
    });
});

describe('/GET EndPoint 2 Error', () => {
    it('it should return 404', (done) => {
      chai.request(server)
          .get('/pokemon/translated/undefined')
          .end((err, res) => {
                res.should.have.status(404);
                res.should.to.be.json;
                res.body.should.be.a('object');
            done();
          });
    });
});