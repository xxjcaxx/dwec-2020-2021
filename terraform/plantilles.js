export { planetCard, planetDetails }

let planetCard = (planet) => `<div class="card" style="width: 18rem;">
<img src="data:image/png;base64, ${planet.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${planet.name}</h5>
        <p class="card-text">${planet.sun}</p>
        <p class="card-text">${planet.player}</p>
        <a href="#" class="btn btn-primary">Details</a>
    </div>
</div>`;

let planetDetails = (planet) => `<div class="col-sm-4 mb-3"><div class="card" >
<img src="data:image/png;base64, ${planet.image}" class="card-img-top" alt="...">
<h5 class="card-header">${planet.name}</h5>
    <div class="card-body">
        <h5 class="card-title">${planet.name}</h5>
        <p class="card-text">Sun: ${planet.sun} Player: ${planet.player} nPlanet: ${planet.nPlanet}</p>
        
    </div>
</div>
</div>`;