var db = require("../models");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
// describe('Books', () => {
//     beforeEach((done) => { //Before each test we empty the database
//         Book.remove({}, (err) => { 
//            done();         
//         });     
//     });
/*
  * Test the /GET route
  */
  // describe('/api/fetch_users', () => {
  //     it('it should GET all the users', (done) => {
  //       chai.request(server)
  //           .get('/api/fetch_users')
  //           .end((err, res) => {
  //               console.log(res.body);
  //             done();
  //           });
  //     });
  // });

  // describe('/api/fetch_users/new', () => {
  //     it('it should create a new user', (done) => {
  //       var user = {
  //         username: "Roy",
  //         password: "password"
  //       };
  //       chai.request(server)
  //           .post('/api/fetch_users/new')
  //           .send(user)
  //           .end((err, res) => {
  //               console.log(res.body);
  //               userId = res.body.id;
  //               console.log(userId);
  //             });
  //             done();
  //     });
  // });

  // describe('/api/fetch_company/new', () => {
  //     it('it should create a new company', (done) => {
  //       var company = {
  //         name: "Toys R Us",
  //         UserId: 8
  //       };
  //       console.log(company)
  //       chai.request(server)
  //           .post('/api/fetch_company/new')
  //           .send(company)
  //           .end((err, res) => {
  //               console.log(res.body);
  //             });
  //             done();
  //     });
  // });

  describe('/api/fetch_contact_data/update/', () => {
      it('it should update the contact', (done) => {
        var company = {
          id: 4,
          name: "Roy Norton",
          gender: 1,
          email: "email@email.com",
          phone: "777-777-7777",
          status: 0,
          active: 1,
          review: "THis is my Review",
          reviewType: 1
        };
        console.log(company)
        chai.request(server)
            .post("/api/fetch_contact_data/update")
            .send(company)
            .end((err, res) => {
                console.log(res.body);
              });
              done();
      });
  });
