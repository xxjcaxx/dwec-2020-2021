(() => {
    const apikey = 'apikey=09186f978ec0616e9dba9c4ac4b0c4bb';

    document.addEventListener("DOMContentLoaded", function () {
        function makeRequest(method, url, done) {
            var xhr = new XMLHttpRequest();
            xhr.open(method, url);
            xhr.onload = function () { done(null, xhr.response); };
            xhr.onerror = function () { done(xhr.response); };
            xhr.send();
        }

        makeRequest('GET', 'http://gateway.marvel.com/v1/public/characters?' + apikey,
            function (err, resultat) {
                if (err) { throw err; }

                let llista = JSON.parse(resultat).data.results;
                console.log(llista);
                for (character of llista) {
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
                    document.querySelector('#contenedor').appendChild(characterElement);

                }
            });
    });
})();