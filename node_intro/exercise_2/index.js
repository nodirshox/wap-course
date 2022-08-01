var http = require('http');
var dt = require('./myModule');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Today is ' + dt.myDate());
}).listen(8080);
