import { setCookie, getCookie } from './cookies.js';
import { json, obtener, remoteLogin } from './xhr.js';
import { planetCard, planetDetails, planetError, login as loginTemplate } from './templates/plantilles.js';
import { viewPlanet, viewPages} from './views/views.js'
import {Router} from './router.js';
import {Model} from './model.js';

(() => {
  "use strict";

  //let url = 'http://10.100.23.100:8069/terraform/terraform';
  let url = 'http://192.168.88.72:8069/terraform/terraform';
  window.app = {};
  window.app.url = url;

 
 
  class Player extends Model{
    constructor(id, avatar, name, planets) {
      super(`${url}/terraform.player`,id)
      
      this.avatar = avatar;
      this.name = name;
      this.planets = planets;
      this.planetsDict = {}
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
            console.log('Fallo: '+error);
            planeta.paintError(i);
          }
        );
      }
     // console.log(this.planetsDict);
    }
  }
  class Planet extends Model {
    constructor( id
      /*id, image, name, player, nPlanet, sun,
      averageTemperature, oxigen, co2, water,
      material, energy, gravity, airDensity*/
    ) {
      super(`${url}/terraform.planet`,id)
      
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

    loadDetails(){
     
      let buildings = this.buildings.map((b)=>{  // Descarreguar els edificis
        return obtener(`${url}/terraform.building/${b}`,
        (response)=> response, 
        (error) => console.log(error))
        .then((building)=> {  // una vegada descarregat un edifici cal descarregar els seus detalls
          return obtener(`${url}/terraform.building_type/${building.result[0].name[0]}`, // detalls del tipus
          (response)=>response.result[0],
          (error) => console.log(error))
          .then((name)=>{building.result[0].name=name; return building.result[0];});
        });;
      });
    
      let planetaryChanges = fetch(`${url}/terraform.planetary_changes`,{
        method: 'post',
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: `{"jsonrpc":"2.0","method":"call","params":{"f1":"planet.id","f2":"=","f3":"${this.id}"}}`
      }).then(json).then((result)=>{
        this.planetaryChanges = result.result;
        //console.log('Dins de cada planeta ',this.planetaryChanges);
      });

      return Promise.all([buildings,planetaryChanges]);
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

      let login = remoteLogin(`${url}/login`,user,pass);
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

  app.planet = function planet(id){
    let planeta = new Planet();
    planeta.id = id;
    planeta.load().then(()=>{
      //console.log('despres de load ',planeta.planetaryChanges);
      app.checkPlayer(
        ()=>planeta.details()
        )});
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
