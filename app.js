const http = require('http');
const requestHelper = require('./routes')

const server = http.createServer(requestHelper)

server.listen(3000);