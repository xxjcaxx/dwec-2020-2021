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
        .then((liga)=>{  // liga és el response del fetch
            return liga.json(); // el json del response el transforme en un objecte
        }).then((partidos)=>{ // partidos és un objecte amb un array de partits
            return partidos.matches.map((p)=>{ // fer un array d'objectes partit
                return new Partido(p);  // Crear un objecte partit a partir de l'objecte del json
            });
        }).then((partidos)=>{
            let tabla = document.createElement('table'); // Crear una taula amb totes les dades
            let divPartidos = document.querySelector('#partidos');
            divPartidos.prepend(tabla);
            /*for (let p of partidos){
               p.dibujar(tabla); // cridar a la funció dibujar de cada partit
            }*/
            let partidosPromeses = partidos.map((p)=>{ // retorna un array de promeses
                console.log(p.nuevosDatos);
                return new Promise((resolve,reject)=>{ //retorna la promesa de retornar un partit
                    setTimeout(
                       
                        ()=>{ p.nuevosDatos = Math.random(); 
                            resolve(p);
                        },
                        Math.random()*1000);
                    
                }).then(p=>p);
            });
            console.log({partidosPromeses});
            Promise.all(partidosPromeses).then(partidos=>{ //espera a tot l'array de promeses
                console.log({partidos});
                partidos.map(p=>p.dibujar(tabla))
            });
            console.log('Despues promise all');

        });        
    }

    document.addEventListener("DOMContentLoaded", function () {
        let button = document.querySelector('#mostrar-partidos');
        button.addEventListener('click',mostrarPartidos);

    });
})();