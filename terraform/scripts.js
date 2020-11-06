(() => {
    "use strict"; // Prova a descomentar

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
      
      function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
      

      function descargar (method, url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {   callback(null, xhr.response); };
        xhr.onerror = function () {   callback(xhr.response); };
        xhr.send('{}');
    }

  


    class Player {
        constructor(id, avatar, name, planets) {
            this.id = id;
            this.avatar = avatar;
            this.name = name;
            this.planets = planets;
        }
        asignar(err,response){
            if (err) { throw err; }
            let playerObject = JSON.parse(response).result[0];
            this.avatar = playerObject.avatar;
            this.name = playerObject.name;
            this.planets = playerObject.planets;
            document.querySelector('#nav-avatar').querySelector('img').src = "data:image/png;base64, "+this.avatar;
            for (let i of this.planets) {
                descargar('POST',
                'http://10.100.23.100:8069/terraform/terraform/terraform.planet/'+i,
                (err,response)=>{
                    let planets = JSON.parse(response).result[0];
                    let planeta = new Planet();
                    planeta = Object.assign(planeta,planets);
                    planeta.paint();});
            }
        }
    }
    class Planet {
        constructor(
            /*id, image, name, player, nPlanet, sun,
            averageTemperature, oxigen, co2, water,
            material, energy, gravity, airDensity*/
            ) {
            this.id = 'id';
            this.image = 'image';
            this.name = 'name';
            this.player = 'player';
            this.n_planet = 'nPlanet';
            this.sun = 'sun';
            this.average_temperature = 'averageTemperature';
            this.oxigen = 'oxigen';
            this.co2 = 'co2';
            this.water = 'water';
            this.material = 'material';
            this.energy = 'energy';
            this.gravity = 'gravity';
            this.air_density = 'airDensity';
        }
        
        paint() {
            let div = document.querySelector('#content');
            let plantilla = `<div class="card" style="width: 18rem;">
                            <img src="data:image/png;base64, ${this.image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${this.name}</h5>
                                    <p class="card-text">${this.sun}</p>
                                    <p class="card-text">${this.player}</p>
                                    <a href="#" class="btn btn-primary">Details</a>
                                </div>
                        </div>`;
            this.element = document.createElement('div');
            this.element.innerHTML = plantilla;
            this.element.classList.add('col-sm-4');
            this.element.classList.add('mb-3');
            this.element.querySelector('a').addEventListener('click', () => { div.innerHTML = ''; this.details(); });
            div.appendChild(this.element);

        }
        details() {
            let div = document.querySelector('#content');
            let plantilla = `<div class="card" >
                        <img src="data:image/png;base64, ${this.image}" class="card-img-top" alt="...">
                        <h5 class="card-header">${this.name}</h5>
                            <div class="card-body">
                                <h5 class="card-title">${this.name}</h5>
                                <p class="card-text">Sun: ${this.sun} Player: ${this.player} nPlanet: ${this.nPlanet}</p>
                                
                            </div>
                    </div>`;
            this.details = document.createElement('div');

            this.details.innerHTML = plantilla;
            div.appendChild(this.details);

        }
    }



    function home(){
        let div = document.querySelector('#content');
        div.innerHTML = '';

        let player = new Player(1,'','',[]);
        descargar('POST',
        'http://10.100.23.100:8069/terraform/terraform/terraform.player/'+player.id,
        (err,response)=> player.asignar(err,response));

    }

    function login(){
        
        let form = `<form onsubmit="return false;" class="bg-dark text-light">
        <div class="form-group ">
          <label for="exampleInputEmail1">Email address</label>
          <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp">
          <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input type="password" class="form-control" id="InputPassword">
        </div>
        <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1">
          <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button  class="btn btn-primary" id="btn-login">Submit</button>
      </form>`
      let formElement = document.createElement('div');
      formElement.innerHTML = form;
      formElement.classList.add('col');
      let div = document.querySelector('#content');
      div.innerHTML = '';
      div.appendChild(formElement);

      document.querySelector('#btn-login').addEventListener('click',() => {
          console.log(this);
          let user = document.querySelector('#InputEmail').value;
          let pass = document.querySelector('#InputPassword').value;
          if (user != "" && user != null) {
            setCookie("username", user, 365);
            home();
          }
      })

       /* if (user != "" && user != null) {
          setCookie("username", user, 365);
        }*/
    }


    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector('#nav-home').addEventListener('click',home);
        let user = getCookie("username");
            if (user != "") {
                home();
            } else {
           login();
            }
    
    });
})();
