class Numero {
    constructor(n,celda,x,y,quadrat) {
        this.n = n;
        this.celda = celda;
        this.x = x;
        this.y = y;
        this.quadrat = quadrat;
    }
}


function Sudoku(numeros) {
  this.numeros = [];
  this.tabla = document.createElement("table");
  //let numeros;

  if (numeros == false) {
    // Generar un sudoku fixe
    numeros = [
        2, 9, 5, 6, 7, 8, 1, 4, 3,
        6, 4, 3, 9, 5, 1, 8, 7, 2,
        8, 7, 1, 3, 4, 2, 5, 9, 6,
        7, 1, 2, 5, 6, 9, 3, 8, 4,
        3, 6, 8, 7, 1, 4, 9, 2, 5,
        4, 5, 9, 8, 2, 3, 6, 1, 7,
        9, 2, 7, 1, 3, 6, 4, 5, 0, //falten els 8
        5, 8, 6, 4, 9, 7, 2, 3, 1,
        1, 3, 4, 2, 0, 5, 7, 6, 9,
      ];
    } 
      for (let i=0;i<9;i++){
          this.numeros[i]=[];
          for(let j=0;j<9;j++){
              let numero = numeros[i*9+j];
              let celda = document.createElement('td');
              celda.id = `celda${i}-${j}`;
              if (numero > 0) celda.innerText = numero;
              else {
                let span = document.createElement("span");
                span.sudoku = this;
                celda.appendChild(span);
                span.contentEditable = true;
                span.addEventListener("focusout", this.validarCelda);
                span.addEventListener("keydown", function (event) {
                  if (this.innerText.length === 1 && event.key != "Backspace") {
                    event.preventDefault();
                  }
                });
              }

              this.numeros[i][j] = new  Numero(numero, celda,i,j, 0);
          }
      }
}

Sudoku.prototype.dibujar = function (cont) {
  let tabla = this.tabla;
  tabla.id = "tablasudoku";
  for (let i = 0; i < 9; i++) {
    let fila = document.createElement("tr");
    if ((i == 2) | (i == 5)) fila.className = "separador";
    for (let j = 0; j < 9; j++) {
      fila.appendChild(this.numeros[i][j].celda);
      if ((j == 2) | (j == 5)) {
        this.numeros[i][j].celda.className = "separador";
      }
    }
    tabla.appendChild(fila);
  }
  cont.appendChild(tabla);
};

Sudoku.prototype.traspasar = function () {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
     // let celda = document.getElementById(`celda${i}-${j}`);
      this.numeros[i][j].n = parseInt( this.numeros[i][j].celda.innerText);
      
    }
  }
  console.log(this.numeros);
};

Sudoku.prototype.validarCelda = function validarCelda(event) {
// Validar que siguen números i estiga complet
let formulariOk = true;
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
      let numero = this.sudoku.numeros[i][j];
    //let celda = document.getElementById(`celda${i}-${j}`);
    let valor = numero.celda.innerText;
    let regEx = /^[1-9]$/;
    if (!regEx.test(valor) ) {
      formulariOk = false;
      if(valor.length === 1) numero.celda.classList.add("mal");
    } else {
      numero.celda.classList.remove("mal");
    }
  }
}
// Validar el sudoku
if (formulariOk) {
  // copiar el sudoku en el array
  this.sudoku.traspasar();
  // Validar el sudoku
  this.sudoku.validar();
} else {  
    // Formulari no complet, validem sols files columnes i quadrats complets
 /*   let filaCelda, columnaCelda, quadratCelda;
    filaCelda = this.parentNode.parentNode;
    console.log(filaCelda);
    for (let i=0;i<9;i++){
        filaCelda.children[i].classList.add('regular');
    }*/
}


};

Sudoku.prototype.validar = function () {
  //validar files
  let valida = true;

  function validar9(fila) {
    fila.sort();
    let val = fila.filter((item,index) => item == index+1).length == 9;
    if (!val) valida = false;
   /* for (let j = 0; j < 9; j++) {
      if (fila[j] != j + 1) {
        valida = false;
        return false;
      }
    }*/
    return val;
    //return true;
  }
  //console.log("**************************************");
  //console.log(this.numeros);

  for (let i = 0; i < 9; i++) {
    // Validació de files
    let fila = this.numeros[i].map( (item)=> item.n ).slice();
    if (!validar9(fila)) {
      //console.log("NO FILA");
      filaDOM = this.numeros[i]; //document.getElementById(`celda${i}-0`).parentNode.children;
      for (let i = 0; i < filaDOM.length; i++) {
          filaDOM[i].celda.classList.add('mal');
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    // Validació de columnes
    let columna = [];
    let columnaDOM = [];

    for (let j = 0; j < 9; j++) {
      columna.push(this.numeros[j][i].n);
      columnaDOM.push(this.numeros[j][i].celda);
    }
    //validar9(columna);
    if (!validar9(columna)) {
      //console.log("NO columna");
      for (let i = 0; i < columnaDOM.length; i++) {
        columnaDOM[i].classList.add('mal');
      }
    }
  }

  // Validació de quadrats
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let quadrat = [];
      let quadratDOM = [];
      for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
          quadrat.push(this.numeros[i * 3 + k][j * 3 + l].n);
          quadratDOM.push(this.numeros[i * 3 + k][j * 3 + l].celda);
        }
      }
      // validar9(quadrat);
      if (!validar9(quadrat)) {
        //console.log("NO quadrat");
        for (let i = 0; i < quadratDOM.length; i++) {
            quadratDOM[i].classList.add('mal');
        }
      }
    }
  }
  if (valida) {
    document.getElementById("tablasudoku").classList.add('bien');
    document.getElementById("tablasudoku").classList.remove('mal');
  } else {
    // document.getElementById('tablasudoku').style.background = '#FFAAAA';
    document.getElementById("tablasudoku").classList.remove('bien');
    document.getElementById("tablasudoku").classList.add('mal');
  }
  //console.log(valida);
  return valida;
};

let sudoku;

(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    let contenedor = document.getElementById("sudoku");
    console.log(contenedor);
    let sudoku;
   // sudoku = new Sudoku(false);
    sudoku = new Sudoku([
        2, 9, 5, 6, 7, 8, 1, 4, 3,
        6, 4, 3, 9, 5, 1, 8, 7, 2,
        8, 7, 1, 3, 4, 2, 5, 9, 6,
        7, 1, 2, 5, 6, 9, 3, 8, 4,
        3, 6, 8, 7, 1, 4, 9, 2, 5,
        4, 5, 9, 0, 2, 3, 6, 1, 7,
        9, 2, 7, 1, 3, 6, 4, 5, 0, //falten els 8
        5, 8, 6, 4, 9, 7, 2, 3, 1,
        1, 3, 4, 2, 0, 5, 7, 6, 9,]);
    sudoku.dibujar(contenedor);
  });
})();
