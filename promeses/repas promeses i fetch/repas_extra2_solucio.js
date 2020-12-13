// Dades tretes del repositori https://github.com/andrewbaisden/dragonball-character-database/blob/master/client/db.json

class Personaje{
    constructor(datos){
        Object.assign(this,datos);
    }
    dibujarBoton() {
        let boton = document.createElement('button');
        boton.innerHTML = this.name;
        boton.addEventListener('click',()=>{
            this.dibujarPersonaje();
        });
        document.querySelector('#content').prepend(boton);
    }
    dibujarPersonaje() {
        let plantilla = `
        <h3>${this.name}</h3>
        <img src="${this.img}" style="width:400px"/>
        <p>${this.bio}</p>`;
        
        document.querySelector('#personajes').innerHTML = plantilla;
    }
}

(() => {
    "use strict";
    let personajes = [];

    // TODO mostrar una galeria de personatjes de Dragon ball amb les dades de db.json i les imatges d'assets
    // Sols es mostrarà un personatge i es podrà navegar per ells amb una llista de botons en la part superior

    function cargar_datos(url,array){
        return fetch(url,{})
        .then((response)=>response.json())
        .then((datos)=> {
            for (let p of datos.characters){
                array.push( new Personaje(p) );
            }
            return array;
        })
        .catch((error)=>console.log(error));
    }

    function dibujarDatos(array){
        array.forEach(dato => {
            dato.dibujarBoton();
        });
    }

    document.addEventListener("DOMContentLoaded", function() {
        cargar_datos('db.json',personajes) //retorna personajes ja omplit
        .then(dibujarDatos)   // rep els personatjes de forma implícita
    });
})();