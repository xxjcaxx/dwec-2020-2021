/////////////

/*console.log('abans promesa');
const promise = new Promise((resolve, reject) => { // Funció executor
   console.log('dins promesa');
  // setTimeout(() => {
      console.log('timeout');
     if (Math.random() > 0.5) {
        console.log('funciona');
         resolve("Resolving an asynchronous request!"); }
     else {
      console.log('no funciona'); 
        reject("Rejecting an asynchronous request!"); }
 //  }, 0);
  });
  console.log('despres promesa');
   promise.then((response) => { //.then si resol
     console.log("Funciona! "+response);
   }).catch((response) => { // .catch si falla
     console.log("No funciona "+response);
   });
 console.log('despres cridada promesa');
 */

//////////////////// Encadenar promeses
/*
setTimeout(() => {
  console.log(1);
}, Math.random()*1000);
setTimeout(() => {
  console.log(2);
}, Math.random()*1000);
setTimeout(() => {
  console.log(3);
}, Math.random()*1000);
setTimeout(() => {
  console.log(4);
}, Math.random()*1000);*/


function promesaAleatoria(n){
  return new Promise(function executorAleatoria(funciona,nofunciona){
    setTimeout(() => {
     if (Math.random() > 0.2) {
         funciona(n); }
     else {
        nofunciona(n); 
      }
   }, Math.random()*1000);
  });
}

/*promesaAleatoria(1).then(
  (n)=>{ console.log('funciona '+n); return promesaAleatoria(2)}
).then(
  (n)=>{ console.log('funciona '+n); return promesaAleatoria(3)}
).then(
  (n)=>{ console.log('funciona '+n); return promesaAleatoria(4)}
).then(
  (n)=>{ console.log('funciona '+n);}
).catch((n)=>{ console.log('falla '+n);} );
*/
Promise.all([promesaAleatoria(1), 
             promesaAleatoria(2),
             promesaAleatoria(3),
             promesaAleatoria(4)]).then(
  (n)=> {console.log(n);} 
).catch(
  (n)=> {console.log('falla'+n);}
);

/*
function callbackAleatoria(n){
  setTimeout(() => {
    if (Math.random() > 0.2) {
        console.log('funciona '+n);
        setTimeout(() => {
          if (Math.random() > 0.2) {
            console.log('funciona '+(n+1));
            setTimeout(() => {
              if (Math.random() > 0.2) {
                console.log('funciona '+(n+2));
                setTimeout(() => {
                  if (Math.random() > 0.2) {
                    console.log('funciona '+(n+3));
          
                  }
                  else {
                    console.log('no funciona '+(n+3)); 
                  }
                }, Math.random()*1000); 
              }
              else {
                console.log('no funciona '+(n+2)); 
              }
            }, Math.random()*1000); 
          }
          else {
            console.log('no funciona '+(n+1)); 
          }
        }, Math.random()*1000); 
      }
    else {
       console.log('no funciona '+n); 
     }
  }, Math.random()*1000);
}

callbackAleatoria(10);*/