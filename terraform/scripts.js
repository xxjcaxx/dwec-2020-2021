import { setCookie, getCookie } from './cookies.js';
import { json, obtener } from './xhr.js';
import { planetCard, 
  planetDetails, planetError,
login as loginTemplate } from './plantilles.js';

(() => {
  "use strict";

  let url = 'http://10.100.23.100:8069/terraform/terraform';
 
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
        await obtener(`${url}/terraform.planet/${i}`,(response) => {
          let planets = response.result[0];
          let planeta = new Planet();
          planeta = Object.assign(planeta, planets);
          planeta.paintCard();
          //planeta.paintError(i);
        }, 
        (error)=>{   // fracaso
          console.log('Fallo'+error);
          planeta.paintError(i);
        })
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
      this.element.classList.add('card');
      this.element.classList.add('m-1');
      this.element.style = 'width: 12rem;';
      this.element.innerHTML = plantilla;
      div.appendChild(this.element);
      //this.element.outerHTML = plantilla;
      this.element.querySelector('a').addEventListener('click', () => { div.innerHTML = ''; this.details();  });
      
    }
    paintError(i) {
      let div = document.querySelector('#content');
      let plantilla = planetError(i); // funció importada
      this.element = document.createElement('div');
      this.element.classList.add('card');
      this.element.classList.add('m-1');
      this.element.style = 'width: 12rem;';
      this.element.innerHTML = plantilla;
      div.appendChild(this.element);
      //this.element.outerHTML = plantilla;
      
    }
    details() {
      let div = document.querySelector('#content');
      let plantilla = planetDetails(this);
      this.details = document.createElement('div');
      this.element.classList.add('col');
      this.details.innerHTML = plantilla;
      div.appendChild(this.details);
      
      

    }
  }



  function home() {
    let div = document.querySelector('#content');
    div.innerHTML = '';
    let player = new Player(10, '', '', []);
    obtener(`${url}/terraform.player/${player.id}`,(response) => {  // exito
      player.assign(response);
      player.paintPlanets();
    }, 
    (error)=>{   // fracaso
      console.log('Fallo: '+error);
      div.innerHTML=`<img src="./img/alderaan.gif" /><h3 class="text-light" >Error en la xarxa: ${error}</h3>`;
    });

  }

  function login() {

    let form = loginTemplate();
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
