export { json, obtener, remoteLogin };


function json(response) { return response.json()  }


let fetchOptions = {
    method: 'post',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: '{}'
  };

function obtener(url,exito,fracaso) {
    return fetch(url, fetchOptions)
    .then(json).then(exito)
    .catch(fracaso);
}

function remoteLogin(url,user,pass) {
  return fetch(url, {
    method: 'post',
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: `{"jsonrpc":"2.0","method":"call","params":{"user":"${user}","password":"${pass}"}}`
  })
  .then(json).then((response)=>response)
  .catch(()=>console.log('no login'));
}



/* fetch(`${url}/terraform.planet/${i}`, fetchOptions)
          .then(json).then((response) => {
            let planets = response.result[0];
            let planeta = new Planet();
            planeta = Object.assign(planeta, planets);
            planeta.paintCard();
          }); */