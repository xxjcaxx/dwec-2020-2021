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
        });

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

        function exercici2(){
        promesa2()
            .then(() => promesa2segundos('primera'))
            .then(() => promesa2segundos('segunda'))
            .then(() => promesa2segundos('tercera'));
        }
        exercici2();

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
/*
           promesa3().then(()=> Promise.all([  // Paraleles
              promesa3segundos('primera'),
              promesa3segundos('segunda'),
              promesa3segundos('tercera')
              ])); 
*/
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
            let p4 = document.querySelector('#p4');
            //let promesa4 = () => new Promise((resolver) => {
            //    p4.addEventListener('click', () => {
            //        restaurarP1();
            //    });
            //});

            function restaurarP1(){
                let promesaRestaurar = new Promise((r)=>{ setTimeout(()=>{
                    let p1 = document.querySelector('#p1');
                    p1.innerHTML = 'P1 <img src="loading.gif" alt="">';
                    let pro1 = new Promise(function executar(resolver, rechazar) {
                        p1.addEventListener('click', function click(event) {
                            resolver();
                        });
                    }).then(function () {
                        p1.innerHTML = '<p>Promesa 1</p>';
                    });
                    r();
                },200)});
                return promesaRestaurar;
            }

            function restaurarP2(){
                return new Promise((r)=>{ setTimeout(()=>{
                p2.innerHTML = 'P2 <img src="loading.gif" alt="">';
                
                exercici2();
                r();
            },200)});
            }

            function restaurarP3(){
                return new Promise((r)=>{ setTimeout(()=>{
                p3.innerHTML = 'P3 <img src="loading.gif" alt="">';
                
                promesa3()
                .then(() =>
                ['primera', 'segunda', 'tercera'].reduce( 
                    (previousPromise, current) => { // current són els elements de l'array
                        return previousPromise.then(
                            () => promesa3segundos(current))
                    }, Promise.resolve() // segon argument de reduce és el primer element (PreviousPromise)
                ));              // El primer element és una promesa buida per començar
                r();
            },200)});
            }

            //promesa4().then(restaurarP1);
            p4.addEventListener('click', () => {
                restaurarP1().then(restaurarP2).then(restaurarP3);
            });

            /////// En p5 fes que, al fer click, genere un array de numeros aleatoris,
            // després cridarà a una promesa per número que tardarà el mateix que eixe número
            // Quan passe el temps, escriurà el número en compte del gif
            // Fes que comencen totes les promeses de forma paral·lela.  

            let p5 = document.querySelector('#p5');
            p5.addEventListener('click', () => {
                p5.innerHTML='';
                let numeros = []
                for(let i=0;i<100;i++){
                    let numero = Math.round(10000*Math.random());
                    numeros.push(numero);
                }
                console.log(numeros);
                let promesas = numeros.map((n)=>{
                    return new Promise((resolve,reject)=>{
                        setTimeout(()=>{ 
                            resolve();
                        },n)
                    }).then(()=>{
                        p5.innerText += ` ${n}`;
                    });
                });
                Promise.all(promesas).then((resultado)=> {
                    console.log('Tots els numeros');
                });
            });


            /////////////// fes el que fa p3 amb  async await
            async function imprimirP6(array){
                for(let i of array){
                    console.log(`imprimint ${i}`);
                    let res = await new Promise((resolve)=>{
                        setTimeout(()=>{
                            resolve();
                        },1000);
                    }).then(()=>{
                        p6.innerText += ` ${i}`;
                        return i; 
                    });
                    console.log(`imprimit ${res}`);
                }
            }


            let p6 = document.querySelector('#p6');
            p6.addEventListener('click', async () => {
                p6.innerHTML='';
                let array = ['primera', 'segunda', 'tercera'];
                console.log(array);
                await imprimirP6(array);
                console.log('despres imprimir');
            });

    });
})();

