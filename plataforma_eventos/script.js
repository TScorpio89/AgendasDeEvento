function mostrar(id) {
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(sec => sec.classList.remove('visible'));

    const activa = document.getElementById(id);
    if (activa) {
        activa.classList.add('visible');
    }
}
