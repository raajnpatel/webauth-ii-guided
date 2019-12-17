const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session'); // install express-sessions
const KnexSessionStore = require('connect-session-knex')(sessions); // to store sessions in DB

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const knex = require('../database/dbConfig');

const server = express();

const sessionsConfig = {
    // sessions storage options
    secret: 'Secrets', // used for encryption (must be an environtment variable
    name: 'Cookie Monster', // default would be sid
    resave: false,
    saveUninitialized: true, // true during development, false for production

    // how to store the sessions
    store: new KnexSessionStore({
        // DO NOT FORGET THE NEW KEYWORD
        knex, // imported from dbConfig.js
        createtable: true,
        clearInterval: 60000,
        tablename: 'sessions',
        sidfieldname: "sid"
    }),

    // cookie options
    cookie: {
        maxAge:600000, // 1000 (second) * 60 (minute) * 60 (hour) TIME IN MILLISECONDS
        secure: process.env.NODE_ENV === "production" ? true : false,
        httpOnly: true
    }
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
