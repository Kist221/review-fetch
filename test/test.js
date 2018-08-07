// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const db = require('../models');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
/*
  * Test the /GET route
  */
describe('/api/fetch_users', () => {
  it('it should GET all the users', done => {
    chai
      .request(server)
      .get('/api/fetch_users')
      .end((err, res) => {
        console.log(res);
        done();
      });
  });
});
