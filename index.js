var http = require('http');
var querystring = require('querystring');

function processPost(request, response, callback) {
    var queryData = "";

    if (request.method == 'POST') {
        let body = [];
        request.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            body = Buffer.concat(body).toString();
            request.post = body;
            callback();
        });
    } else {
        response.writeHead(405, { 'Content-Type': 'text/plain' });
        response.end();
    }
}

http.createServer(function(request, response) {
    if (request.method == 'POST') {
        processPost(request, response, function() {
            var json = JSON.parse(JSON.stringify(request.post));
            console.log(json);
            response.writeHead(200, "OK", { 'Content-Type': 'application/json' });
            response.write(json);
            response.end();
        });
    } else {
        response.writeHead(200, "OK", { 'Content-Type': 'text/plain' });
        response.end();
    }

}).listen(8000);