$(function () {
  "use strict";

  $("#content").load("capitulos.html");

  $(document).on("click", // Esdeveniment en document
                 "p",    // Selector
                 { nombre: "John", apellido: "doe" },  // paràmetres opcionals
                 function(e) { // e contè les dades de l'esdeveniment
                    $(this).text(e.data.nombre + " " + e.data.apellido);
                    // els parametres estan en .data
                 }
  );

  $(document).on('mouseover','p',function () {
    $(this).trigger('select');    
  });




  /*$.getJSON("datos.json", {},
  function (data, textStatus, jqXHR) {
    $.each(data,function(clave,valor){
      console.log(clave+" "+valor);
    })
  }
);


*/

  /*
$.getScript("script.js", function (script, textStatus, jqXHR) {
  funcioDinsScript();
});

*/
  /*
  $.post("saludo.php", {'nombre':'John','apellido':'doe'},
    function (data, textStatus, jqXHR) {
      console.log(data);
    },
  );
*/
  /* $('p').each(function(){
     console.log($(this).text());
   });
   $.each($('p'),function(){
     console.log($(this).text());
   });*/

  /*$("#header").on("click", cargarDatosSimple);

  function cargarDatos() {
    $.ajax({ type: "get", url: "datos.json", data: "data", dataType: "json",
      success: function (response) {
        console.log("exito", response);
      },
      error: function (xhr, status) {
        console.error("error", xhr, status);
      },
      complete: function (xhr, status) {
        console.log("completo", xhr, status);
      },
    });
  }
  function cargarDatosSimple(){
      $.get('datos.json',{'nombre':'John','apellido':'doe'},function(respuesta){
        console.log(respuesta);
      }).done(function(){
          console.log('exito');
      }).fail(function(){
          console.error('error');
      }).always(function(){
          console.log('siempre');
      });
  }*/
});
