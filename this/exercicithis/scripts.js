class Pc {
  constructor(nom,ip){
    this.nom = nom;
    this.ip = ip;
  }
}

class Xarxa {
  constructor(ip,mascara){
    this.ip = ip;
    this.mascara = mascara;
    this.pcs = [];
  }
}


(function () {
  "use strict"; 

  let xarxa;

  document.addEventListener("DOMContentLoaded", function () {
    var boton = document.getElementById('button');
    boton.addEventListener('click', function(){
      let ip = document.querySelector('input[name="ipXarxa"]').value;
      let mascara = document.querySelector('input[name="mascara"]').value; 
      /// TODO Validar mascara i xarxa
      xarxa = new Xarxa(ip,mascara);
      for(let i=0;i<10;i++){
        // TODO fer que funcione let pc = xarxa.seguentPC();
        // TODO fer que funcione pc.dibuixar()
      }
    });
  });
})();


/// TODO Fer que quan polsem els botons de pujar o baixar 
/// s'incremente o decremente la IP si la màscara de xarxa ho permet
/// Reordenar els PCs en funció de la IP 