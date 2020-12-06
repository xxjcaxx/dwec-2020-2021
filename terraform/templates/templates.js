export { login, buildingCard, sunTemplates, travelTemplates }



let login = ()=> `<form onsubmit="return false;" class="bg-dark text-light">
<div class="form-group ">
  <label for="exampleInputEmail1">Email address</label>
  <input type="email" class="form-control" id="InputEmail" aria-describedby="emailHelp">
  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
</div>
<div class="form-group">
  <label for="exampleInputPassword1">Password</label>
  <input type="password" class="form-control" id="InputPassword">
</div>
<div class="form-group form-check">
  <input type="checkbox" class="form-check-input" id="exampleCheck1">
  <label class="form-check-label" for="exampleCheck1">Check me out</label>
</div>
<button  class="btn btn-primary" id="btn-login">Submit</button>
</form>`;


let buildingCard = (building)=> {
  //console.log(building);
  let img = `/img/${building.display_name.replaceAll(" ","_")}.png`;
  return `<div class="card">
  <img src="${img}" class="card-img-top" alt="...">
<div class="card-body">
    <h5 class="card-title">${building.display_name}</h5>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">Level: ${building.level}</li>
<li class="list-group-item">People: ${building.people}</li>
<li class="list-group-item">Energy Production: ${building.percent_energy}%</li>
<li class="list-group-item">Active: ${building.activo}</li>
</ul>
</div>`;
}


let sunTemplates = {  // ho fice en un objecte per exportar sols un
  sunCard: (sun)=> { 
    let {display_name,planets,coordinates} = sun;
    
    return `<div class="card">
<div class="card-body">
    <h5 class="card-title">${display_name}</h5>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">Coordinates: ${coordinates}</li>

</ul>
</div>
`; },
sunModal: (sun)=> {
  return `<!-- Modal -->
  <div class="modal fade" id="sunSystemModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sunSystemModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body bg-dark ">
        <svg width="700" height="700" id="svgSolarSystem" 
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink">
       
          <image id="svgSol" href="/img/sol.png" height="80" width="80" x="310" y="310"/>
      </svg>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
        </div>
      </div>
    </div>
  </div>`;
}
}

let travelTemplates = {
  travelCard: (travel)=> { 
    let {display_name: name,
      origin_planet: [,planet1],
      destiny_planet: [,planet2],
      player: [,playerName]} = travel;
    
    return `<div class="card">
<div class="card-body">
    <h5 class="card-title">${name}</h5>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item">Player: ${playerName}</li>
<li class="list-group-item">Origin Planet: ${planet1}</li>
<li class="list-group-item">Destiny Planet: ${planet2}</li>
</ul>
</div>
`; },
    travelForm: ()=>{
      return `<form id="create-travel" onsubmit="return false;" class="bg-dark text-light">
      <div class="form-group ">
        <label for="tf_player">Player</label>
        <input readonly type="text" class="form-control" id="tf_player" aria-describedby="playerHelp">
        <small id="playerHelp" class="form-text text-muted">You are the player</small>
      </div>
      <div class="form-group">
        <label for="tf_planet1">Origin Planet</label>
        <select class="form-control" id="tf_planet1"></select>
        <label for="tf_planet2">Destiny Planet</label>
        <select class="form-control" id="tf_planet2"></select>
      </div>
      <button  class="btn btn-primary" id="btn-create-travel">Create Travel</button>
      </form>`;

    }
}