function Sudoku(numeros) {
  this.numeros = [];
  if (numeros == false) {
      // Generar un sudoku
      this.numeros = [
          [2, 9, 5, 6, 7, 8, 1, 4, 3],
          [6, 4, 3, 9, 5, 1, 8, 7, 2],
          [8, 7, 1, 3, 4, 2, 5, 9, 6],
          [7, 1, 2, 5, 6, 9, 3, 8, 4],
          [3, 6, 8, 7, 1, 4, 9, 2, 5],
          [4, 5, 9, 8, 2, 3, 6, 1, 7],
          [9, 2, 7, 1, 3, 6, 4, 5, 8],
          [5, 8, 6, 4, 9, 7, 2, 3, 1],
          [1, 3, 4, 2, 0, 5, 7, 6, 9],
      ]
  } else {  //

  }
}
Sudoku.prototype.dibujar = function (cont) {
  let tabla = document.createElement('table');
  tabla.id = 'tablasudoku';
  for (let i = 0; i < 9; i++) {
      let fila = document.createElement('tr');
      if (i == 2 | i == 5) fila.className = 'separador';
      for (let j = 0; j < 9; j++) {
          let celda = document.createElement('td');
          celda.id = `celda${i}-${j}`;
          let div = document.createElement('div');
          celda.appendChild(div);
          if (this.numeros[i][j] > 0) div.innerText = this.numeros[i][j];
          else {
              celda.contentEditable = true;
          }
          fila.appendChild(celda);
          if (j == 2 | j == 5) { celda.className = 'separador' };
      }
      tabla.appendChild(fila);
  }
  cont.appendChild(tabla);
};

Sudoku.prototype.traspasar = function () {
  for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
          let celda = document.getElementById(`celda${i}-${j}`);
          this.numeros[i][j] = celda.innerText;
      }
  }
};
Sudoku.prototype.validar = function () {
  //validar files
  let valida = true;

  function validar9(fila) {
      fila.sort();
      for (let j = 0; j < 9; j++) {
          if (fila[j] != j + 1) { 
            valida = false; 
            return false;
          };
      }
      return true;
  }
  console.log('**************************************');
  //console.log(this.numeros);

  for (let i = 0; i < 9; i++) { // Validació de files
      let fila = this.numeros[i].slice();
      if(!validar9(fila)){
        console.log('NO');
        filaDOM = document.getElementById(`celda${i}-0`).parentNode.children;
        for (let i=0;i<filaDOM.length;i++){
            filaDOM[i].style.background = '#F00';
        }
      }
      
  }

  for (let i = 0; i < 9; i++) { // Validació de columnes
      let columna = [];
      let columnaDOM = [];

      for (let j = 0; j < 9; j++) {
          columna.push(this.numeros[j][i]);
          columnaDOM.push(document.getElementById(`celda${j}-${i}`));
      }
      //validar9(columna);
      if(!validar9(columna)){
        console.log('NO');
        for (let i=0;i<columnaDOM.length;i++){
            columnaDOM[i].style.background = '#F00';
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
                  quadrat.push(this.numeros[i * 3 + k][j * 3 + l]);
                  quadratDOM.push(document.getElementById(`celda${i*3+k}-${j*3+l}`));
              }
          }
         // validar9(quadrat);
         if(!validar9(quadrat)){
            console.log('NO');
            for (let i=0;i<quadratDOM.length;i++){
                quadratDOM[i].style.background = '#F00';
            }
          }

      }
  }

  console.log(valida);
  return valida;
};

let sudoku;
  
(function () {
   "use strict";
   document.addEventListener("DOMContentLoaded", function () {
       let contenedor = document.getElementById('sudoku');
       console.log(contenedor);
       sudoku = new Sudoku(false);
       sudoku.dibujar(contenedor);
   });
})();
 
function validar() {
   // Validar el formulari
   let formulariOk = true;
   for (let i = 0; i < 9; i++) {
       for (let j = 0; j < 9; j++) {
           let celda = document.getElementById(`celda${i}-${j}`);

            let valor = celda.innerText[0];  // de vegades clava un salt de linia
            
               let regEx = /^[1-9]$/;
               if (!regEx.test(valor)) {
                   formulariOk = false;
                   celda.style.background = '#FFAAAA';
                   console.log('no'+valor+'dfg');
               }
               else {
                   celda.style.background = null;
               }
       }
   }
   console.log(formulariOk);
  
   if (formulariOk) {
       // copiar el sudoku en el array
       sudoku.traspasar();
       // Validar el sudoku
       let validat = sudoku.validar();
       if (validat) {
           document.getElementById('tablasudoku').style.background = '#AAFFAA';
       }
       else{
          // document.getElementById('tablasudoku').style.background = '#FFAAAA';
       }
   }
   return false;
  }
