const testCategories = [
  {
    id: 1,
    name: 'food',
  },
  {
    id: 2,
    name: 'clothes',
  },
];

const testUsers = [
  {
    id: 1,
    name: 'testname',
    username: 'testusername',
    password_hash:
    '$2b$10$1d0jXMB8mKi4Q7xOzXb4jeHtPOnPvD8pEzak1vhIYZ2tMQdtVQS5G',
  },
  {
    id: 2,
    name: 'testname2',
    username: 'testusername2',
    password_hash:
    '$2b$10$qKGEdkhag/EKv9GH8pcFB.4SANgKNiiJd09pGURandXRtAto2pjaC',
  },
];

const testTodos = [
  {
    id: 1,
    title: 'get eggs',
    desc: 'about to run out soon',
    userId: 1,
    categoryId: 1,
  },
  {
    id: 2,
    title: 'get flour',
    desc: 'for birthday cake soon',
    userId: 1,
    categoryId: 1,
  },
  {
    id: 3,
    title: 'get clothes',
    desc: 'shirt, pants, socks',
    userId: 1,
    categoryId: 2,
  },
];

const header = 'Authorization';

const validToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VybmFtZSIsImlkIjoxLCJpYXQiOjE2OTk2OTgxNTR9.4Lwg010X20rcsMA3WheSI2A9HocuW5-4VXCvkGI-SPI';
const validToken2 = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VybmFtZTIiLCJpZCI6MywiaWF0IjoxNjk5ODM2ODA4fQ.j9RLH2McslpYw1k4-OiNjLUEVNmB4UvhINl3tH3D5ew';
const invalidToken = 'bearer totallyrealtoken';

module.exports = {
  testCategories,
  testUsers,
  testTodos,
  header,
  validToken,
  validToken2,
  invalidToken,
};
