const server = require('./server');

const port = 3300;

server.listen(port, () => {
    console.log(`\n *** Listening on http://localhost:${port} *** \n`)
});