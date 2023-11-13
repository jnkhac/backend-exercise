const express = require('express');
const app = express();

const todosRouter = require('./controllers/todos');
const categorysRouter = require('./controllers/categories');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

app.use(express.json());

app.use('/api/todos', todosRouter);
app.use('/api/categories', categorysRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

module.exports = app;
