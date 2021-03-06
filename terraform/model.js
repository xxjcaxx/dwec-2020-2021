import {obtener, enviar} from './xhr.js';
export {Model}

class Model{
    constructor(url,id){
        this.url = url;
        this.id = id; 
    }
    assign(plainObject){
        Object.assign(this, plainObject);
    }
    load(){
        return obtener(`${this.url}/${this.id}`, (response) => {  // exito
            this.assign(response.result[0]);
             },
            (error) => {   // fracaso
                console.log('Fallo: ' + error);
                app.content.innerHTML = `<img src="./img/alderaan.gif" /><h3 class="text-light" >Error en la xarxa: ${error}</h3>`;
            }).then(()=>this.loadDetails());
    }
    loadDetails(){  
       // console.log(this); 
        return Promise.resolve(true);
      }

    static create(data){
        return enviar(`${this.URL}/create`,  // URL és un atribut estàtic
            `{"data":${data}}`,
            (response) => {/*console.log(response)*/},
            (error) => console.log(error)
        );
    }

}