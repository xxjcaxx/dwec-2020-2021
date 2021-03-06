import { setCookie, getCookie } from './cookies.js';
import { json, obtener, buscarObtener, remoteLogin } from './xhr.js';
import { login as loginTemplate } from './templates/templates.js';
import { viewPages } from './views/views.js'
import { viewPlanet } from './views/views_planet.js'
import { Router } from './router.js';
import { Model } from './model.js';

(() => {
  "use strict";

  const url = 'http://10.100.23.100:8069/terraform/terraform';
  //const url = 'http://192.168.88.72:8069/terraform/terraform';
  window.app = {};
  window.app.url = url;
  app.planetsDict = {};



  class Player extends Model {
    constructor(id, avatar, name, planets) {
      super(`${url}/terraform.player`, id)

      this.avatar = avatar;
      this.name = name;
      this.planets = planets;
      //this.planetsDict = {}
    }

    async paintPlanets() {
      document.querySelector('#nav-avatar').querySelector('img').src = "data:image/png;base64, " + this.avatar;
      for (let i of this.planets) {
        
        let planeta = new Planet();
        planeta.id = i;
        await planeta.load().then(() => {
          app.planetsDict[planeta.id] = planeta;
         // console.log(planeta);
          planeta.paintCard();
        }).catch(
          (error) => {   // fracaso
            console.log('Fallo Planeta: ' + error);
            planeta.paintError(i);
          }
        );
      }
      // console.log(this.planetsDict);
    }
  }
  class Planet extends Model {
    constructor(id
      /*id, image, name, player, nPlanet, sun,
      averageTemperature, oxigen, co2, water,
      material, energy, gravity, airDensity*/
    ) {
      super(`${url}/terraform.planet`, id)

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
      this.buildings = []; this.buildingsDetails = [];
      this.view = new viewPlanet(this);
    }

    loadDetails() {

      let buildings = this.buildings.map((b) => {  // Descarreguar els edificis
        return obtener(`${url}/terraform.building/${b}`,
          (response) => response,
          (error) => console.log(error))
          .then((building) => {  // una vegada descarregat un edifici cal descarregar els seus detalls
            return obtener(`${url}/terraform.building_type/${building.result[0].name[0]}`, // detalls del tipus
              (response) => response.result[0],
              (error) => console.log(error))
              .then((name) => { building.result[0].name = name; return building.result[0]; });
          });;
      });

      let planetaryChanges = fetch(`${url}/terraform.planetary_changes`, {  // Es podria utilitzar buscarObtener
        method: 'post',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: `{"jsonrpc":"2.0","method":"call","params":{"f1":"planet.id","f2":"=","f3":"${this.id}"}}`
      }).then(json).then((result) => {
        this.planetaryChanges = result.result;
        //console.log('Dins de cada planeta ',this.planetaryChanges);
      });

      buildings.push(planetaryChanges); // afegir la promesa per a resoldrer-les totes juntes

      return Promise.all(buildings).then((res) => {
        //res sera un array d'edificis
        this.buildingsDetails = res;
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
  class Sun extends Model {
    constructor(id) {
      super(`${url}/terraform.sun`, id)
    }
    loadPlanets() {
      let { planets } = this;
      let promesesPlanetes = planets.map((p) => {
        let planeta = new Planet(p);
        return planeta.load().then(() => planeta);
      });
      return Promise.all(promesesPlanetes).then((response) =>
        this.planetsDetails = response
      )
    }
  }

  class Travel extends Model {
    constructor(id) {
      super(`${url}/terraform.travel`, id)
    }
  }
  Travel.URL = `${url}/terraform.travel`;
  
  app.createTravel = (data)=> Travel.create(data);

  app.checkPlayer = function checkPlayer(callback) {
    let user = getCookie("username");
    if (user != "") {
      let player = new Player(1, '', '', []);
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

      let login = remoteLogin(`${url}/login`, user, pass);
      console.log(login);

      if (user != "" && user != null) {
        setCookie("username", user, 365);
        app.home();
      }
    })
  }

  app.logout = function logout() {
    setCookie("username", 'user', -1);
    app.login();
  }

  app.planet = function planet(id) {
    let planeta = app.planetsDict[id];
    app.checkPlayer(() => planeta.details());
  }

  app.suns = function pageSuns() {
    app.sunList = {};
    buscarObtener(`${app.url}/terraform.sun`, 'id', '>', '0',
      function exito(response) {
        for (let sun of response.result) {
          let sunAux = new Sun(sun.id);
          sunAux.assign(sun)

          app.sunList[sun.id] = sunAux;
        }
      },
      function fracaso(error) { console.log(error); })
      .then(        // quan ja te els sols
        () => {
          console.log(app.sunList);
          app.checkPlayer(app.viewPages.viewSuns);
        });
  }

  app.travels = function pageTravels() {
    app.travelsList = {};
    buscarObtener(`${app.url}/terraform.travel`, 'player', '=', parseInt(app.player.id),  // falla per integer
      function exito(response) {
        for (let travel of response.result) {
          let travelAux = new Travel(travel.id);
          travelAux.assign(travel)

          app.travelsList[travel.id] = travelAux;
        }
      },
      function fracaso(error) { console.log(error); }
      )
      .then(() => 
      buscarObtener(`${app.url}/name_id/terraform.planet`, 'id', '>', '0',
      function exito(response) {
        app.allPlanets = [];
        for (let planet of response.result) {
          let planetAux = new Planet(planet.id);
          planetAux.assign(planet)
          app.allPlanets.push(planetAux);
        }
        //console.log(app.allPlanets);
      },
      function fracaso(error) { console.log(error); }
      ))
      .then(() => {
         // console.log(app.travelsList);
          app.checkPlayer(app.viewPages.viewTravels);
        }
        );
  }




  document.addEventListener("DOMContentLoaded", function () {

    app.content = document.querySelector('#content'); // Sempre serà accessible per tots
    app.viewPages = new viewPages(); // fer accessibles les pàgines
    app.router = new Router();

    document.querySelector('#nav-home').addEventListener('click', () => app.router.load('home'));
    document.querySelector('#nav-suns').addEventListener('click', () => app.router.load('suns'));
    document.querySelector('#nav-travels').addEventListener('click', () => app.router.load('travels'));
    document.querySelector('#logout_button').addEventListener('click', app.logout);



  });
})();
