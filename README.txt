# AgendasDeEventos
Esta parte iniciamos con la creacion de una plataforma donde
estudiantes y administradores de universidad puedan
organizar mejor manera los eventos o reuniones para
que haya mejor interactividad para todos.

//Primera Version//

Comenzamos por:
- Dividir en modulos y empezando la interfaz visual:
    {
        - Secciones
        - Cada seccion con su espacio (aun sin funcionalidad rela)
        - Botones funcionees (que cambien de seccion visualmente)
    }

Mi primera estructura del proyecto sera {
    plataforma_eventos/
    - index.html    (pagina principal)
    - style.css     (Estilos)
    - script.js     (Interacciones basicas)
    - assets/       (Imagenes o iconos)
}


Elegimmos los colores:
Para la parte superior sera el color #22468f
El fondo sera de color #eef2f8
Y Los cuadros de textos seran de color #ffffff

Agregamos el logo de la universidad y ademas hicimos que los botones
muestren un pequeño texto al clickearles. 

//Este seria el primer avance para la primera version Visual//


//Segunda version//
Crearemos el formulario para que se pueda crear nuevos eventos (aun
sin vincularlo a la base de datos)
Tambien haremos que se inserten los eventos en la pagina con 
JavaScript (sin la necesidad que se recargue la pagina)


- Hicimos la parte de que se muestren los eventos en la pestaña de Inicio,
y ademas agregue un boton "Inscribirse" para que sea rapida la inscripccion
a un evento, ademas solucione el error de la pestaña de "Inicio" que aveces
no aparecia.

- Pero ahora a aparecido un nuevo error que es la pestaña de "Eventos" Tambien
aparece en la pestaña "Inicio" eso se solucionara para la siguiente entrega


//Actualizacion de correcion errores//

Para arreglar el error de que las pestañas aparecen de forma acumulativa lo que
hice fue crear una nueva clase copiada de seccion, y añadirlas en la parte
de section, y despues en cada section cree un "div" y a los div le di la 
clase inicial que tenian para que no perdieran los estilos que ya se
tenian.

//Actualizacion agregada//

Seccion "Torneos" ya da funcionalidad tanto de forma visual como Para
que los usuarios puedan crear torneos de manera de formulario basico
Titulo:
Creador: (Automatico)
Tipo: (Individual / Equipo)
Categoria: (General / Facultad / Carrera / Ciclo)
Fecha:
Hora:
Lugar: (Lista por añadir)

Y ademas facilidad de acceso al inscribirse al Torneo 
Ademas se mejoro de forma visual los botones.


============================================================================

                    Reconocimientos y Mejoras

============================================================================

//Reconocimientos de errores//
Visualise que en un eventos se podrian inscribir varias veces, asi que
esta version se encargara de evitar inscripcion duplicada a eventos/torneos

//Ideas para mejorar//
Añadire un boton para eliminar inscripcion o torneos
Filtrar torneos por Categoria o Tipo
Cambiar nombre del creador dinamicamente desde el login

============================================================================


============================================================================

Se reparo el error y ademas se añadio un filtrador en la parte de
"Torneos" para que se pueda localizar torneos de la preferencia.

Este seria la actualizacion de "Reconocimientos"
============================================================================
