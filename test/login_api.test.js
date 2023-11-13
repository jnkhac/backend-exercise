const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const {Todo, User, Category} = require('../models');

const {runMigrations} = require('../util/db');

const {expect} = require('chai');

chai.use(chaiHttp);

// Constants for testing
const testUser = {
  name: 'testname',
  username: 'testusername',
  password_hash:
  '$2b$10$1d0jXMB8mKi4Q7xOzXb4jeHtPOnPvD8pEzak1vhIYZ2tMQdtVQS5G',
};

const testLogin = {
  username: 'testusername',
  password: 'testpassword',
};

/** Checks that returned object from login has specific properties.
 * @param {Object} credentials to check.
*/
function loginPropertyChecker(credentials) {
  expect(credentials).property('id');
  expect(credentials).property('name');
  expect(credentials).property('username');
  expect(credentials).property('token');
}

describe('logins test', () => {
  before(async () => {
    await runMigrations();
    await Todo.truncate();
    await User.truncate({cascade: true});
    await Category.truncate({cascade: true});
  });
  describe('POST /api/login', () => {
    before(async () => {
      await User.create(testUser);
    });
    describe('on valid inputs', () => {
      it('passes when login in with existing credentials', (done) => {
        return chai.request(app)
            .post('/api/login')
            .send(testLogin)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(200);
              loginPropertyChecker(res.body);
              expect(res.body.username).to.be.equals(testUser.username);
              done();
            });
      });
    });
    describe('on invalid inputs', () => {
      before(async () => {
        await User.truncate({cascade: true});
        await User.create(testUser);
      });
      it('fails when login in with invalid username', (done) => {
        return chai.request(app)
            .post('/api/login')
            .send({
              username: 'wrongusername',
              password: 'testpassword',
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(401);
              expect(res.body.error)
                  .to.be.equals('invalid username or password');
              done();
            });
      });
      it('fails when login in with invalid password', (done) => {
        return chai.request(app)
            .post('/api/login')
            .send({
              username: 'testusername',
              password: 'wrongpassword',
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(401);
              expect(res.body.error)
                  .to.be.equals('invalid username or password');
              done();
            });
      });
      it('fails when login in with null password', (done) => {
        return chai.request(app)
            .post('/api/login')
            .send({
              username: 'testusername',
              password: null,
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(400);
              expect(res.body.error).to.be.equals('invalid body value(s)');
              done();
            });
      });
      it('fails when login in with null username', (done) => {
        return chai.request(app)
            .post('/api/login')
            .send({
              username: null,
              password: 'testpassword',
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(400);
              expect(res.body.error).to.be.equals('invalid body value(s)');
              done();
            });
      });
    });
  });
});
