function mostrar(id) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(sec => sec.classList.remove('visible'));

    const activa = document.getElementById(id);
    if (activa) {
        activa.classList.add('visible');
    }
}
function mostrar(id) {
    const secciones = document.querySelectorAll('.s');
    secciones.forEach(sec => sec.classList.remove('visible'));

    const activa = document.getElementById(id);
    if (activa) {
        activa.classList.add('visible');
    }
}
document.querySelectorAll('.btn-inscribirse').forEach(boton => {
    boton.addEventListener('click', inscribirseEventoHandler);
});


  // Mostrar / ocultar el formulario de creación
document.getElementById('btn-agregar-torneo').addEventListener('click', () => {
  document.getElementById('formulario-torneo').classList.remove('oculto');
});

// Crear torneo dinámicamente
const checkboxCapacidad = document.getElementById('habilitarCapacidad');
document.getElementById('crear-torneo-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(this);

    const archivoImagen = data.get('imagen');
    const lector = new FileReader();


    function crearTorneo(imagenBase64) {
        const torneo = {
            titulo: data.get('titulo'),
            creador: data.get('creador'),
            tipo: data.get('tipo'),
            categoria: data.get('categoria'),
            fecha: data.get('fecha'),
            hora: data.get('hora'),
            lugar: data.get('lugar'),
            descripcion: data.get('descripcion'),
            capacidad: checkboxCapacidad.checked ? parseInt(data.get('capacidad')) : null,
            inscritos: 0,
            imagen: imagenBase64,
        };

        const div = document.createElement('div');
        div.classList.add('torneo-creado');
        div.innerHTML = `
            <div class="evento torneo">
                ${torneo.imagen 
                    ? `<img src="${torneo.imagen}" alt="Imagen del Torneo" class="imagen-torneo">` 
                    : `<img src="assets/anonimo.png" alt="Sin Imagen" class="imagen-torneo">`}
                <div class="contenido-evento">
                <h3>${torneo.titulo}</h3>
                <p><strong>Creador:</strong> ${torneo.creador}</p>
                <p><strong>Tipo:</strong> ${torneo.tipo}</p>
                <p><strong>Categoría:</strong> ${torneo.categoria}</p>
                <p><strong>Fecha:</strong> ${torneo.fecha} - ${torneo.hora}</p>
                <p><strong>Lugar:</strong> ${torneo.lugar}</p>
                <div class="descripcion-torneo">
                    <strong>Descripción:</strong>
                    <p class="descripcion-texto descripcion-limitada">${torneo.descripcion}</p>
                    <span class="ver-mas-btn">Ver más...</span>
                </div>
                ${torneo.capacidad ? `<p><strong>Capacidad:</strong> <span class="contador-inscritos" data-titulo="${torneo.titulo}">0/${torneo.capacidad}</span></p>` : ''}
                <div style="text-align: right;">
                    <button class="btn-inscribirse" 
                            data-nombre="${torneo.titulo}" 
                            data-descripcion="${torneo.descripcion}">
                        Inscribirse
                    </button>
                </div>
                </div>
            </div>
            <hr class="linea-separadora">
        `;

        const boton = div.querySelector('.btn-inscribirse');
        boton.addEventListener('click', inscribirseEventoHandler);

        document.getElementById('lista-torneos').appendChild(div);
        guardarTorneosEnStorage();
        document.getElementById('crear-torneo-form').reset();
        document.getElementById('formulario-torneo').classList.add('oculto');
    }

    if (archivoImagen && archivoImagen.name) {
        lector.onload = function () {
            crearTorneo(lector.result);
        };
        lector.readAsDataURL(archivoImagen);
    } else {
        crearTorneo(null); // No hay imagen, se crea directamente
    }
});



//function guardarTorneosEnStorage() {
//    const torneosHTML = document.getElementById('lista-torneos').innerHTML;
//    localStorage.setItem('torneosHTML', torneosHTML);
//}

function cargarTorneosDesdeStorage() {
    const html = localStorage.getItem('torneosHTML');
    if (html) {
        document.getElementById('lista-torneos').innerHTML = html;

        document.querySelectorAll('.btn-inscribirse').forEach(boton => {
            boton.addEventListener('click', inscribirseEventoHandler);
        });

        document.querySelectorAll('.btn-eliminar-torneo').forEach(btn => {
            btn.addEventListener('click', eliminarTorneoHandler);
        });
    }
}

function guardarInscripciones() {
    const lista = document.getElementById('lista-inscritos').innerHTML;
    localStorage.setItem('inscripcionesHTML', lista);
}

function cargarInscripciones() {
  const data = JSON.parse(localStorage.getItem('inscripciones')) || [];
  const lista = document.getElementById('lista-inscritos');
  lista.innerHTML = ''; // limpiamos antes de volver a cargar

  data.forEach(({ nombre, descripcion }) => {
    const evento = document.createElement('div');
    evento.classList.add('evento-inscrito');
    evento.innerHTML = `
      <h4>${nombre}</h4>
      <p>${descripcion}</p>
      <button class="btn-eliminar-inscripcion">Eliminar</button>
      <hr>
    `;
    lista.appendChild(evento);

    // Activamos el botón "Eliminar"
    evento.querySelector('.btn-eliminar-inscripcion').addEventListener('click', () => {
      evento.remove();
      guardarInscripciones(); // actualizamos el almacenamiento
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
    cargarTorneosDesdeStorage();
    cargarInscripciones();

    // Validación de fecha
    const fechaInput = document.querySelector('input[name="fecha"]');
    const hoy = new Date();
    hoy.setDate(hoy.getDate() + 7);
    const yyyy = hoy.getFullYear();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    const dd = String(hoy.getDate()).padStart(2, '0');
    const fechaMinima = `${yyyy}-${mm}-${dd}`;
    fechaInput.min = fechaMinima;

    fechaInput.addEventListener('input', () => {
        const [a, m, d] = fechaInput.value.split('-').map(Number);
        const fechaSeleccionada = new Date(a, m - 1, d); // año, mes (0-11), día
        if (fechaSeleccionada.getDay() === 0) {
            alert("No se pueden crear eventos los domingos.");
            fechaInput.value = '';
        }
    });
    const checkboxCapacidad = document.getElementById('habilitarCapacidad');
    const campoCapacidad = document.getElementById('campoCapacidad');

    checkboxCapacidad.addEventListener('change', () => {
        campoCapacidad.style.display = checkboxCapacidad.checked ? 'block' : 'none';
    });

    // Validación de hora
    const horaInput = document.querySelector('input[name="hora"]');
    horaInput.min = "07:00";
    horaInput.max = "22:00";
});

function inscribirseEventoHandler() {
    const nombre = this.getAttribute('data-nombre');
    const descripcion = this.getAttribute('data-descripcion');
    const capacidadSpan = document.querySelector(`.contador-inscritos[data-titulo="${nombre}"]`);
    if (capacidadSpan) {
        const [actual, max] = capacidadSpan.textContent.split('/').map(Number);
        if (actual >= max && this.textContent === "Inscribirse") {
            alert("Ya se ha alcanzado la capacidad máxima para este torneo.");
            return;
        }
    }
    const lista = document.getElementById('lista-inscritos');
    const yaInscrito = [...lista.querySelectorAll('h4')].some(e => e.textContent === nombre);

    if (!yaInscrito) {
        // Crear el nuevo evento
        const evento = document.createElement('div');
        evento.classList.add('evento-inscrito');
        evento.innerHTML = `
            <h4>${nombre}</h4>
            <p>${descripcion}</p>
            <button class="btn-eliminar-inscripcion">Eliminar</button>
            <hr>
        `;
        lista.appendChild(evento);
        guardarInscripciones();
        alert("Te has inscrito al evento: " + nombre);
    

        // Activar botón de eliminar
        evento.querySelector('.btn-eliminar-inscripcion').addEventListener('click', () => {
            evento.remove();
            guardarInscripciones();
            // Cambiar botón de vuelta a "Inscribirse"
            this.textContent = "Inscribirse";
        });

        // Cambiar el botón a "Salir"
        this.textContent = "Salir";
        if (capacidadSpan) {
            const [actual, max] = capacidadSpan.textContent.split('/').map(Number);
            capacidadSpan.textContent = `${actual + 1}/${max}`;
        }

    } else {
        // Eliminar de lista
        const inscrito = [...lista.querySelectorAll('.evento-inscrito')].find(e => 
            e.querySelector('h4')?.textContent === nombre
        );
        if (inscrito) {
            inscrito.remove();
            guardarInscripciones();
        }

        // Cambiar el botón a "Inscribirse"
        this.textContent = "Inscribirse";
        alert("Te has desinscrito del evento: " + nombre);

        // Actualizar contador capacidad
        if (capacidadSpan) {
            const [actual, max] = capacidadSpan.textContent.split('/').map(Number);
            capacidadSpan.textContent = `${actual - 1}/${max}`;
        }
    }

}
document.getElementById('filtro-categoria').addEventListener('change', function () {
    const categoria = this.value;
    document.querySelectorAll('.torneo-creado').forEach(div => {
        const contenido = div.innerText || "";
        if (!categoria || contenido.includes(categoria)) {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    });
});

const descripcionInput = document.getElementById('descripcion');
const contador = document.getElementById('contador');

descripcionInput.addEventListener('input', () => {
    const longitud = descripcionInput.value.length;
    contador.textContent = `${longitud} / 750`;
});

const inputImagen = document.querySelector('input[name="imagen"]');
const previewImagen = document.getElementById('preview-imagen');

inputImagen.addEventListener('change', function () {
    const archivo = this.files[0];
    if (archivo) {
        const lector = new FileReader();
        lector.onload = function (e) {
            previewImagen.src = e.target.result;
            previewImagen.style.display = 'block';
        };
        lector.readAsDataURL(archivo);
    } else {
        previewImagen.style.display = 'none';
    }
});

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("ver-mas-btn")) {
        const btn = e.target;
        const descripcion = btn.previousElementSibling;

        if (descripcion.classList.contains("descripcion-limitada")) {
            descripcion.classList.remove("descripcion-limitada");
            btn.textContent = "Ver menos...";
        } else {
            descripcion.classList.add("descripcion-limitada");
            btn.textContent = "Ver más...";
        }
    }
});
function abrirFormulario() {
  document.getElementById('formulario-torneo').classList.remove('oculto');
}

function cerrarFormulario() {
    const modal = document.getElementById('formulario-torneo');
    modal.classList.add('oculto');
}

// Cerrar automáticamente al crear torneo
document.getElementById('crear-torneo-form').addEventListener('submit', function (e) {
  e.preventDefault(); // prevenir el envío por defecto si no quieres recargar
  // Aquí haces tu lógica de creación del torneo...

  // Luego cierras el modal
  cerrarFormulario();
});
