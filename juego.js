// Lógica del Juego de Clics
const juegoStartBtn = document.getElementById('juego-start-btn');
const juegoClickBtn = document.getElementById('juego-click-btn');
const juegoTiempoEl = document.getElementById('juego-tiempo');
const juegoPuntajeEl = document.getElementById('juego-puntaje');
const juegoResultadoEl = document.getElementById('juego-resultado');

let puntaje;
let tiempoRestante;
let temporizador;

if (juegoStartBtn) {
    juegoStartBtn.addEventListener('click', iniciarJuego);
}

if (juegoClickBtn) {
    juegoClickBtn.addEventListener('click', () => {
        puntaje++;
        juegoPuntajeEl.textContent = puntaje;
    });
}

function iniciarJuego() {
    puntaje = 0;
    tiempoRestante = 10;
    juegoPuntajeEl.textContent = puntaje;
    juegoTiempoEl.textContent = tiempoRestante;

    juegoStartBtn.style.display = 'none';
    juegoResultadoEl.style.display = 'none';
    juegoClickBtn.style.display = 'inline-block';
    juegoClickBtn.disabled = false;

    temporizador = setInterval(() => {
        tiempoRestante--;
        juegoTiempoEl.textContent = tiempoRestante;
        if (tiempoRestante <= 0) {
            finalizarJuego();
        }
    }, 1000);
}

function finalizarJuego() {
    clearInterval(temporizador);
    juegoClickBtn.disabled = true;
    juegoClickBtn.style.display = 'none';
    juegoStartBtn.style.display = 'inline-block';
    juegoStartBtn.textContent = 'Jugar de Nuevo';
    juegoResultadoEl.textContent = `¡Tu puntaje final es ${puntaje}!`;
    juegoResultadoEl.style.display = 'block';
}