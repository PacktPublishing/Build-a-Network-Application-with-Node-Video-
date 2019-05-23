// fib_server.js
//
// Packt Publishing - Build a Network Application with Node
// Load output from a child process

var exec = require("child_process").exec;

require("http").createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});

  exec("node fib_calculator.js 42", function(err, stdout, stderr) {
    if (err) {
      console.log("fibonacci exited with the following code ", err.code); return;
    }
    res.end("Fibonacci calculation for 42 is " + stdout + "\n");
  });

}).listen(8000);