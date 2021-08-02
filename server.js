const http = require('http');
const app = require('./app');

const port = process.env.PORT || 5000;
const hostname = '192.168.0.107';

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

