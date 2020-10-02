(function () {
  "use strict";   // Prova a descomentar
  document.addEventListener("DOMContentLoaded", function () {
    var colours = ["red", "green", "blue"];
    document.getElementById("header").addEventListener("click", function () {
      // this és una referència al clicat
      var that = this;
      colours.forEach(function (element, index, array) {
        console.log(this, that, index, element, array);
        // this és undefined
        // that és el que s'ha clicat
      });
      colours.forEach( (element, index, array) =>  
                        console.log(this, that, index, element, array)
        // Les funcions fletxa no tenen context d'execució
        // this és el que s'ha clicat
        // that és el que s'ha clicat
      );
      colours.forEach(function (element, index, array) {
        console.log(this, that, index, element, array);
        // this és undefined
        // that és el que s'ha clicat
      }, this);
    });
  });
})();
