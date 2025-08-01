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
    const form = document.getElementById('formulario-torneo');
    form.classList.toggle('oculto');
});

// Crear torneo dinámicamente
document.getElementById('crear-torneo-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const data = new FormData(this);
    const torneo = {
        titulo: data.get('titulo'),
        creador: data.get('creador'),
        tipo: data.get('tipo'),
        categoria: data.get('categoria'),
        fecha: data.get('fecha'),
        lugar: data.get('lugar'),
    };

    const div = document.createElement('div');
    div.classList.add('torneo-creado');
    div.innerHTML = `
      <h3>${torneo.titulo}</h3>
      <p><strong>Creador:</strong> ${torneo.creador}</p>
      <p><strong>Tipo:</strong> ${torneo.tipo}</p>
      <p><strong>Categoría:</strong> ${torneo.categoria}</p>
      <p><strong>Fecha:</strong> ${torneo.fecha}</p>
      <p><strong>Lugar:</strong> ${torneo.lugar}</p>
      <div style="text-align: right;">
          <button class="btn-inscribirse" data-nombre="${torneo.titulo}" data-descripcion="Torneo de tipo ${torneo.tipo}, categoría ${torneo.categoria}">
              Inscribirse
          </button>
      </div>
      <hr class="linea-separadora">
      `;


    // Asignar evento al botón nuevo
    const boton = div.querySelector('.btn-inscribirse');
    boton.addEventListener('click', inscribirseEventoHandler);


    document.getElementById('lista-torneos').appendChild(div);
    this.reset();
    document.getElementById('formulario-torneo').classList.add('oculto');
});

function guardarTorneosEnStorage() {
    const torneosHTML = document.getElementById('lista-torneos').innerHTML;
    localStorage.setItem('torneosHTML', torneosHTML);
}

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
});

function inscribirseEventoHandler() {
    const nombre = this.getAttribute('data-nombre');
    const descripcion = this.getAttribute('data-descripcion');
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



