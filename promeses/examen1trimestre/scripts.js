(function() {

    let peliculas = [];

    class Pelicula {
        constructor(datos) {
            Object.assign(this, datos);
        }
        dibujar() {
            let divPeli = document.createElement('div');
            divPeli.innerHTML = `<h3>${this.title}</h3> 
            <p>Episode Number: ${this.episode_number}</p>
            <p>Characters: ${this.main_characters}</p>
            <p>Sinopsis: ${this.description}</p>`;
            document.querySelector('#content').append(divPeli);
        }
    }

    async function crearPeliculas(response) {
        let pelis = response.movies;
        for (let peli of pelis) {
            peliculas.push(new Pelicula(peli)); // no fa falta larray però per si acás
        }
        for (let peli of peliculas) {
            await new Promise((resolve, reject) => {
                setTimeout(resolve, 1000);
            }).then(() => peli.dibujar());
        }

    }

    "use strict";
    document.addEventListener("DOMContentLoaded", function() {
        //////////////////// Primer exercici /////////////
        fetch('sw.json', {})
            .then((r) => r.json())
            .then(crearPeliculas);
    });
})();