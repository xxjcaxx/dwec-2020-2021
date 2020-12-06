import { login, buildingCard, sunTemplates, travelTemplates } from '../templates/templates.js';
import { planetTemplates } from '../templates/planet_templates.js';
import { obtener, buscarObtener } from '../xhr.js';
//import { viewPlanet } from './views/views_planet.js'
export { viewPages }



class viewSun {
    constructor(sun) {
        this.sun = sun;
    }
    viewCard() {
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
    viewDetails(element) {

        $("#sunSystemModal").modal('show');
        $('#sunSystemModalLabel').html(`${this.sun.display_name}`);
        this.sun.loadPlanets()
            .then(() => {
                let centro = 350;
                let centroY = 335

                function rotate(cx, cy, x, y, angle) {
                    console.log(cx,cy,x,y,angle);
                    var radians = (Math.PI / 180) * angle,
                        cos = Math.cos(radians),
                        sin = Math.sin(radians),
                        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
                    return [nx, ny];
                }

                function getKeyframes(element) {
                    let keyframes = [];
                    for (let i = 0; i < 360; i++) {
                        let radio = parseFloat(element.diametro/2);
                        let x = parseFloat(element.getAttribute('x')), y=parseFloat(element.getAttribute('y'));
                        let translate = rotate(centro,centroY,x+radio,y+radio,i); 
                        //console.log(translate);
                        keyframes.push({ transform: `translate(${translate[0]-x-radio}px, ${translate[1]-y-radio}px)` });
                      //keyframes.push({ transform: `translate(${translate[0]-x}px, ${translate[1]-y}px)` });
                    }
                    console.log(keyframes);
                    return keyframes;
                }


                function showPlanet(event, p) {
                    let divPlanet = document.createElement('div');
                    divPlanet.style.position = 'absolute';
                    divPlanet.style.top = (event.clientY + 20) + "px";
                    divPlanet.style.left = (event.clientX + 20) + "px";
                    divPlanet.style.width = "100px";

                    divPlanet.classList.add('card');
                    divPlanet.innerHTML = planetTemplates.planetMini(p);
                    $("#sunSystemModal").append(divPlanet);
                    //console.log(p);
                    event.target.addEventListener('mouseout', () => divPlanet.remove());
                }

                $("#svgSolarSystem").find("circle").remove();
                $("#svgSolarSystem").find(".svgPlaneta").remove();
                let elements = this.sun.planetsDetails.map(p => {
                    let diametro = p.gravity * 2;
                    let posicion = p.n_planet * 30 + centro + (25 - diametro / 2);
                    let posicionY = centroY - diametro/2;

                    let imagePlanet = document.createElementNS('http://www.w3.org/2000/svg', 'image');
                    imagePlanet.distancia = posicion;
                    imagePlanet.diametro = diametro;
                    imagePlanet.angulo = 0;
                    imagePlanet.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `data:image/png;base64,${p.image_small}`);
                    imagePlanet.setAttribute('x', posicion + '');
                    imagePlanet.setAttribute('y', posicionY);
                    imagePlanet.setAttribute('class', 'svgPlaneta');
                    imagePlanet.setAttribute('height', diametro + '');
                    imagePlanet.setAttribute('width', diametro + '');
                    imagePlanet.addEventListener('mouseover', (e) => showPlanet(e, p));

                    let orbit = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    orbit.setAttribute('cx', centro + "");
                    orbit.setAttribute('cy', centroY + "");
                    orbit.setAttribute('r', (p.n_planet * 30 + 25) + '');
                    orbit.setAttribute('stroke', 'grey');
                    orbit.setAttribute('stroke-width', '2');
                    orbit.setAttribute('fill-opacity', '0');
                    return { imagePlanet, orbit };
                });

                for (let e of elements) {
                    $("#svgSolarSystem").append(e.orbit);
                }
                for (let e of elements) {
                    $("#svgSolarSystem").append(e.imagePlanet);
                    e.imagePlanet.animate(getKeyframes(e.imagePlanet),{duration:10*(e.imagePlanet.distancia**1.1),iterations:Infinity});
                  // e.imagePlanet.animate({transform: 'translate(100px, 1000px)'},{duration:10000,iterations:Infinity});
                }
                //  $("#svgSolarSystem").append(orbit);
                // $("#svgSolarSystem").append(imagePlanet);


            });

    }
}


class viewTravel {
    constructor(travel) {
        this.travel = travel;
    }
    viewCard() {
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
    constructor() {

    }
    viewHome() {
        app.content.innerHTML = '';
        app.player.paintPlanets();
    }
    viewSuns() {  //Pagina dels sols
        app.content.innerHTML = sunTemplates.sunModal();
        for (let sun of Object.entries(app.sunList)) {
            let vs = new viewSun(sun[1]);
            vs.viewCard();
        }
    }
    viewTravels() {  //Pagina dels travels
        app.content.innerHTML = '';
        //console.log(app.travelsList);
        for (let travel of Object.entries(app.travelsList)) {
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
        for (let p of app.player.planets) {
            //console.log(app.player);
            let planet = app.planetsDict[p];
            $('#tf_planet1').append(new Option(planet.display_name, planet.id))
        }
        for (let p of app.allPlanets) {
            $('#tf_planet2').append(new Option(p.name, p.id));
        }

        $('#btn-create-travel').on('click', () => {
            let data = `{"player":"${app.player.id}","origin_planet":"${$('#tf_planet1').val()}","destiny_planet":"${$('#tf_planet2').val()}"}`
            // console.log(data);
            app.createTravel(data).then(app.travels);
        })
    }
}