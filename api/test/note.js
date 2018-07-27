let mongoose = require("mongoose");
let Book = require('../models/User');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const host = 'http://localhost:5000/';

chai.use(chaiHttp);

const userCreds = {
  email: "masoodtalha7@gmail.com",
  password: "hello@world"
};

const note = {
  date: "28-7-2018",
  time: "7h",
  note: "was a really hard day man"
};

let header = {};

describe('/POST Auth User', () => {
  it('should Authenticate user', (done) => {
    chai.request(host)
      .post('authUser')
      .send(userCreds)
      .end((err, res) => {
        header.token = `bearer ${res.body.token}`;
        res.should.have.status(200);
        done();
      });
  });
});

describe('/POST Note', () => {
  it('should create a new Note', (done) => {
    chai.request(host)
      .post('note')
      .send(note)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
