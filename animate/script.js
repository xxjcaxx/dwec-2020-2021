(()=>{
    document.addEventListener("DOMContentLoaded",()=>{

      let centro = 350;
      let centroY = 335

      function rotate(cx, cy, x, y, angle) {
          var radians = (Math.PI / 180) * angle,
              cos = Math.cos(radians),
              sin = Math.sin(radians),
              nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
              ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
          return [nx, ny];
      }

      function getKeyframes(element) {
          let keyframes = [];
          for (let i = 0; i < 360; i++) {
              let x = element.getAttribute('x'), y=element.getAttribute('y');
              let translate = rotate(centro,centroY,x,y,i); 
              keyframes.push({ transform: `translate(${translate[0]}px, ${translate[1]}px)` });
          }
          console.log(keyframes);
          return keyframes;
      }


    let p = document.querySelector('#p');
    p.style.transform = 'translate(400px,335px)';
    p.animate(getKeyframes(p), { 
        // timing options
        duration: 10000,
        iterations: Infinity
      });
      
});
})();