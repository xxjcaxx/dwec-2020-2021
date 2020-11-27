import { setCookie, getCookie } from './cookies.js';
import { json, obtener, remoteLogin } from './xhr.js';
import { planetCard, planetDetails, planetError, login as loginTemplate } from './templates/plantilles.js';
import { viewPlanet, viewPages} from './views/views.js'
import {Router} from './router.js'

(() => {
  "use strict";

  let url = 'http://10.100.23.100:8069/terraform/terraform';
  window.app = {};
  window.app.url = url;
  
 
  class Player {
    constructor(id, avatar, name, planets) {
      this.id = id;
      this.avatar = avatar;
      this.name = name;
      this.planets = planets;
      this.planetsDict = {}
      
    }
    load(){
      return obtener(`${url}/terraform.player/${this.id}`, (response) => {  // exito
        this.assign(response);
         },
        (error) => {   // fracaso
            console.log('Fallo: ' + error);
            app.content.innerHTML = `<img src="./img/alderaan.gif" /><h3 class="text-light" >Error en la xarxa: ${error}</h3>`;
        });
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
        let planeta = new Planet();
        planeta.id = i;
        await planeta.load().then(()=>{
          this.planetsDict[planeta.id] = planeta;
          planeta.paintCard();
        }).catch(
          (error)=>{   // fracaso
            console.log('Fallo'+error);
            planeta.paintError(i);
          }
        );
      }
     // console.log(this.planetsDict);
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

      this.view = new viewPlanet(this);
    }
    load(){
      return obtener(`${url}/terraform.planet/${this.id}`, (response) => {  // exito
          let planets = response.result[0];
          Object.assign(this, planets);
         },
        (error) => {   // fracaso
            console.log('Fallo: ' + error);
            
        });
    }

    paintCard() {
      this.view.viewCard();
    }
    paintError(i) {
      this.view.viewError();
    }
    details() {
      this.view.viewDetails();
    }
  }
  class Sun {
    constructor(){
      
    }
  }

  app.checkPlayer = function checkPlayer(callback){
    let user = getCookie("username");
    if (user != "") {
      let player = new Player(10, '', '', []);
      app.player = player;
      app.player.load().then(callback);
    } else {
      app.login();
    }
  }

  app.home = function home() {
    app.checkPlayer(app.viewPages.viewHome);
  }

  app.login = function login() {

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

      let login = remoteLogin(`${url}/login`,user,pass);
      console.log(login);

      if (user != "" && user != null) {
        setCookie("username", user, 365);
        home();
      }
    })
  }

  app.logout = function logout() {
    setCookie("username", 'user', -1);
    login();
  }

  app.planet = function planet(id){
    let planeta = new Planet();
    planeta.id = id;
    planeta.load().then(()=>app.checkPlayer(()=>planeta.details()));
  }

  app.sun = function sun(id){

  }


  document.addEventListener("DOMContentLoaded", function () {

    app.content = document.querySelector('#content'); // Sempre serà accessible per tots
    app.viewPages = new viewPages(); // fer accessibles les pàgines
    app.router = new Router();
  
    document.querySelector('#nav-home').addEventListener('click', ()=> app.router.load('home') );
    document.querySelector('#logout_button').addEventListener('click', app.logout);

  

  });
})();
