(()=>{

    function Person(name){
        this.name = name;
        this.element = document.createElement('div');
        this.element.innerText = `Nom: ${this.name}`;
        this.element.person = this;
        let that = this;
        this.element.addEventListener('click', function(){  //També en fletxa
            console.log(this.name);
            console.log(this.person.name);
            console.log(that.name);
        });
    }

    class People{
        constructor(name){
            this.name = name;
            this.element = document.createElement('div');
           this.element.innerText = `Nom: ${this.name}`;
           this.element.person = this;
           this.element.classList.add('oscuro');
           let that = this;
           this.element.addEventListener('click', function(){  //També en fletxa
            console.log(this.name);
            console.log(this.person.name);
            console.log(that.name);
        });
        }

    }

    document.addEventListener("DOMContentLoaded", function () {
        pepe = new Person('pepe');
        document.querySelector('#content').appendChild(pepe.element);
        jose = new People('Jose');
        document.querySelector('#content').appendChild(jose.element);
    });


})();