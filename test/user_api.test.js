const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const {Todo, User, Category} = require('../models');

const {runMigrations} = require('../util/db');

const {expect} = require('chai');

chai.use(chaiHttp);

// Constants for testing
const testUser = {
  username: 'testusername',
  password: 'testpassword',
  name: 'testname',
};

/** Checks that user object has specific properties.
 * @param {User} user object.
*/
function userPropertyChecker(user) {
  expect(user).property('id');
  expect(user).property('username');
  expect(user).property('name');
  expect(user).property('password_hash');
}

describe('users test', () => {
  before(async () => {
    await runMigrations();
    await Todo.truncate();
    await User.truncate({cascade: true});
    await Category.truncate({cascade: true});
  });
  describe('POST /api/users', () => {
    describe('on valid inputs', () => {
      it('passes when creating a user', (done) => {
        return chai.request(app)
            .post('/api/users')
            .send(testUser)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              userPropertyChecker(res.body);
              expect(res.body.username).to.be.equals(testUser.username);
              done();
            });
      });
    });
    describe('on invalid inputs', () => {
      before(async () => {
        await User.truncate({cascade: true});
        await User.create({
          name: 'testname',
          username: 'testusername',
          password_hash:
          '$2b$10$1d0jXMB8mKi4Q7xOzXb4jeHtPOnPvD8pEzak1vhIYZ2tMQdtVQS5G',
        });
      });
      afterEach(async () => {
        await User.truncate({cascade: true});
      });
      it('fails when creating user with an already existing username', (done) => {
        return chai.request(app)
            .post('/api/users')
            .send(testUser)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(400);
              expect(res.body.error).to.be.equals('username already exists');
              done();
            });
      });
      it('fails when name is null', (done) => {
        return chai.request(app)
            .post('/api/users')
            .send({
              name: null,
              username: 'username',
              password_hash: 'password_hash',
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(400);
              expect(res.body.error).to.contain('body');
              done();
            });
      });
      it('fails when username is null', (done) => {
        return chai.request(app)
            .post('/api/users')
            .send({
              name: 'name',
              username: null,
              password_hash: 'password_hash',
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(400);
              expect(res.body.error).to.contain('body');
              done();
            });
      });
      it('fails when pssword is null making password_hash null', (done) => {
        return chai.request(app)
            .post('/api/users')
            .send({
              name: 'name',
              username: 'username',
              password_hash: null,
            })
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(400);
              expect(res.body.error).to.contain('body');
              done();
            });
      });
    });
  });
});
