import { planetCard, planetDetails, planetError, login } from '../templates/plantilles.js';
export { viewPlanet, viewPages }

class viewPlanet {
    constructor(planet) {
        this.planet = planet;
    }
    viewCard() {
        let plantilla = planetCard(this.planet); // funció importada
        let element = document.createElement('div');
        element.classList.add('card');
        element.classList.add('m-1');
        element.style = 'width: 12rem;';
        element.innerHTML = plantilla;
        app.content.appendChild(element);
       // element.querySelector('a').addEventListener('click', () => { app.content.innerHTML = ''; this.planet.details(); });
        element.querySelector('a').addEventListener('click', () => { 
            app.router.load('/planet/'+this.planet.id) });
    }
    viewError() {
        let plantilla = planetError(this.planet); // funció importada
        let element = document.createElement('div');
        element.classList.add('card');
        element.classList.add('m-1');
        element.style = 'width: 12rem;';
        element.innerHTML = plantilla;
        app.content.appendChild(element);
    }
    viewDetails() {
        app.content.innerHTML = ''; 
        let plantilla = planetDetails(this.planet);
        let details = document.createElement('div');
        details.classList.add('col');
        details.innerHTML = plantilla;
        app.content.appendChild(details);

    }
}

class viewPages {
    constructor(){

    }
    viewHome() {
        app.content.innerHTML = '';
        app.player.paintPlanets();
    }
}