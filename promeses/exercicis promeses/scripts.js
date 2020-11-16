(function () {
    "use strict";
    document.addEventListener("DOMContentLoaded", function () {
        let p1 = document.querySelector('#p1');

        let promesa1 = new Promise(function executar(resolver, rechazar) {
            p1.addEventListener('click', function click(event) {
                resolver();
            })
        });
        promesa1.then(function () {
            p1.innerHTML = '<p>Promesa 1</p>';
        }
        )

        /// Fes que al fer click al p2, escriga 3 paraules en 2 segons de diferència
        let p2 = document.querySelector('#p2');
        let promesa2 = () => new Promise((resolver) => {
            p2.addEventListener('click', () => {
                resolver();
            });
        });
        let promesa2segundos = (mensaje) => new Promise((resolver) => {
            setTimeout(() => {
                p2.innerText += ` ${mensaje}`;
                resolver();
            }
                , 2000 * Math.random());
        });

        promesa2()
            .then(() => promesa2segundos('primera'))
            .then(() => promesa2segundos('segunda'))
            .then(() => promesa2segundos('tercera'));


        //// Transforma, per a p3, el que fa p2 però en Promise.all

        let p3 = document.querySelector('#p3');
        let promesa3 = () => new Promise((resolver) => {
            p3.addEventListener('click', () => {
                resolver();
            });
        });

        let promesa3segundos = (mensaje) => new Promise((resolver) => {
            // console.log(mensaje);
            setTimeout(() => {
                p3.innerText += ` ${mensaje}`;
                resolver();
            }
                , 2000 * Math.random());
        });

        /*   promesa3().then(()=> Promise.all([  // Paraleles
              promesa3segundos('primera'),
              promesa3segundos('segunda'),
              promesa3segundos('tercera')
              ])); */

        ////////////// Ara fes que siguen seqüencials

        /// Solució en reduce 
        // https://css-tricks.com/why-using-reduce-to-sequentially-resolve-promises-works/

        promesa3().then(() =>
            ['primera', 'segunda', 'tercera'].reduce( 
                (previousPromise, current) => { // current són els elements de l'array
                    return previousPromise.then(
                        () => promesa3segundos(current))
                }, Promise.resolve() // segon argument de reduce és el primer element (PreviousPromise)
            ));              // El primer element és una promesa buida per començar



            /// En p4 fes que, al fer click, retorne una promesa 
            // de restaurar els gifs de les promeses anteriors i la seua funcionalitat
            // Tardarà 1 segon entre cada restauració


            /////// En p5 fes que, al fer click, genere un array de numeros aleatoris,
            // després cridarà a una promesa per número que tardarà el mateix que eixe número
            // Quan passe el temps, escriurà el número en compte del gif
            // Fes que comencen totes les promeses de forma paral·lela.  

    });
})();