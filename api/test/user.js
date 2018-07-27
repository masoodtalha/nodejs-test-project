let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const host = 'http://localhost:5000/';

chai.use(chaiHttp);

const user = {
  firstName: "Talha",
  lastName: "Masood",
  password: "hello@mello",
  email: 'masoodtalha7@gmail.com'
};

describe('/POST User', () => {
  it('should create a new user', (done) => {
    chai.request(host)
      .post('users')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('/POST Auth User', () => {
  it('should Authenticate user', (done) => {
    chai.request(host)
      .post('authUser')
      .send({email: user.email, password: user.password})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
