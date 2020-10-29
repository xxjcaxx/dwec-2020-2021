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
      
  


    class Player {
        constructor(id, avatar, name, planets) {
            this.id = id;
            this.avatar = avatar;
            this.name = name;
            this.planets = planets;
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
        let player = new Player(1,'','',[]);
        var req1 = new XMLHttpRequest();
        
        req1.open('POST', 'http://10.100.23.100:8069/terraform/terraform/terraform.player/'+player.id, true);
        req1.setRequestHeader('Content-Type', 'application/json');
        req1.onreadystatechange = function (aEvt) {
            console.log(req.readyState);
            if (req1.readyState == 4) {
                if (req1.status == 200) {
                    //console.log(req1.responseText);
                    let playerObject = JSON.parse(req1.responseText).result[0];
                    //console.log(player, playerObject);
                    player.avatar = playerObject.avatar;
                    player.name = playerObject.name;
                    player.planets = playerObject.planets;
                    document.querySelector('#nav-avatar').querySelector('img').src = "data:image/png;base64, "+player.avatar;
                    console.log(player.planets);
                }
                else
                    console.log("Error loading page\n");
            }
        };
        req1.send('{}');

        let div = document.querySelector('#content');
        div.innerHTML = '';
        var req = new XMLHttpRequest();
        
        req.open('POST', 'http://10.100.23.100:8069/terraform/terraform/planets/20', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function (aEvt) {
            //console.log(req.readyState);
            if (req.readyState == 4) {
                if (req.status == 200) {
                    //console.log(req.responseText);
                    let planets = JSON.parse(req.responseText);
                    console.log(planets);

                    for (let p of planets.result) {
                    
                            let planeta = new Planet();
                            planeta = Object.assign(planeta,p);
                        planeta.paint();
                    }
                }
                else
                    console.log("Error loading page\n");
            }
        };
        req.send('{}');
    }


    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector('#nav-home').addEventListener('click',home);
        var user = getCookie("username");
            if (user != "") {
                home();
            } else {
              user = prompt("Please enter your name:", "");
              if (user != "" && user != null) {
                setCookie("username", user, 365);
              }
            }
          
        
    });
})();
