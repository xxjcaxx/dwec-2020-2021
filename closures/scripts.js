// factorial simple
let contador = 0;
function factorial(n){   
    contador++;
    if(n == 2) return 2;
    else return n*factorial(n-1);
}

console.log(factorial(5),contador); 
contador = 0;

// factorial amb closures
function factorialC() {  
    let conocidos = [0,1,2]; // f(0)=0 f(1)=1 f(2)=2
    function f(n) {
         contador++;
        if(conocidos[n] != undefined) {
            console.log(conocidos);
            return conocidos[n];
        }
        else {
            let fact = n * f(n-1);
            conocidos[n] = fact;
            return fact;
        }       
    }
    return f;
}
let calcularFactorial = factorialC();
console.log('Primera vegada 5',calcularFactorial(5),contador);
contador = 0;
console.log('Segona vegada 5',calcularFactorial(5),contador);
contador = 0;
console.log('Primera vegada 6',calcularFactorial(6),contador);
contador = 0;

// factorial amb closures i IIEF
calcularFactorial = (function () {  
    let conocidos = [0,1,2]; // f(0)=0 f(1)=1 f(2)=2
    function f(n) {
         contador++;
        if(conocidos[n] != undefined) {
            console.log(conocidos);
            return conocidos[n];
        }
        else {
            let fact = n * f(n-1);
            conocidos[n] = fact;
            return fact;
        }       
    }
    return f;
})();
console.log('Primera vegada 5',calcularFactorial(5),contador);
contador = 0;
console.log('Segona vegada 5',calcularFactorial(5),contador);
contador = 0;
console.log('Primera vegada 6',calcularFactorial(6),contador);
contador = 0;


// Fibonacci
var fibonacci = function (n) {
  contador++;
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

for (var i = 0; i <= 10; i += 1) {
  contador=0;
  console.log(i + ': ' + fibonacci(i),contador);
}

// Fibonacci Amb Closures
 
   