(() => {
    const apikey = 'apikey=09186f978ec0616e9dba9c4ac4b0c4bb';
    let off = 0;
    let lim = 20;

    document.addEventListener("DOMContentLoaded", function () {

        function makeRequest(method, url) {
            return new Promise((resolve,reject)=>{
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () { resolve(xhr.response); };
            xhr.onerror = function () { reject(xhr.response); };
            xhr.send();
        });
        }

        function allCharacters(offset,limit) {
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
                        characterElement.querySelector('a').addEventListener('click',function(){
                            characterDetails(character.id);
                        })
                        document.querySelector('#contenedor').appendChild(characterElement);
                    }
                    //// La paginacio
                    let paginacioElement = document.createElement('div');

                    document.querySelector('#contenedor').appendChild(paginacioElement);
                    let n_characters = JSON.parse(resultat).data.total;
                    let n_pagines = n_characters/20;
                    for(let i=0;i<n_pagines;i++){
                        let link = document.createElement('a');
                        link.classList.add('btn');  link.classList.add('btn-secondary');
                        link.innerText = i;
                        link.addEventListener('click',function(){
                            off = i*20
                            allCharacters(off,lim); 

                        })
                        paginacioElement.appendChild(link);

                    }
                }).catch((error)=> console.log(error));
                
        }

        function characterDetails(id){

            makeRequest('GET', `http://gateway.marvel.com/v1/public/characters/${id}?${apikey}`)
            .then(
            function (resultat) {
                let characterElement = document.createElement('div');
                let character = JSON.parse(resultat).data.results[0];
                let comics = '';
                for (let comic of character.comics.items){
                    comics = comics+comic.name+'<br/>';
                }
                let stories = '';
                for (let story of character.stories.items){
                    stories = stories+story.name+'<br/>';
                }
                    let plantilla = `<div class="card" style="width:500px;" >
            <img src="${character.thumbnail.path}/standard_fantastic.${character.thumbnail.extension}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${character.name}</h5>
              <p class="card-text">${character.description}</p>
              <p class="card-text">Comics:<br/>${comics}</p>
              <p class="card-text">Stories:<br/>${stories}</p>
              <a href="#" class="btn btn-primary">Return</a>
            </div>
          </div>`;
                    
                    characterElement.innerHTML = plantilla;
                    characterElement.classList.add('col');
                    characterElement.querySelector('a').addEventListener('click',function(){
                        allCharacters(off,lim);
                    })
                   document.querySelector('#contenedor').innerHTML = '';
                    document.querySelector('#contenedor').appendChild(characterElement);
                    comics = character.comics.items.map(c => c.resourceURI );
                    return comics.map((c)=> {
                        makeRequest('GET', `${comic}?${apikey}`)
                    })
               

            }).then(  //////////////////////TODO
                (promesesComics)=>{
                   console.log(promesesComics);
                    comics.forEach(comic => {
                        makeRequest('GET', `${comic}?${apikey}`)
                        .then( (c) => {
                            let details = JSON.parse(c).data.results[0];
                           
                            let plantilla = `Comic:${details.title} <br/>${details.description}`;
                            let p = document.createElement('p');
                            p.innerHTML = plantilla;
                            p.classList.add('card-text')
                            characterElement.appendChild(p)
                        });
                    });
                }
            )
            .catch((error)=> console.log(error));
        }

        allCharacters(0,20);

    });
})();


