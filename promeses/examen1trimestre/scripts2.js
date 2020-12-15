(() => {
    document.addEventListener("DOMContentLoaded", function() { // Falta esperar al dom
        let container = document.querySelector('#content');
        async function writeNumbers(container) {
            for (let i = 0; i < 10; i++) {
                let number = document.createElement('p'); // El p es crea en cada iteració
                await new Promise((resolve) => { // falta esperar per a que isca ordenat
                        setTimeout(
                            () => { resolve(); }, Math.random() * 2000)
                    })
                    .then(
                        () => {
                            number.innerText = i;
                            container.append(number);
                            console.log(number);
                        });
            }
        }
        writeNumbers(container);
    });
})();