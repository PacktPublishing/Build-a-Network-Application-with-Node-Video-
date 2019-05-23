
// argv_example.js
//
// Packt Publishing - Build a Network Application with Node
// Access command line arguments

require("http").createServer(function (req, res) {
  res.writeHead(200, {"Content-Type": "text/plain"});

  // Loop through command line arguments
  process.argv.forEach(function (val, index, array) {

    // Write argument value to the response
    res.write("value = '" + val + "' at index " + index + "\n");

  });

  res.end();
}).listen(8000);