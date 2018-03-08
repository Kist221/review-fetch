var db = require("../models");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
/*
  * Test the /GET route
  */
  describe('/api/fetch_users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/fetch_users')
            .end((err, res) => {
                console.log(res);
              done();
            });
      });
  });
