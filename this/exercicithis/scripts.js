//const { threadId } = require("worker_threads");

class Pc {
  constructor(nom, ip, xarxa) {
    this.nom = nom;
    this.ip = ip;
    this.ipBinari = Xarxa.ToBinari(ip);
    this.ipDecimal =  parseInt(this.ipBinari, 2);
    this.xarxa = xarxa;
  }

  dibuixar(){
    let div = document.createElement('div');
    div.id = this.nom;
    div.classList.add('pc');

    let span = document.createElement('span');
    span.classList.add('name');
    span.innerText = this.nom;
    div.appendChild(span);

    span = document.createElement('span');
    span.classList.add('ip');
    span.innerText = this.ip;
    div.appendChild(span);

    let button1 = document.createElement('button');
    button1.classList.add('buttonPc');
    button1.innerText = '⬆';
    div.appendChild(button1);
    button1.pc = this;
    button1.addEventListener('click',function(e){
      this.pc.sumIP(1);
      this.pc.xarxa.dibuixar();
    });

    let button2 = document.createElement('button');
    button2.classList.add('buttonPc');
    button2.innerText = '⬇';
    div.appendChild(button2);
    button2.pc = this;
    button2.addEventListener('click',function(e){
      this.pc.sumIP(-1);
      this.pc.xarxa.dibuixar();
    });

    document.querySelector('#xarxa').appendChild(div);
    this.div = div;
  }
  sumIP(n){
    if(this.ipDecimal + n <= this.xarxa.ultim 
      && this.ipDecimal + n >= this.xarxa.primer 
      && !(this.xarxa.pcs.map((item)=>item.ipDecimal)).includes(this.ipDecimal+n)
      ){ 
    this.ipDecimal += n;
    this.ip = Xarxa.ToIP(this.ipDecimal);
    this.ipBinari = Xarxa.ToBinari(this.ip);
    this.div.querySelector('.ip').innerText = this.ip;
  }
  else {
    if(this.xarxa.pcs.map((item)=>item.ipDecimal).includes(this.ipDecimal+n)){
      for(let i=this.ipDecimal;i<this.xarxa.ultim && i>this.xarxa.primer;i=i+n){
        if(!this.xarxa.pcs.map((item)=>item.ipDecimal).includes(i)){
          this.ipDecimal = i;
          this.ip = Xarxa.ToIP(this.ipDecimal);
          this.ipBinari = Xarxa.ToBinari(this.ip);
          this.div.querySelector('.ip').innerText = this.ip;
          break;
        }
      }
    }
  }
  }

}

class Xarxa {
  constructor(ip, mascara) {
    console.log(this);
    this.ip = ip;
    this.mascara = mascara;
    this.pcs = [];
    this.mascaraBinari = Xarxa.ToBinari(mascara);
    this.bitsHost = this.mascaraBinari.match(/0/g).length; 
    this.ipBinari = Xarxa.ToBinari(ip);
    this.ipDecimal = parseInt(this.ipBinari, 2);
    this.mascaraDecimal = parseInt(this.mascaraBinari, 2);
    this.primer = this.ipDecimal+1;
    this.ultim = this.ipDecimal +  Math.pow(2,this.bitsHost) - 2;
  }
  static ToBinari(mascara) {
    return mascara
      .split('.')
      .map((item) => ('00000000' + parseInt(item).toString(2)).slice(-8))
      .join('');
  }
  static ValidarIP(ip, mascara) {
    let regexIPs = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
    if (regexIPs.test(mascara) && regexIPs.test(ip)) {
      let mascaraBinari = Xarxa.ToBinari(mascara); 
      let regexBinari = /^1+0+$/;
      if (regexBinari.test(mascaraBinari)) {
        let ipBinari = Xarxa.ToBinari(ip);
        let ipDecimal = parseInt(ipBinari, 2);
        let mascaraDecimal = parseInt(mascaraBinari, 2);
        if ((~mascaraDecimal & ipDecimal) == 0) {
          return true;
        }
      }
    }
    return false;
  }
  static ToIP(ipInt){
    return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) );
  }
  sortPCs(){
    this.pcs.sort((a,b) => a.ipDecimal - b.ipDecimal);
  }
  nextPC(){
    this.sortPCs();
    let last = this.pcs[this.pcs.length-1];
    if(!last) last = this.primer;
    else last = last.ipDecimal;
    let next = last + 1;
    if(next <= this.ultim){
      this.pcs.push(new Pc(next+"",Xarxa.ToIP(next),this))
    }
    return this.pcs[this.pcs.length-1];
  }

  dibuixar(){
    this.sortPCs();
    document.querySelector('#xarxa').innerHTML = '';
    for (const pc of this.pcs) {
      pc.dibuixar();
    }
  }
}


(function () {
  "use strict";

  let xarxa;

  document.addEventListener("DOMContentLoaded", function () {
    var boton = document.getElementById('button');
    boton.addEventListener('click', function () {
      let ip = document.querySelector('input[name="ipXarxa"]').value;
      let mascara = document.querySelector('input[name="mascara"]').value;
      // Validar mascara 
      let validar = Xarxa.ValidarIP(ip,mascara);
      if (validar) {
        xarxa = new Xarxa(ip, mascara);
        for (let i = 0; i < 10; i++) {
          let pc = xarxa.nextPC();
          pc.dibuixar();
        }
      }
      console.log(xarxa.pcs);
    });
  });
})();
