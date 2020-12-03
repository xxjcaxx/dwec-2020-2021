$(()=>{

   //////////////////// Selector i $(this)

    "use strict";
    console.log('Selector $',$('#content')); 
    console.log('Selector Tradicional',document.querySelector('#content')); 

    $('#boton').on('click',function(){
        console.log('$(this)',$(this)); 
        console.log('this',this);
    });

    $('#boton').on('click',()=>{
        console.log('$(this) fletxa',$(this)); 
        console.log('this fletxa',this);
    })

    class Boton{
        constructor(){
            this.element = $('#boton')
        }
        click(){
            console.log('$(this) class',$(this)); 
            console.log('this class',this);
        }
    }

    let b = new Boton();

    $('#boton').on('click',b.click);
    $('#boton').on('click',()=>{console.log('class dins de funció'); b.click();});


   /////////////////////////// Manipular el DOM
    let i=1;

    function afegirFotos(){
        let divFoto = $('<div>').addClass('divFoto');
        divFoto.append($('<img>')
            .attr('src',`fotos/f${i}.jpg`)
            .addClass('fotoGaleria'));
        $('#fotos').append(divFoto);
        i++;
    }
    function llevarFotos(){
        $('#fotos div.divFoto:last').remove();
        i--;
    }


    $('#afegir').on('click',afegirFotos);
    $('#llevar').on('click',llevarFotos);

/////////////////////// Esdeveniments en contingut dinàmic

    $('#fotos').on({  //multiples esdeveniments 
        'click':function (e) {  
            $(this).remove();
        },
        'mouseenter':function(e){
            $(this).css('filter','blur(4px)');
        },
        'mouseout':function(e){
            $(this).css('filter','none');
        },
    }, //fi dels events
    '.fotoGaleria'  //Selector al final
    );
})