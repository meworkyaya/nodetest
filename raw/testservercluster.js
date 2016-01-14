/*
var http = require('http');
var port = process.env.PORT || 1337;
var cluster = require('cluster');


if (cluster.isMaster) {
  // Fork workers.
  var cpuCount = require('os').cpus().length;
  for (var i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
} else {

	http.createServer(function(req, res) {
	  res.writeHead(200, { 'Content-Type': 'text/html' });
	  res.end(new Date() + '\n');
	}).listen(port);
}

console.log('Server running on port %s', port);
*/

var port = process.env.PORT || 1337;

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(port);
}

console.log('Server running on port %s', port);
