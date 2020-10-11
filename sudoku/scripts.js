class Numero {
    constructor(n, celda, x, y, quadrat) {
        this.n = n;
        this.celda = celda;
        this.x = x;
        this.y = y;
        //this.quadrat = quadrat;
    }
}


function Sudoku(numeros) {
    this.numeros = [];
    this.tabla = document.createElement("table");

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

    for (let i = 0; i < 9; i++) {
        this.numeros[i] = [];
        for (let j = 0; j < 9; j++) {
            let numero = numeros[i * 9 + j];
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
            this.numeros[i][j] = new Numero(numero, celda, j, i, 0);
            celda.numero = this.numeros[i][j];
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
            this.numeros[i][j].n = parseInt(this.numeros[i][j].celda.innerText);
        }
    }
    //console.log(this.numeros);
};

Sudoku.prototype.validarCelda = function validarCelda(event) {
    if (this.innerText.length > 0) {
        // copiar el sudoku en el array
        this.sudoku.traspasar();

        // Validar que siguen números i estiga complet
        let formulariOk = 'filled';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                //let valor = this.sudoku.numeros[i][j].n;
                let celda = this.sudoku.numeros[i][j].celda;
                //let celda = document.getElementById(`celda${i}-${j}`);
                let valor = celda.innerText;
                let regEx = /^[1-9]$/;
                if (!regEx.test(valor)) {
                    //console.log('No formulario');
                    formulariOk = 'wrong';
                    if (valor.length === 1) celda.classList.add("regular");
                } else {
                    celda.classList.remove("mal"); celda.classList.remove("regular");
                }
            }
        }

        // Validar el sudoku
        if (formulariOk === 'filled') {
            // Validar el sudoku
            this.sudoku.validar();
        } else {

            // Formulari no complet, validem sols files columnes i quadrats complets
            let filaCelda, columnaCelda, quadratCelda;
            //console.log(this);
            filaCelda = this.parentNode.numero.y;
            let filaVal = this.sudoku.validarParts('fila', filaCelda, 0);

            columnaCelda = this.parentNode.numero.x;
            let columnaVal = this.sudoku.validarParts('columna', 0, columnaCelda);

            quadratCelda = {
                y: Math.floor(this.parentNode.numero.y / 3),
                x: Math.floor(this.parentNode.numero.x / 3)
            }
            let quadratVal = this.sudoku.validarParts('quadrat', quadratCelda.y, quadratCelda.x);
        }
    }
};

Sudoku.prototype.validarParts = function (tipo, y, x) {

    function completa(part) {
        let val = part.filter((item) => isNaN(item)).length == 0;
        return val;
    }

    function validar9(part,partDOM) {
        if (completa(part)){
        part.sort();
        let val = part.filter((item, index) => item == index + 1).length == 9;
        if (!val) {
                for (let i = 0; i < partDOM.length; i++) {
                    partDOM[i].classList.add('mal');
                }
        }
        return val;
        } else { return false; } // No completa

    }

    if (tipo === 'fila') {
        let fila = this.numeros[y].map((item) => item.n).slice();
        filaDOM = this.numeros[y].map((item) => item.celda);
        return validar9(fila,filaDOM);
    }
    if (tipo === 'columna') {
        let columna = [];
        let columnaDOM = [];

        for (let j = 0; j < 9; j++) {
            columna.push(this.numeros[j][x].n);
            columnaDOM.push(this.numeros[j][x].celda);
        }

        return validar9(columna,columnaDOM);
    }
    if (tipo === 'quadrat') {
        let quadrat = [];
        let quadratDOM = [];
        for (let k = 0; k < 3; k++) {
            for (let l = 0; l < 3; l++) {
                quadrat.push(this.numeros[y * 3 + k][x * 3 + l].n);
                quadratDOM.push(this.numeros[y * 3 + k][x * 3 + l].celda);
            }
        }
        return validar9(quadrat,quadratDOM);
    }
    return true;
}

Sudoku.prototype.validar = function () {
    //validar files
    let valida = true;
    // Validació de files
    for (let i = 0; i < 9; i++) {
        if (!this.validarParts('fila', i, 0)) {
            valida = false; //console.log('fila no');
        }
    }
    // Validació de columnes
    for (let i = 0; i < 9; i++) {
        if (!this.validarParts('columna', 0, i)) {
            valida = false; //console.log('columna no');
        }

    }
    // Validació de quadrats
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!this.validarParts('quadrat', i, j)) {
                valida = false; //console.log('quadrat no');
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
    console.log(valida);
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
            1, 3, 4, 0, 0, 5, 7, 6, 9,]);
        sudoku.dibujar(contenedor);
    });
})();
