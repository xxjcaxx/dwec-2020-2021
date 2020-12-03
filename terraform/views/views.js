import { planetCard, planetDetails, planetError, login, buildingCard } from '../templates/plantilles.js';
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
        //console.log(this.planet);
        let details = document.createElement('div');
        //details.classList.add('col');
        //details.innerHTML = plantilla;
        app.content.append(details);
        details.outerHTML = plantilla;


        ///////// El gràfic

        let data = {
            labels:[],
            datasets:[], 
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        };
        data.labels = this.planet.planetaryChanges.map((p)=>p.time);

        // emission
       // console.log(this.planet.planetaryChanges);
        let emission = this.planet.planetaryChanges.map((p)=>p.emission)
        data.datasets.push({label:'Emission',data:emission, pointRadius: 0, borderColor: 'rgba(255,99,132,1)', fill:false,borderWidth:2})

        //greenhouse
        let greenhouse = this.planet.planetaryChanges.map((p)=>p.greenhouse)
        data.datasets.push({label:'Greenhouse',data:greenhouse, pointRadius: 0, borderColor: 'rgba(255,255,99,1)', fill:false,borderWidth:2})

         //temperature
         let temp = this.planet.planetaryChanges.map((p)=>p.average_temperature)
         data.datasets.push({label:'Temperature',data:temp, pointRadius: 0, borderColor: 'rgba(99,255,99,1)', fill:false,borderWidth:2})

          //co2
        let co2 = this.planet.planetaryChanges.map((p)=>p.co2)
        data.datasets.push({label:'Co2',data:co2,pointRadius: 0, borderColor: 'rgba(99,99,99,1)', fill:false,borderWidth:2})

         //oxigen
         let oxigen = this.planet.planetaryChanges.map((p)=>p.oxigen)
         data.datasets.push({label:'Oxigen',data:greenhouse,pointRadius: 0, borderColor: 'rgba(99,99,255,1)', fill:false,borderWidth:2})

          //plants
        let plants = this.planet.planetaryChanges.map((p)=>p.plants)
        data.datasets.push({label:'Plants',data:plants,pointRadius: 0, borderColor: 'rgba(150,255,160,1)', fill:false,borderWidth:2})

                  //animals
        let animals = this.planet.planetaryChanges.map((p)=>p.animals)
        data.datasets.push({label:'Animals',data:animals,pointRadius: 0, borderColor: 'rgba(150,150,0,1)', fill:false,borderWidth:2})
          
          

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: data,
        });
      /*  var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                   // backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',    
                    fill: false,
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });*/
       ////////////////// Els edificis

      // console.log(this.planet.buildingsDetails);
        for(let b of this.planet.buildingsDetails){
            if(b != undefined){
            let plantilla = buildingCard(b);
            let element = document.createElement('div');
            //element.classList.add('card');
            element.classList.add('p-1');
            element.classList.add('col');
            
            element.innerHTML = plantilla;
            document.querySelector('#building_list').append(element);
        }
      }

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