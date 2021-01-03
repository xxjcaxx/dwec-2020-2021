(() => {
    document.addEventListener("DOMContentLoaded", function() { // Falta esperar al dom
        let arrayPromeses = [];
        for (let i = 0; i < 3; i++) {
            let button = document.createElement('button');
            button.innerHTML = 'Boton ' + i;
            arrayPromeses.push(new Promise(
                    (resolve) => {
                        button.addEventListener('click', () => {
                                console.log(button);
                                resolve();
                            }) // fi event 
                    }) // fi executora
            ); // fi de la promesa
            document.querySelector('#content').append(button);
        }
        Promise.all(arrayPromeses).then(() => {
            console.log('Totes les promeses');
            let avis = document.createElement('h1');
            avis.innerHTML = 'Totes les promeses';
            document.querySelector('#content').append(avis);
        });
    });
})();

/////////////// Segona solució amb una única promesa que no m'agrada

(() => {
    document.addEventListener("DOMContentLoaded", function() { // Falta esperar al dom
        let botones = [false, false, false];
        for (let i = 0; i < 3; i++) {
            let button = document.createElement('button');
            button.innerHTML = 'Boton ' + i;
            button.addEventListener('click', () => {
                console.log(button);
                botones[i] = true
            }); // fi event 

            document.querySelector('#content').append(button);
        }
        new Promise((resolve) => {
            let interval = setInterval(() => {
                if (botones[0] && botones[1] && botones[2]) {
                    console.log('totes2');
                    resolve();
                    clearInterval(interval);
                }

            }, 100);
        }).then(() => {
            console.log('Totes les promeses2');
            let avis = document.createElement('h1');
            avis.innerHTML = 'Totes les promeses 2';
            document.querySelector('#content').append(avis);
        });
    });
})();