(() => {
  "use strict";
  class Sensor {
     constructor() {
        this.activo = false;
        this.element = document.createElement('div'); 
        this.element.innerHTML = `<span>${this.activo}</span>`;
        this.element.addEventListener('click', function () {
           this.activo = !this.activo; 
           this.element.innerHTML = `<span>${this.activo}</span>`;
        })
     }
  }

  document.addEventListener("DOMContentLoaded", function () {
     let sensor = new Sensor();
     document.querySelector('#sensores').appendChild(sensor.element);
  });
})();
