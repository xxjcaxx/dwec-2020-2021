export {planetTemplates};

let planetTemplates = {
    
    planetCard: (planet) => `
<img src="data:image/png;base64, ${planet.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${planet.name}</h5>
    </div>
<ul class="list-group list-group-flush">
    <li class="list-group-item">${planet.sun[1]}</li>
  </ul>
  <a href="#" class="btn btn-primary">Details</a>
`,

planetDetails: (planet) => {
  //console.log(planet.planetaryChanges);
  return `<div class="col m-1">
  <div class="card h-100"  >
<img src="data:image/png;base64, ${planet.image}" class="card-img-top" alt="...">
<h5 class="card-header">${planet.name}</h5>
    <div class="card-body"> 
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Sun: ${planet.sun[1]}</li>
    <li class="list-group-item">Player: ${planet.player[1]}</li>
    <li class="list-group-item">N Planet: ${planet.n_planet}</li>
  </ul>
</div>
</div>
<div class="col-8 m-1">
<div class="card" >
    <div class="card-body">
           <canvas id="myChart" width="400" height="400"></canvas>      
    </div>
</div>
</div>
<div class="w-100"></div>
<div class="col m-1 h-100">
<div class="card" >
<h5 class="card-header">Buildings</h5>  
    <div class="card-body">
    
    <div class="container">
    <div id="building_list" class="row row-cols-5 no-gutters">

    </div>
    </div> 
    </div>
</div>
`;
},

planetError: (planet) => `
<img src="img/alderaan.gif" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Error ${planet}</h5>
       
    </div>
`,


planetMini: (planet) => `
<img src="data:image/png;base64, ${planet.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title" style="font-size: 14px;">${planet.name}</h5>
    </div>
<ul class="list-group list-group-flush" style="font-size: 10px;">
<li class="list-group-item">Player: ${planet.player[1]}</li>
  </ul>

`};

