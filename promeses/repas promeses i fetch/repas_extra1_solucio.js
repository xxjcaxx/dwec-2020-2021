class Partido{
    constructor(datosPartido){
        Object.assign(this,datosPartido);
    }
    dibujar(tabla) {
        let datos = `<td>${this.round}</td>
        <td>${this.team1} ${this.score.ft[0]}</td>
        <td>${this.team2} ${this.score.ft[1]}</td>`;
        let fila = document.createElement('tr');
        fila.innerHTML = datos;
        tabla.append(fila);
    }
}

class Jornada{
    constructor(partidos,numero){
        this.partidos = partidos;
        this.numero = numero;
    }
    dibujar() {
        let tabla = document.createElement('table'); // Crear una taula amb totes les dades
        let divPartidos = document.querySelector('#partidos');
        divPartidos.prepend(tabla);
        let anterior = document.createElement('button');
        anterior.innerHTML = this.numero+"";
        tabla.append(anterior);
        for(let p of this.partidos){
            p.dibujar(tabla);
        }
        
    }
}

let JORNADAS = {};


( () => {
    "use strict";

    function mostrarPartidos(){
        fetch('liga.json',{})  // descarregar la llista de partits
        .then((liga)=>{
             return liga.json();
        }).then((partidos)=>{
            console.log(partidos);
            return partidos.matches.map((p)=>{ // fer un array d'objectes partit
                return new Partido(p);
            });
        }).then((partidos)=>{
            for(let p of partidos) {
                if(p.round in JORNADAS){ 
                }
                else{
                    JORNADAS[p.round]= [];
                }
                //console.log(JORNADAS);
                JORNADAS[p.round].push(p);
            }
            for (let j of Object.entries(JORNADAS)){
                let numero = j[1][0].round.split().pop();
                JORNADAS[j[0]] = new Jornada(j[1],numero)
                //JORNADAS[j[0]].dibujar();
            }

            JORNADAS['Jornada 1'].dibujar();
            // TODO Fer un div per a cada jornada i dibuixar els partits en ella
            // TODO Mostrar sols la jornada1 i un botó per avançar jornada o tornar a l'anterior
            // TODO EXTRA Fer que cada vegada que pulses el botó de la jornada es descarregue el json de nou
        });        
    }

    document.addEventListener("DOMContentLoaded", function () {
        let button = document.querySelector('#mostrar-partidos');
        button.addEventListener('click',mostrarPartidos);

    });
})();