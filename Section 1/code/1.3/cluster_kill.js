
// cluster_kill.js
//
// Packt Publishing - Build a Network Application with Node
// Kill a worker process

var cluster = require("cluster"),
  http = require("http"),
  worker, timer;

if (cluster.isMaster) {

  worker = cluster.fork();

  cluster.on('listening', function(worker, address) {
    worker.disconnect();
    timer = setTimeout(function() {
      worker.kill();
    }, 3000);
  });

  worker.on("disconnect", function() {
    clearTimeout(timer);
  });

} else if (cluster.isWorker) {

  http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("Hello world");
  }).listen(8000);
  
}