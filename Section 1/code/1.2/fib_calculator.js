// fib_calculator.js
//
// Packt Publishing - Build a Network Application with Node
// Fibonacci number calculator

var number, result,
  fib = function(n){
    if (n > 2) {
      return fib(n - 2) + fib(n - 1);
    } else {
      return 1;
    }
  };

if (process.argv.length < 3) {
  process.exit(1);
} else {

  // Perform calculation
  number = parseInt(process.argv[2]);
  result = fib(number);

  // Write result to STDOUT
  process.stdout.write('result = ' + result + '\n');
  process.exit(0);
}