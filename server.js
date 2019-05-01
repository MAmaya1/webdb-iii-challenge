const express = require('express');
const helmet = require('helmet');

const server = express();

// Import Routers

const cohortsRouter = require('./cohorts/cohorts-router');

// Middleware

server.use(express.json());
server.use(helmet());

// Configure Routes

server.get('/', (req, res) => {
    res.send('Hi there!');
})

server.use('/api/cohorts', cohortsRouter);

module.exports = server;