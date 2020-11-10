// factorial simple
let contador = 0;
function factorial(n) {
    contador++;
    if (n == 2) return 2;
    else return n * factorial(n - 1);
}

console.log(factorial(5), contador);
contador = 0;

// factorial amb closures
function factorialC() {
    let conocidos = [0, 1, 2]; // f(0)=0 f(1)=1 f(2)=2
    function f(n) {
        contador++;
        if (conocidos[n] != undefined) {
            console.log(conocidos);
            return conocidos[n];
        }
        else {
            let fact = n * f(n - 1);
            conocidos[n] = fact;
            return fact;
        }
    }
    return f;
}
let calcularFactorial = factorialC();
console.log('Primera vegada 5', calcularFactorial(5), contador);
contador = 0;
console.log('Segona vegada 5', calcularFactorial(5), contador);
contador = 0;
console.log('Primera vegada 6', calcularFactorial(6), contador);
contador = 0;

// factorial amb closures i IIEF
calcularFactorial = (function () {
    let conocidos = [0, 1, 2]; // f(0)=0 f(1)=1 f(2)=2
    function f(n) {
        contador++;
        if (conocidos[n] != undefined) {
            console.log(conocidos);
            return conocidos[n];
        }
        else {
            let fact = n * f(n - 1);
            conocidos[n] = fact;
            return fact;
        }
    }
    return f;
})();
console.log('Primera vegada 5', calcularFactorial(5), contador);
contador = 0;
console.log('Segona vegada 5', calcularFactorial(5), contador);
contador = 0;
console.log('Primera vegada 6', calcularFactorial(6), contador);
contador = 0;


// Fibonacci
var fibonacci = function (n) {
    contador++;
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

for (var i = 0; i <= 10; i += 1) {
    contador = 0;
    console.log(i + ': ' + fibonacci(i), contador);
}

// Fibonacci Amb Closures

class teclat {
    constructor() {
        this.tecles = `1 2 3 4 5 6 7 8 9 0 - = 
Q W E R T Y U I O P [ ] \\ 
A S D F G H J K L ; ' 
Z X C V B N M , . /`;
    }

    dibuixar() {
        let tecles = this.tecles.split(' ');
        let contenidor = document.querySelector('#teclat');
        let fila = document.createElement('div');
        for (let tecla of tecles) {
            let t = document.createElement('div');
            t.style.display = 'inline-block';
            let contingut = `<span style="display:block; width:50px; height:50px; border: 1px solid #000;">${tecla}</span>`;
            t.addEventListener('click', () => { console.log(tecla); });
            t.innerHTML = contingut;
            fila.appendChild(t);
            if (['=', '\\', "'"].indexOf(tecla) > -1) {
                contenidor.appendChild(fila);
                fila = document.createElement('div');
            }
        }
    }
}
    
   (() => {
    "use strict"; // Prova a descomentar
    document.addEventListener("DOMContentLoaded", function () {
        let t = new teclat();
        t.dibuixar();
    });
})();

function makeWorker() {
    let name = "Pedro";
    return function() {
      console.log(name);
    };
  }
  let name = "Juan";
  let work = makeWorker();
  work(); 