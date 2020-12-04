import { planetCard, planetDetails, planetError, login, buildingCard, sunTemplates, travelTemplates } from '../templates/plantilles.js';
import { obtener, buscarObtener } from '../xhr.js';
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

class viewSun {
    constructor(sun){
        this.sun = sun;
    }
    viewCard(){
        let plantilla = sunTemplates.sunCard(this.sun); 
        let element = document.createElement('div');
        element.classList.add('card');
        element.classList.add('m-1');
        element.style = 'width: 12rem;';
        element.innerHTML = plantilla;
        app.content.appendChild(element);
        element.addEventListener('click', () => { 
            console.log(this.sun);
           this.viewDetails(element);
        });
    
    }
    viewDetails(element){
 
        $("#sunSystemModal").modal('show');
        $('#sunSystemModalLabel').html(`${this.sun.display_name}`);
        this.sun.loadPlanets()
            .then(()=>{
                $("#svgSolarSystem").find("circle").remove();
                $("#svgSolarSystem").find(".svgPlaneta").remove();
                this.sun.planetsDetails.map(p=>{
                    let centro = 350;
                    let diametro = p.gravity*2;
                    let posicion = p.n_planet*30+centro+(25-diametro/2)
                    let imagePlanet = document.createElementNS('http://www.w3.org/2000/svg','image');
                    imagePlanet.setAttributeNS('http://www.w3.org/1999/xlink','xlink:href',`data:image/png;base64,${p.image_small}`);
                    imagePlanet.setAttribute('x',posicion+'');
                    imagePlanet.setAttribute('y','335');
                    imagePlanet.setAttribute('class','svgPlaneta');
                    imagePlanet.setAttribute('height',diametro+'');
                    imagePlanet.setAttribute('width',diametro+'');
                    let orbit = document.createElementNS('http://www.w3.org/2000/svg','circle');
                    orbit.setAttribute('cx',centro+"");
                    orbit.setAttribute('cy',centro+"");
                    orbit.setAttribute('r',(p.n_planet*30+25)+'');
                    orbit.setAttribute('stroke','grey');
                    orbit.setAttribute('stroke-width','2');
                    orbit.setAttribute('fill-opacity','0');
                    $("#svgSolarSystem").append(orbit);
                    $("#svgSolarSystem").append(imagePlanet);
                    });
               
             
            });
            
    }
}


class viewTravel {
    constructor(travel){
        this.travel = travel;
    }
    viewCard(){
        let plantilla = travelTemplates.travelCard(this.travel); 
        let element = document.createElement('div');
        element.classList.add('card');
        element.classList.add('m-1');
        element.style = 'width: 12rem;';
        element.innerHTML = plantilla;
        app.content.appendChild(element);
       /* element.addEventListener('click', () => { 
            console.log(this.sun);
           this.viewDetails(element);
        });*/
    
    }
}

class viewPages {
    constructor(){

    }
    viewHome() {
        app.content.innerHTML = '';
        app.player.paintPlanets();
    }
    viewSuns() {  //Pagina dels sols
        app.content.innerHTML = sunTemplates.sunModal();
        for (let sun of Object.entries(app.sunList)){
            let vs = new viewSun(sun[1]);
            vs.viewCard();
        }
    }
    viewTravels() {  //Pagina dels travels
        app.content.innerHTML = '';
        console.log(app.travelsList);
        for (let travel of Object.entries(app.travelsList)){
            let vt = new viewTravel(travel[1]);
            vt.viewCard();
        }
        let separador = document.createElement('div');
        separador.classList.add("w-100");
        app.content.append(separador);

        let cardForm = document.createElement('div');
        cardForm.classList.add('col');
        cardForm.innerHTML = travelTemplates.travelForm();
        app.content.append(cardForm);

        $('#tf_player').val(app.player.name);
        for(let p of app.player.planets){
            //console.log(app.player);
            let planet = app.planetsDict[p];
            $('#tf_planet1').append(new Option(planet.display_name,planet.id))
        }
    }
}