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
    boton.addEventListener('click', function () {
      const nombre = this.getAttribute('data-nombre');
      const descripcion = this.getAttribute('data-descripcion');

      const lista = document.getElementById('lista-inscritos');

      const evento = document.createElement('div');
      evento.classList.add('evento-inscrito');
      evento.innerHTML = `
        <h4>${nombre}</h4>
        <p>${descripcion}</p>
        <hr>
      `;

      lista.appendChild(evento);
      

      alert("Te has inscrito al evento: " + nombre);
    });
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
    boton.addEventListener('click', function () {
        const nombre = this.getAttribute('data-nombre');
        const descripcion = this.getAttribute('data-descripcion');

        const lista = document.getElementById('lista-inscritos');
        const evento = document.createElement('div');
        evento.classList.add('evento-inscrito');
        evento.innerHTML = `
          <h4>${nombre}</h4>
          <p>${descripcion}</p>
          <hr>
        `;

        lista.appendChild(evento);
        alert("Te has inscrito al torneo: " + nombre);
    });

    document.getElementById('lista-torneos').appendChild(div);
    this.reset();
    document.getElementById('formulario-torneo').classList.add('oculto');
});

