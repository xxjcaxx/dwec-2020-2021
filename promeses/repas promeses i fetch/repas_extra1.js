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