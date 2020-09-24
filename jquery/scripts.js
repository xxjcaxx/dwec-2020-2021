$(function () {
  "use strict";
  $("#header").on("click", cargarDatosSimple);

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
  }
});
