import { setCookie, getCookie } from './cookies.js';
import { json } from './xhr.js';
import { planetCard, planetDetails } from './plantilles.js';

(() => {
  "use strict";

  let url = 'http://10.100.23.100:8069/terraform/terraform';
  let fetchOptions = {
    method: 'post',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: '{}'
  };


  class Player {
    constructor(id, avatar, name, planets) {
      this.id = id;
      this.avatar = avatar;
      this.name = name;
      this.planets = planets;
    }
    assign(response) {
      let playerObject = response.result[0];
      this.avatar = playerObject.avatar;
      this.name = playerObject.name;
      this.planets = playerObject.planets;
    }
    async paintPlanets(){
      document.querySelector('#nav-avatar').querySelector('img').src = "data:image/png;base64, " + this.avatar;
      for (let i of this.planets) {
       await fetch(`${url}/terraform.planet/${i}`, fetchOptions)
          .then(json).then((response) => {
            let planets = response.result[0];
            let planeta = new Planet();
            planeta = Object.assign(planeta, planets);
            planeta.paintCard();
          });
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
    paintCard() {
      let div = document.querySelector('#content');
      let plantilla = planetCard(this); // funció importada
      this.element = document.createElement('div');
      
     // this.element.classList.add('col-sm-4');
     // this.element.classList.add('mb-3');
     // this.element.querySelector('a').addEventListener('click', () => { div.innerHTML = ''; this.details(); });
      div.appendChild(this.element);
      this.element.outerHTML = plantilla;
    }
    details() {
      let div = document.querySelector('#content');
      let plantilla = planetDetails(this);
      this.details = document.createElement('div');
      this.details.innerHTML = plantilla;
      div.appendChild(this.details);

    }
  }



  function home() {
    let div = document.querySelector('#content');
    div.innerHTML = '';
    let player = new Player(10, '', '', []);
    fetch(`${url}/terraform.player/${player.id}`, fetchOptions)
      .then(json).then((response) => { 
        player.assign(response);
        player.paintPlanets();
      });
  }

  function login() {

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

    document.querySelector('#btn-login').addEventListener('click', () => {
      //console.log(this);
      let user = document.querySelector('#InputEmail').value;
      let pass = document.querySelector('#InputPassword').value;
      if (user != "" && user != null) {
        setCookie("username", user, 365);
        home();
      }
    })
  }

  function logout() {
    setCookie("username", 'user', -1);
    login();
  }


  document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('#nav-home').addEventListener('click', home);
    document.querySelector('#logout_button').addEventListener('click', logout);
    let user = getCookie("username");
    if (user != "") {
      home();
    } else {
      login();
    }

  });
})();
