(() => {
    const apikey = 'apikey=09186f978ec0616e9dba9c4ac4b0c4bb';
    let off = 0;
    let lim = 20;

    document.addEventListener("DOMContentLoaded", function () {

        function makeRequest(method, url) {
            return new Promise((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.open(method, url);
                xhr.onload = function () { resolve(xhr.response); };
                xhr.onerror = function () { reject(xhr.response); };
                xhr.send();
            });
        }

        function allCharacters(offset, limit) {
            makeRequest('GET', `http://gateway.marvel.com/v1/public/characters?limit=${limit}&offset=${offset}&${apikey}`)
                .then(
                    function (resultat) {
                        document.querySelector('#contenedor').innerHTML = '';
                        let llista = JSON.parse(resultat).data.results;
                        //console.log(llista);
                        for (let character of llista) {
                            let plantilla = `<div class="card" style="width: 18rem;">
                <img src="${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${character.name}</h5>
                  <p class="card-text">${character.description}</p>
                  <a href="#" class="btn btn-primary">Details</a>
                </div>
              </div>`;
                            let characterElement = document.createElement('div');
                            characterElement.innerHTML = plantilla;
                            characterElement.classList.add('col');
                            characterElement.querySelector('a').addEventListener('click', function () {
                                characterDetails(character.id);
                            })
                            document.querySelector('#contenedor').appendChild(characterElement);
                        }
                        //// La paginacio
                        let paginacioElement = document.createElement('div');

                        document.querySelector('#contenedor').appendChild(paginacioElement);
                        let n_characters = JSON.parse(resultat).data.total;
                        let n_pagines = n_characters / 20;
                        for (let i = 0; i < n_pagines; i++) {
                            let link = document.createElement('a');
                            link.classList.add('btn'); link.classList.add('btn-secondary');
                            link.innerText = i;
                            link.addEventListener('click', function () {
                                off = i * 20
                                allCharacters(off, lim);

                            })
                            paginacioElement.appendChild(link);

                        }
                    }).catch((error) => console.log(error));

        }

        function characterDetails(id) {
            let characterElement = document.createElement('div');
            makeRequest('GET', `http://gateway.marvel.com/v1/public/characters/${id}?${apikey}`)
                .then(
                    function (resultat) {
                        
                        let character = JSON.parse(resultat).data.results[0];
                        character.element = characterElement;

                        let plantilla = `<div class="card" style="width:500px;" >
            <img src="${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${character.name}</h5>
              <p class="card-text">${character.description}</p>
            </div>
          </div>`;
                        characterElement.innerHTML = plantilla;
                        characterElement.classList.add('col');
                        document.querySelector('#contenedor').innerHTML = '';
                        document.querySelector('#contenedor').appendChild(characterElement);

                        return character;

                    }).then(
                        (character) => {
                            return itemsDetailsAll(character, 'comics');
                        }
                    ).then(
                        (character) => {
                            return itemsDetailsAll(character, 'stories');
                        }
                    ).catch((error) => console.log(error))
                    .then(
                        () => {

                            console.log('boton');
                            let button = document.createElement('a');
                            button.classList.add('btn', 'btn-primary');
                            button.innerText = 'Return';
                            characterElement.querySelector('.card-body').appendChild(button);
                            button.addEventListener('click', function () {
                                allCharacters(off, lim);
                            })
                        }
                    );
                
        }

        function itemsDetails(character, item) {
            console.log(character);
            for (uri of character[item].items.map(i => i.resourceURI)) {
                console.log("----------" + uri);
                makeRequest('GET', `${uri}?${apikey}`)
                    .then((i) => {
                        console.log(uri);
                        let details = JSON.parse(i).data.results[0];
                        let plantilla = `${item} :${details.title} <br/>${details.description}`;
                        let p = document.createElement('p');
                        p.innerHTML = plantilla;
                        p.classList.add('card-text')
                        character.element.querySelector('.card-body').appendChild(p)
                    });
            }
            return character;
        }

        function itemsDetailsAll(character, item) {
            let arrayPromeses = character[item].items
                .map(i => i.resourceURI)  // me quede sols en la uri
                .map(uri => { // transforme la uri en una promesa d'aconseguir-la
                    return makeRequest('GET', `${uri}?${apikey}`);
                });
            console.log(arrayPromeses);  // Les promeses estan pendents
            return Promise.all(arrayPromeses).then((i) => { //retorne la promesa de complir l'array de promeses
                i.map(j => { // aquesta funció s'executarà quan tinga totes les promeses resoltes
                    let details = JSON.parse(j).data.results[0];
                    let plantilla = `${item} :<b>${details.title}</b> <br/>${details.description}`;
                    let p = document.createElement('p');
                    p.innerHTML = plantilla;
                    p.classList.add('card-text')
                    character.element.querySelector('.card-body').appendChild(p);
                });
                return character; // quan promise.all acabe retorna el character per al següent then
            });
            
        }




        allCharacters(0, 20);

    });
})();


