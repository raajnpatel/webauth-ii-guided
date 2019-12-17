const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionsConfig = {
  secret: 'Secrets', // used for encryption (must be an environtment variable
  name: 'Cookie Monster', // default would be sid
  cookie: {
    maxAge:600000, // 1000 (second) * 60 (minute) * 60 (hour) TIME IN MILLISECONDS
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true, // true during development, false for production
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionsConfig));


server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'Fly you fools' });
});

module.exports = server;
