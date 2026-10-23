
const diapositivas = [
    document.getElementById("diapositiva1"),
    document.getElementById("diapositiva2"),
    document.getElementById("diapositiva3"),
    document.getElementById("diapositiva4"),
    document.getElementById("diapositiva5"),
    document.getElementById("diapositiva6"),
    document.getElementById("diapositiva7")
];

const botonSiguiente = document.getElementById("siguiente");
const numeroDiapositiva = document.querySelector(".numero-diapositiva");
const indicadores = document.querySelectorAll(".progreso span");

let diapositivaActual = 0;
let temporizadoresMetodologia = [];

function mostrarDiapositiva(indice) {
    // Cancelar animaciones anteriores
    temporizadoresMetodologia.forEach(function (temporizador) {
        clearTimeout(temporizador);
    });

    temporizadoresMetodologia = [];

    // Ocultar todas las diapositivas
    diapositivas.forEach(function (diapositiva) {
        if (diapositiva) {
            diapositiva.classList.remove("activa");
        }
    });

    // Mostrar la diapositiva elegida
    if (!diapositivas[indice]) {
        return;
    }

    diapositivas[indice].classList.add("activa");

    // Actualizar el contador
    numeroDiapositiva.textContent =
        String(indice + 1).padStart(2, "0") +
        " / " +
        String(diapositivas.length).padStart(2, "0");

    // Actualizar el progreso
    indicadores.forEach(function (indicador, posicion) {
        indicador.classList.toggle("activo", posicion === indice);
    });

    // Cambiar la flecha en la última diapositiva
    botonSiguiente.textContent =
        indice === diapositivas.length - 1 ? "←" : "→";

    botonSiguiente.setAttribute(
        "aria-label",
        indice === diapositivas.length - 1
            ? "Volver a la primera diapositiva"
            : "Avanzar a la próxima diapositiva"
    );

    // Animar las etapas al entrar en la diapositiva 5
    if (indice === 4) {
        animarMetodologia();
    }
}

// Mostrar las cuatro etapas de metodología progresivamente
function animarMetodologia() {
    const etapas = document.querySelectorAll(
        "#diapositiva5 .metodologia-etapa"
    );

    // Ocultar las etapas al entrar
    etapas.forEach(function (etapa) {
        etapa.classList.remove("etapa-visible");
    });

    // Mostrar una etapa cada 2 segundos
    etapas.forEach(function (etapa, indice) {
        const temporizador = setTimeout(function () {
            if (diapositivaActual === 4) {
                etapa.classList.add("etapa-visible");
            }
        }, (indice + 1) * 700);

        temporizadoresMetodologia.push(temporizador);
    });
}

// Avanzar a la siguiente diapositiva
function avanzar() {
    if (diapositivaActual < diapositivas.length - 1) {
        diapositivaActual++;
    } else {
        diapositivaActual = 0;
    }

    mostrarDiapositiva(diapositivaActual);
}

// Retroceder a la diapositiva anterior
function retroceder() {
    if (diapositivaActual > 0) {
        diapositivaActual--;
        mostrarDiapositiva(diapositivaActual);
    }
}

// Botón de navegación
botonSiguiente.addEventListener("click", avanzar);

// Navegación con el teclado
document.addEventListener("keydown", function (evento) {
    if (evento.key === "ArrowRight" || evento.key === " ") {
        evento.preventDefault();
        avanzar();
    }

    if (evento.key === "ArrowLeft") {
        retroceder();
    }
});

// Iniciar en la portada
mostrarDiapositiva(0);
