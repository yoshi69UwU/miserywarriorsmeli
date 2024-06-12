const catawsElement = document.querySelector('.png-cataws');
const crowElement = document.querySelector('.png-crow');

let catawsPosition = 200; // Posición inicial de Cataws
let isJumping = false;
let jumpStrength = 25; // Incrementamos la fuerza del salto para que salte más alto
let jumpHeight = 150; // Incrementamos la altura máxima del salto

let catawsHealth = 200; // Vida inicial de Cataws
let crowHealth = 200; // Vida inicial de Crow

const crowTransitionTime = 2000; // Duración de la transición en milisegundos (2 segundos)

function moveCatawsLeft() {
    catawsPosition = Math.max(0, catawsPosition - 10);
    catawsElement.style.left = catawsPosition + 'px';
}

function moveCatawsRight() {
    catawsPosition = Math.min(window.innerWidth - catawsElement.offsetWidth, catawsPosition + 10);
    catawsElement.style.left = catawsPosition + 'px';
}

function jumpCataws() {
    console.log("Intento de salto de Cataws"); // Verifica si la función jumpCataws se está llamando correctamente
    if (!isJumping) {
        console.log("Cataws está saltando"); // Verifica si la condición para saltar se cumple correctamente
        isJumping = true;
        catawsElement.src = 'catawsSALTO.png'; // Aquí se cambia la imagen de Cataws al saltar
        catawsElement.classList.add('jump-animation');

        let jumpInterval = setInterval(() => {
            if (jumpHeight <= 0) {
                clearInterval(jumpInterval);
                catawsElement.style.bottom = '0';
                catawsElement.classList.remove('jump-animation');

                setTimeout(() => {
                    catawsElement.src = 'cataws.png'; // Aquí se restaura la imagen original de Cataws después del salto
                }, 1000);

                isJumping = false;
                return;
            }
            catawsPosition += jumpStrength;
            catawsElement.style.bottom = jumpHeight + 'px';
            jumpHeight -= jumpStrength;
        }, 30);
    }
}

function changeCrowImage(imageName) {
    crowElement.style.transition = `src ${crowTransitionTime / 1000}s`; // Establece la duración de la transición
    crowElement.src = imageName;
}

function randomCrowAttack() {
    const randomNum = Math.random();
    if (randomNum < 0.5) {
        changeCrowImage('crowPATALTA.png'); // Ataque de patada alta
    } else {
        changeCrowImage('crowRODILLA.png'); // Ataque de rodilla
    }
}

function moveCrow() {
    const leftBound = 0;
    const proximityThreshold = 50;

    crowPosition += crowDirection * 3; // Movimiento rápido de Crow

    crowElement.style.left = crowPosition + 'px';

    const distance = Math.abs(crowPosition - catawsPosition);

    if (distance <= proximityThreshold) {
        randomCrowAttack(); // Cambio aleatorio de imagen de Crow
        reduceVidaCataws();

        setTimeout(() => {
            changeCrowImage('crow.png'); // Restaura la imagen original de Crow
        }, crowTransitionTime); // Retrasa la restauración en 2 segundos (2000 milisegundos)
    }

    if (crowPosition <= leftBound) {
        crowDirection = 1;
    }

    const rightBound = window.innerWidth - crowElement.offsetWidth;
    if (crowPosition >= rightBound) {
        crowDirection = -1;
    }

    setTimeout(moveCrow, 25);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveCatawsLeft();
    } else if (event.key === 'ArrowRight') {
        moveCatawsRight();
    } else if (event.key === 'ArrowUp') {
        jumpCataws();
    } else if (event.key === 'a') {
        console.log("Tecla 'a' presionada"); // Mensaje de consola para depuración
        // Cambiar la imagen de Cataws a 'catawsGOLPE.png'
        catawsElement.src = 'catawsGOLPE.png';
        console.log("Imagen de Cataws cambiada a 'catawsGOLPE.png'"); // Mensaje de consola para depuración

        // Verifica la colisión y reduce la vida de Crow si Cataws cambia a "catawsGOLPE.png"
        if (checkCollision()) {
            reduceVidaCrow();
        }

        // Después de 1 segundo, restaurar la imagen original de Cataws
        setTimeout(() => {
            catawsElement.src = 'cataws.png';
            console.log("Imagen de Cataws restaurada a 'cataws.png'"); // Mensaje de consola para depuración
        }, 1000); // 1000 milisegundos = 1 segundo
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        moveCatawsLeft();
    } else if (event.key === 'ArrowRight') {
        moveCatawsRight();
    } else if (event.key === 'ArrowUp') {
        jumpCataws();
    } else if (event.key === 's') {
        console.log("Tecla 's' presionada"); // Mensaje de consola para depuración
        // Cambiar la imagen de Cataws a 'catawsGOLPE.png'
        catawsElement.src = 'catawsFUEGO.png';
        console.log("Imagen de Cataws cambiada a 'catawsGOLPE.png'"); // Mensaje de consola para depuración

        // Verifica la colisión y reduce la vida de Crow si Cataws cambia a "catawsGOLPE.png"
        if (checkCollision()) {
            reduceVidaCrow();
        }

        // Después de 1 segundo, restaurar la imagen original de Cataws
        setTimeout(() => {
            catawsElement.src = 'cataws.png';
            console.log("Imagen de Cataws restaurada a 'cataws.png'"); // Mensaje de consola para depuración
        }, 1000); // 1000 milisegundos = 1 segundo
    }
});

function reduceVidaCataws() {
    catawsHealth -= 10; // Reducir la vida en 10 puntos

    // Actualizar la longitud de la barra de vida de Cataws
    document.getElementById('vida-cataws').style.width = catawsHealth + '%';

    // Comprueba si Cataws se queda sin vida
    if (catawsHealth <= 0) {
        console.log("Cataws ha perdido la batalla");
        document.getElementById('resultado').innerText = "¡Gana Crow!";
    }
}

function reduceVidaCrow() {
    crowHealth -= 10; // Reducir la vida en 10 puntos

    // Actualizar la longitud de la barra de vida de Crow
    document.getElementById('vida-crow').style.width = crowHealth + '%';

    // Comprueba si Crow se queda sin vida
    if (crowHealth <= 0) {
        console.log("Crow ha perdido la batalla");
        document.getElementById('resultado').innerText = "¡Gana Cataws!";
    }
}

// Función para verificar la colisión entre Cataws y Crow
function checkCollision() {
    const catawsRect = catawsElement.getBoundingClientRect();
    const crowRect = crowElement.getBoundingClientRect();

    return !(
        catawsRect.top > crowRect.bottom ||
        catawsRect.bottom < crowRect.top ||
        catawsRect.left > crowRect.right ||
        catawsRect.right < crowRect.left
    );
}

let crowPosition = window.innerWidth - crowElement.offsetWidth; // Posición inicial de Crow
let crowDirection = -1; // Inicialmente, Crow se moverá hacia la izquierda

// Llama a la función para mover automáticamente a Crow
moveCrow();
