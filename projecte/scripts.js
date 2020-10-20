class Product {
    constructor(name, id, category, photo, price) {
        this.name = name;
        this.id = id;
        this.photo = photo;
        this.category = category;
        this.price = price;
    }
    dibujar(){
        let p = document.createElement('div');
        p.classList.add('product');
        p.innerHTML = `<span>${this.name}</span><img src="${this.photo}"/>`;
        return p;
    }

}
class Category {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}

class client {

}

class cart {

}

(() => {

    ///////////// Conseguir els productes i categories
    "use strict"; // Prova a descomentar
    document.addEventListener("DOMContentLoaded", function () {
        let productos = [];
        let categorias = [];
        let jsonProductos = `[
        {"id":"producto-001","name":"Mountain Bike eléctrica SERIOUS MT. CATARACT COMP 27,5 Mujer Negro 2019","category":"ebike Mujer", "photo":"./img/Serious_MT__Cataract_Comp_27_5__black[600x600].jpg","price":"1700"},
        {"id":"producto-002","name":"Mountain Bike eléctrica HAIBIKE SDURO HARD SEVEN LIFE 3.0 27,5 Mujer Gris 2020","category":"ebike Mujer", "photo":"./img/HAIBIKE_SDURO_HardSeven_Life_3_0_titan_turquoise_blue[600x600].jpg","price":"2700"},
        {"id":"producto-003","name":"Mountain Bike eléctrica GHOST HYBRIDE HTX 2.7+ 27,5+ Rojo 2020","category":"ebike Hombre", "photo":"./img/Ghost_Hybride_HTX_2_7__27_5___riot_red_jet_black[600x600].jpg","price":"2800"},
        {"id":"producto-004","name":"Mountain Bike eléctrica HAIBIKE SDURO HARD SEVEN 7.0 27,5 Negro 2020","category":"ebike Hombre", "photo":"./img/HAIBIKE_SDURO_HardSeven_7_0_black_grey_turquoise[600x600].jpg","price":"3700"}
    ]`;
        let jsonCategorias = `[
        {"id":"ebike Mujer","name":"Ebike Mujer"},
        {"id":"ebike hombre","name":"Ebike Hombre"}
    ]`;
        jsonProductos = JSON.parse(jsonProductos);

        for (let p of jsonProductos) {
            productos.push(new Product(p.name, p.id, p.category, p.photo, p.price));
        }

        jsonCategorias = JSON.parse(jsonCategorias);
        //console.log(jsonProductos);
        for (let p of jsonCategorias) {
            categorias.push(new Category(p.name, p.id));
        }

        ///////////// Mostrar els productes 
        let content = document.querySelector('#content');
        let productList = document.createElement('div');
        productList.classList.add('productList');
        content.appendChild(productList);

        for (let p of productos) {
            let productElement = p.dibujar();
            productList.appendChild(productElement);
        }

    });
})();