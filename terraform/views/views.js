import {planetCard, planetDetails, planetError, login} from '../templates/plantilles';
export {viewPlanet}

class viewPlanet{
    constructor(planet){
        this.planet = planet;
    }
    viewCard(){
      let plantilla = planetCard(this.planet); // funció importada
      this.element = document.createElement('div');
      this.element.classList.add('card');
      this.element.classList.add('m-1');
      this.element.style = 'width: 12rem;';
      this.element.innerHTML = plantilla;
      app.content.appendChild(this.element);
      this.element.querySelector('a').addEventListener('click', () => { div.innerHTML = ''; this.details();  });
    }
    viewError(){
        let plantilla = planetError(this.planet); // funció importada
        this.element = document.createElement('div');
        this.element.classList.add('card');
        this.element.classList.add('m-1');
        this.element.style = 'width: 12rem;';
        this.element.innerHTML = plantilla;
        app.content.appendChild(this.element);
    }
    viewDetails(){
        let plantilla = planetDetails(this);
        this.details = document.createElement('div');
        this.element.classList.add('col');
        this.details.innerHTML = plantilla;
        app.content.appendChild(this.details);
        
    }
}