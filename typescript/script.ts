(() =>{
    class Recolector {
        public piloto:string = 'fremen';
        constructor(
            public identificador: string,
            public propietario: string,
            public buenEstado: boolean = true,
            private lugar?: string
        ){}
    }
    let rec = new Recolector('1234','cofradia',true,'desierto');
    console.log(rec.piloto);
 })();
 
 
 