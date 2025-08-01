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