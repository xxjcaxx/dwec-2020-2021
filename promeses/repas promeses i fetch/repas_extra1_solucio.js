class Partido {
    constructor(datosPartido) {
        Object.assign(this, datosPartido);
    }
    dibujar(tabla) {
        let datos = `
        <td>${this.team1} ${this.score.ft[0]}</td>
        <td>${this.team2} ${this.score.ft[1]}</td>`;
        let fila = document.createElement('tr');
        fila.innerHTML = datos;
        tabla.append(fila);
    }
}

class Jornada {
    constructor(partidos, numero) {
        this.partidos = partidos;
        this.numero = numero;
    }
    dibujar() {

        let divJornada = document.createElement('div');
        divJornada.innerHTML = '<h3>Jornada ' + this.numero + '</h3>';
        let tabla = document.createElement('table'); // Crear una taula amb totes les dades
        let divPartidos = document.querySelector('#partidos');
        divPartidos.innerHTML = '';
        divPartidos.prepend(divJornada);
        divJornada.append(tabla);
        if (this.numero > 1) {
            let anterior = document.createElement('button');
            anterior.innerHTML = "Jornada " + (parseInt(this.numero) - 1);
            divJornada.append(anterior);

            anterior.addEventListener('click', () => {
                JORNADAS["Jornada " + (parseInt(this.numero) - 1)].dibujar();
            });
        }
        if (this.numero < 22) {
            let posterior = document.createElement('button');
            posterior.innerHTML = "Jornada " + (parseInt(this.numero) + 1);
            divJornada.append(posterior);
            posterior.addEventListener('click', () => {
                JORNADAS["Jornada " + (parseInt(this.numero) + 1)].dibujar();
            });
        }
        for (let p of this.partidos) {
            p.dibujar(tabla);
        }

    }
}

let JORNADAS = {};


(() => {
    "use strict";

    function mostrarPartidos() {
        fetch('liga.json', {}) // descarregar la llista de partits
            .then((liga) => {
                return liga.json();
            }).then((partidos) => {
                console.log(partidos);
                return partidos.matches.map((p) => { // fer un array d'objectes partit
                    return new Partido(p);
                });
            }).then((partidos) => {
                for (let p of partidos) {
                    if (p.round in JORNADAS) {} else {
                        JORNADAS[p.round] = [];
                    }
                    //console.log(JORNADAS);
                    JORNADAS[p.round].push(p);
                }
                for (let j of Object.entries(JORNADAS)) {
                    let numero = j[1][0].round.split(' ').pop();
                    JORNADAS[j[0]] = new Jornada(j[1], numero)
                        //JORNADAS[j[0]].dibujar();
                }

                JORNADAS['Jornada 1'].dibujar();
                // TODO EXTRA Fer que cada vegada que pulses el botó de la jornada es descarregue el json de nou
            });
    }

    document.addEventListener("DOMContentLoaded", function() {
        let button = document.querySelector('#mostrar-partidos');
        button.addEventListener('click', mostrarPartidos);

    });
})();