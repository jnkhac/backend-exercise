const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const {Todo, User, Category} = require('../models');

const {runMigrations} = require('../util/db');
const {
  testUsers,
  testCategories,
  testTodos,
  header,
  validToken,
  invalidToken,
  validToken2,
} = require('./constants');

const {expect} = require('chai');

chai.use(chaiHttp);

// Constants for testing
const validTodo = {
  title: 'get bread',
  desc: 'for breakfast with eggs',
  categoryId: 1,
};

const invalidTodo = {
  title: 'get bread',
  desc: 'for breakfast with eggs',
  categoryId: -1,
};

/** Checks todo item has specific properties.
 * @param {Todo} todo item.
*/
function todoPropertyChecker(todo) {
  expect(todo).property('title');
  expect(todo).property('desc');
  expect(todo).property('userId');
  expect(todo).property('categoryId');
}

describe('todos test', () => {
  before(async () => {
    await runMigrations();
    await Todo.truncate();
    await User.truncate({cascade: true});
    await Category.truncate({cascade: true});
    await User.bulkCreate(testUsers);
    await Category.bulkCreate(testCategories);
  });

  describe('GET /api/todos', () => {
    before(async () => {
      await Todo.bulkCreate(testTodos);
    });
    it('returns all todos', (done) => {
      return chai.request(app)
          .get('/api/todos')
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equals(3);
            for (const todo of res.body) {
              todoPropertyChecker(todo);
            }
            done();
          });
    });
    it('returns all todos based on category = 1', (done) => {
      return chai.request(app)
          .get('/api/todos?category=1')
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equals(2);
            for (const todo of res.body) {
              todoPropertyChecker(todo);
              expect(todo.categoryId).to.be.equals(1);
            }
            done();
          });
    });
    it('returns all todos based on desc containing birthday', (done) => {
      return chai.request(app)
          .get('/api/todos?desc=birthday')
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.be.equals(1);
            for (const todo of res.body) {
              todoPropertyChecker(todo);
              expect(todo.desc).to.be.contains('birthday');
            }
            done();
          });
    });
  });

  describe('POST /api/todos', () => {
    describe('on valid inputs', () => {
      it('passes when creating new todo with valid token', (done) => {
        return chai.request(app)
            .post('/api/todos')
            .set(header, validToken)
            .send(validTodo)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(200);
              expect(res.body).to.be.an('object');
              todoPropertyChecker(res.body);
              expect(res.body.title).to.be.equals('get bread');
              done();
            });
      });
    });
    describe('on invalid inputs', () => {
      it('fails when creating new todo with invalid categoryId', (done) => {
        return chai.request(app)
            .post('/api/todos')
            .set(header, validToken)
            .send(invalidTodo)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(400);
              expect(res.body.error).to.be.equals('invalid categoryId');
              done();
            });
      });
      it('fails when creating new todo with invalid token', (done) => {
        return chai.request(app)
            .post('/api/todos')
            .set(header, invalidToken)
            .send(validTodo)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(401);
              expect(res.body.error).to.be.equals('token invalid');
              done();
            });
      });
      it('fails when creating new todo with blank token', (done) => {
        return chai.request(app)
            .post('/api/todos')
            .set(header, '')
            .send(validTodo)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(401);
              expect(res.body.error).to.be.equals('token missing');
              done();
            });
      });
      it('fails when creating new todo with missing header', (done) => {
        return chai.request(app)
            .post('/api/todos')
            .send(validTodo)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(401);
              expect(res.body.error).to.be.equals('token missing');
              done();
            });
      });
    });
  });

  describe('DELETE /api/todos/:id', () => {
    describe('on invalid inputs', () => {
      let temp;
      before(async () => {
        temp = await Todo.create({
          title: 'something',
          desc: 'something',
          userId: 1,
          categoryId: 1,
        });
      });
      it('fails when todoId is invalid', (done) => {
        return chai.request(app)
            .delete('/api/todos/' + '-1')
            .set(header, validToken)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(400);
              done();
            });
      });
      it('fails when extracted token does not match', (done) => {
        return chai.request(app)
            .delete('/api/todos/' + temp.id)
            .set(header, validToken2)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(403);
              done();
            });
      });
    });
    describe('on valid inputs', () => {
      let temp;
      before(async () => {
        temp = await Todo.create({
          title: 'something',
          desc: 'something',
          userId: 1,
          categoryId: 1,
        });
      });
      it('passes when todoId and token are valid', (done) => {
        return chai.request(app)
            .delete('/api/todos/' + temp.id)
            .set(header, validToken)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(204);
              done();
            });
      });
    });
  });

  describe('PUT /api/todos', () => {
    let temp;
    beforeEach(async () => {
      temp = await Todo.create({
        title: 'something',
        desc: 'something',
        userId: 1,
        categoryId: 1,
      });
    });
    describe('on invalid inputs', () => {
      it('fails when extracted token does not match', (done) => {
        return chai.request(app)
            .put('/api/todos/' + temp.id)
            .set(header, validToken2)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(403);
              done();
            });
      });
      it('fails when todoId is invalid', (done) => {
        return chai.request(app)
            .put('/api/todos/' + '-1')
            .set(header, validToken2)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(400);
              done();
            });
      });
      it('fails when todoId is does not exist', () => {
        return chai.request(app)
            .put('/api/todos/' + (temp.id + 1))
            .set(header, validToken)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(404);
              done();
            });
      });
    });
    describe('on valid inputs', () => {
      it('passes when todoId exists and extracted token matches', (done) => {
        return chai.request(app)
            .put('/api/todos/' + temp.id)
            .set(header, validToken)
            .end((err, res) => {
              if (err) done(err);
              expect(res).to.have.status(200);
              done();
            });
      });
    });
  });
});
