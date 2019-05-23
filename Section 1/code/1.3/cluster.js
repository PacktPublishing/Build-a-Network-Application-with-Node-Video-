var cluster = require("cluster"),
  http = require("http"),
  i = 0;

if (cluster.isMaster) {

  require('os').cpus().forEach(function(){
    cluster.fork({ "WORKER_NAME": "worker" + i++ });
  });

  cluster.on('listening', function(worker, address) {
    console.log("Worker " + worker.process.pid + " listening on port " + address.port);
  });

  cluster.on("exit", function(worker, code, signal) {
    console.log("Worker " + worker.process.pid + " died (" + worker.process.exitCode + ")");
  });

} else if (cluster.isWorker) {

  http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("My name is " + process.env["WORKER_NAME"] + "\n");
  }).listen(8000);
  
}