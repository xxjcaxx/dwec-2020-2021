export { planetCard, planetDetails, planetError
, login }

let planetCard = (planet) => `
<img src="data:image/png;base64, ${planet.image}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${planet.name}</h5>
    </div>
<ul class="list-group list-group-flush">
    <li class="list-group-item">${planet.sun[1]}</li>
  </ul>
  <a href="#" class="btn btn-primary">Details</a>
`;

let planetDetails = (planet) => `<div class="card" >
<img src="data:image/png;base64, ${planet.image}" class="card-img-top" alt="...">
<h5 class="card-header">${planet.name}</h5>
    <div class="card-body">
        <h5 class="card-title">${planet.name}</h5>
        <p class="card-text">Sun: ${planet.sun} Player: ${planet.player} nPlanet: ${planet.nPlanet}</p>
        
    </div>
</div>
`;

let planetError = (planet) => `
<img src="img/alderaan.gif" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">Error ${planet}</h5>
       
    </div>
`;

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


