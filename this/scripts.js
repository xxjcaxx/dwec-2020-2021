/*var Person = function (name) {
  this.name = name;

  // lets assign this to that :)
  var that = this;
  this.sayHi = function () {
    // That is used to call the foo property
    console.log(this, that, that.name);
  };
};

(function () {
  "use strict"; // Prova a descomentar
  document.addEventListener("DOMContentLoaded", function () {
    var colours = ["red", "green", "blue"];
    document.getElementById("header").addEventListener("click", function () {

      //////////Exemple amb forEach   
      // this és una referència al clicat
      var that = this;
      colours.forEach(function (element, index, array) {
        console.log(this, that, index, element, array);
        // this és undefined
        // that és el que s'ha clicat
      });
      colours.forEach(
        (element, index, array) =>
          console.log(this, that, index, element, array)
        // Les funcions fletxa no tenen context d'execució
        // this és el que s'ha clicat
        // that és el que s'ha clicat
      );
      colours.forEach(function (element, index, array) {
        console.log(this, that, index, element, array);
        // this és el que s'ha clicat
        // that és el que s'ha clicat
      }, this);


      ///////////////Exemple amb funció constructora

      function usesThis(name) {
        this.myName = name;
        function returnMeThis() {
          console.log(this);
          return this; //scope is lost because of the inner function
        }
        return {
          returnMe: returnMeThis,
        };
      }

      function usesThat(name) {
        var that = this;
        this.myName = name;
        function returnMeThat() {
          console.log(that);
          return that; //scope is baked in with 'that' to the "class"
        }
        return {
          returnMe: returnMeThat,
        };
      }

      var usesthat = new usesThat("Dave");
      var usesthis = new usesThis("John");
      console.log(
        "UsesThat thinks it's called " +
        usesthat.returnMe().myName +
        "\r\n" +
        "UsesThis thinks it's called " +
        usesthis.returnMe().myName
      );

    });

    /////////// Exemple amb Botons


    var pepe = new Person('pepe');
    var boton = document.getElementById('button');
    boton.persona = pepe;
    boton.addEventListener('click', function () {
      this.persona.sayHi();
    });
  });
})();


/////////////// Un atre exemple simple

var car = {};
car.starter = {};

car.start = function () {
  var that = this;

  // you can access car.starter inside this method with 'this'
  this.starter.active = false;

  var activateStarter = function () {
    // 'this' now points to the global scope
    // 'this.starter' is undefined, so we use 'that' instead.
    that.starter.active = true;

    // you could also use car.starter, but using 'that' gives
    // us more consistency and flexibility
  };

  activateStarter();

};


////////////////
class Character {
  constructor() {
    this.name = 'Sarah';
    this.surname = 'Connor';
  }
  getInfo() {
    console.log(`Are you ${this.name} ${this.surname} ?`);
  }
}
// Cas 1
p = new Character();
p.getInfo();

// Cas 2
var getInfo = p.getInfo;
//getInfo(); //dona error

// Cas 3
var p2 = { name: 'T', surname: '800', getInfo: p.getInfo }
p2.getInfo();

// Cas 4
getInfo.call(p);
*/
(function () {
  "use strict"; // Prova a descomentar
  document.addEventListener("DOMContentLoaded", function () {
    class Sunpanel {
      constructor(power) {
        this.power = power;
      }
      showPower() {
        console.log(`${this.power}W`);
      }
    }

    let sun1 = new Sunpanel(1000);
    console.log(sun1);


    let buttonPower = document.querySelector('#buttonPower');
    buttonPower.addEventListener('click', sun1.showPower);
    buttonPower.addEventListener('click', () => sun1.showPower());
    buttonPower.addEventListener('click', function () { sun1.showPower(); });
    buttonPower.showPower = sun1.showPower;
    buttonPower.addEventListener('click', () => this.showPower());
    buttonPower.addEventListener('click', function () { this.showPower(); });
  });
})();