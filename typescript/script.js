"use strict";
(() => {
    class Recolector {
        constructor(identificador, propietario, buenEstado = true, lugar) {
            this.identificador = identificador;
            this.propietario = propietario;
            this.buenEstado = buenEstado;
            this.lugar = lugar;
            this.piloto = 'fremen';
        }
    }
    let rec = new Recolector('1234', 'cofradia', true, 'desierto');
    console.log(rec.piloto);
})();
