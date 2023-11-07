let eventos = [];
let arr = [];

// El segundo arreglo lo guarda en formato JSON para mantenerlo en el localStorage
const nombreEvento = document.querySelector("#nombreEvento");
const fechaEvento = document.querySelector("#fechaEvento");
const agregar = document.querySelector("#agregar");
const listaEventos = document.querySelector("#listaEventos");

// Cargar eventos desde el localStorage
const json = cargar();
try {
    arr = JSON.parse(json);
} catch (error) {
    arr = [];
}
eventos = arr ? [...arr] : [];

// Escucha el envío del formulario
document.querySelector("form").addEventListener("submit", (e) => {
    // Evita que se envíe el formulario y la página se recargue
    e.preventDefault();
    // Agrega el evento
    agregarEvento();
});

function agregarEvento() {
    if (nombreEvento.value === "" || fechaEvento.value === "") {
        return;
    }
    // Retorna vacío si la fecha es anterior a la actual
    if (diferenciaFecha(fechaEvento.value) < 0) {
        return;
    }
    const nuevoEvento = {
        id: (Math.random() * 100).toString(36).slice(3),
        nombre: nombreEvento.value,
        fecha: fechaEvento.value,
    };
    // Agrega el nuevo evento y guarda en localStorage
    eventos.unshift(nuevoEvento);
    guardar(JSON.stringify(eventos));
    // Limpia la entrada del nombre del evento
    nombreEvento.value = "";

    mostrarEventos();
}

function diferenciaFecha(destino) {
    let fechaDestino = new Date(destino);
    let fechaActual = new Date();
    let diferencia = fechaDestino.getTime() - fechaActual.getTime();
    let dias = Math.ceil(diferencia / (1000 * 3600 * 24));
    return dias;
}

function mostrarEventos() {
    const eventosHTML = eventos.map((evento) => {
        return `
            <div class="eventos">
                <div class="dias">
                    <span class="diasFaltantes">${diferenciaFecha(evento.fecha)}</span>
                    <span class="texto"> días para</span>
                    <div class="nombreEvento">${evento.nombre}</div>
                    <div class="nombreEvento">${evento.fecha}</div>
                    <div class="acciones"> 
                        <button data-id="${evento.id}" class="eliminar">Eliminar</button>
                    </div>
                </div>
            </div>
        `;
    });

    listaEventos.innerHTML = eventosHTML.join("");

    // Elimina los eventos al hacer clic en el botón "Eliminar"
    document.querySelectorAll(".eliminar").forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = button.getAttribute('data-id');
            eventos = eventos.filter((evento) => evento.id !== id);

            mostrarEventos();
        });
    });
}

function guardar(datos) {
    localStorage.setItem("lista", datos);
}

function cargar() {
    return localStorage.getItem("lista") || "[]";
}
