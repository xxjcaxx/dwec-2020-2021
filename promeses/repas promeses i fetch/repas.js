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
            console.log(partidos);
            let tabla = document.createElement('table'); // Crear una taula amb totes les dades
            let divPartidos = document.querySelector('#partidos');
            divPartidos.prepend(tabla);
            for (let p of partidos){
               p.dibujar(tabla); // cridar a la funció dibujar de cada partit
            }
        });        
    }

    document.addEventListener("DOMContentLoaded", function () {
        let button = document.querySelector('#mostrar-partidos');
        button.addEventListener('click',mostrarPartidos);

    });
})();