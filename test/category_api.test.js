const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const {Todo, User, Category} = require('../models');

const {runMigrations} = require('../util/db');

const {expect} = require('chai');

chai.use(chaiHttp);

// Constants for testing
const testCategory = {
  name: 'games',
};

describe('categories test', () => {
  before(async () => {
    await runMigrations();
    await Todo.truncate();
    await User.truncate({cascade: true});
    await Category.truncate({cascade: true});
  });
  describe('POST /api/categories', () => {
    describe('on valid inputs', () => {
      it('passes when creating a category', (done) => {
        return chai.request(app)
            .post('/api/categories')
            .send(testCategory)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              expect(res.body).property('id');
              expect(res.body).property('name');
              expect(res.body.name).to.be.equals('games');
              done();
            });
      });
    });
    describe('on invalid inputs', () => {
      before(async () => {
        await Category.truncate({cascade: true});
        await Category.create(testCategory);
      });
      it('fails when creating category with an already existing name', (done) => {
        return chai.request(app)
            .post('/api/categories')
            .send(testCategory)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(400);
              expect(res.body.error).to.be.equals('category already exists');
              done();
            });
      });
      it('fails when creating category with null name', (done) => {
        return chai.request(app)
            .post('/api/categories')
            .send({
              name: null,
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
