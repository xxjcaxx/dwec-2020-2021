let fakeSlowNetwork = 1;
let storyDiv;

function wait(ms) {
  return new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });
}

function addTextToPage(content) {
  var p = document.createElement("p");
  p.textContent = content;
  storyDiv.appendChild(p);
}

function addHtmlToPage(content) {
  var div = document.createElement("div");
  div.innerHTML = content;
  storyDiv.appendChild(div);
}

function get(url) {
  // Wait Retorna una promesa
  var fakeNetworkWait = wait(3000 * Math.random() * fakeSlowNetwork);

  var requestPromise = new Promise(function (resolve, reject) {
    // Demanar coses per XHR
    var req = new XMLHttpRequest();
    req.open("get", url);

    req.onload = function () {
      // Comprovar el status
      if (req.status == 200) {
        // Resoldre la promesa amb el text obtingut per http
        resolve(req.response);
      } else {
        // Si no funciona rebutjar la promesa amb el text d'error
        reject(Error(req.statusText));
      }
    };
    // Gestionar errors de xarxa
    req.onerror = function () {
      reject(Error("Network Error"));
    };
    // Fer la petició
    req.send();
  });
  // Espera a les dos funcions
  return Promise.all([fakeNetworkWait, requestPromise]).then(function (
    results
  ) {
    return results[1];
  });
}

function getJson(url) {
  // Funció per a parsear JSON
  return get(url).then(JSON.parse);
}

(function () {
  //autoinvocada
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {
    // esperar a que carregue
    storyDiv = document.querySelector(".story"); // seleccionar on va el text
    getJson("story.json")
      .then(function (story) {
        let div = document.createElement("div");
        div.innerHTML = story.heading;
        storyDiv.appendChild(div);
        // Obtindre un array de promeses i esperar a totes elles
        return Promise.all(
          // Mapejar un array de urls de capítuls 
          // En un array de promeses
          story.chapterUrls.map(getJson)
        );
      })
      .then(function (chapters) {
        // Ara tenim els capítuls en ordre i anem a clavar-los en la pàgina
        chapters.forEach(function (chapter) {
          addHtmlToPage(chapter.html);
        });
        addTextToPage("All done");
      })
      .catch(function (err) {
        // Atendre qualsevol error que ha passat
        addTextToPage("Argh, broken: " + err.message);
      })
      .then(function () { // llevar el spinner
        document.querySelector(".spinner").style.display = "none";
      });
  });
})(); // fi autoinvocada
