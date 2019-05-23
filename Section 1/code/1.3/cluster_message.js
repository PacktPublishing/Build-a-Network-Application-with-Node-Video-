// cluster.js
//
// Packt Publishing - Build a Network Application with Node
// Communicate with a worker process

var cluster = require("cluster"),
  http = require("http"),
  worker, requestCount = 0;

if (cluster.isMaster) {

  worker = cluster.fork();
  worker.send({
    "cmd": "start", 
    "name": "Steve"
  });
  worker.on("message", function(msg) {
    if (msg.cmd && msg.cmd == "notifyRequest") {
      console.log("Request tally = " + requestCount++);
    }
  });

  cluster.on('listening', function(worker, address) {
    console.log("Worker " + worker.process.pid + " listening on port " + address.port);
  });

} else if (cluster.isWorker) {

  process.on('message', function(msg) {
    if (msg.cmd && msg.cmd == "start") {
      http.createServer(function(req, res) {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.end("My name is " + msg.name + "\n");
        process.send({ "cmd": "notifyRequest" });
      }).listen(8000);
    }
  });  
}