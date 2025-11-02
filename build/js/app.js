document.addEventListener('DOMContentLoaded', function() {
    navegacionFija();
    crearGaleria();
    resaltarEnlace();
    scrollNav();
});

function navegacionFija() { //hacer que la barra de navegación se quede fija al hacer scroll
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobreFestival');

    window.addEventListener('scroll', function(){//scroll es un evento que se dispara cuando el usuario desplaza la página hacia arriba o hacia abajo // addEventListener es un método que permite escuchar eventos en un elemento específico, en este caso, la ventana del navegador (window).
        if(sobreFestival.getBoundingClientRect().bottom < 1) { //nos ayuda a saber si ya pasamos la posicion de en este caso sobreFestival
            header.classList.add('fixed'); //classList es una propiedad que devuelve una colección de las clases CSS de un elemento. add es un método que permite agregar una clase CSS a un elemento.
        }else{
            header.classList.remove('fixed');//remove es un método que permite eliminar una clase CSS de un elemento.
        }
    });
}

function crearGaleria() {//función para crear la galería de imágenes dinámicamente

    const cantidadImagenes = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i <= cantidadImagenes; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `./src/img/gallery/full/${i}.jpg`;
        imagen.alt = `Imagen galería ${i}`;

        //event handler
        //QUe es event handler? Un event handler es una función que se ejecuta en respuesta a un evento específico, como un clic del ratón, una pulsación de tecla o la carga de una página web. En este caso, el event handler se utiliza para abrir una imagen en tamaño completo cuando se hace clic en ella.
        imagen.onclick = function(){
            //función que muestra la imagen en tamaño completo
            mostrarImagen(i);
        }



        galeria.appendChild(imagen);
    };
};

function mostrarImagen(i){//función para mostrar la imagen en tamaño completo
    const imagen = document.createElement('IMG');
    imagen.src = `./src/img/gallery/full/${i}.jpg`;
    imagen.alt = `Imagen galería ${i}`;

    //generar modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');
    modal.onclick = cerrarModal; //no se pone el function porque lo que va dentro no pide parámetros

    //boton cerrar modal
    const btnCerrar = document.createElement('BUTTON');
    btnCerrar.textContent = 'X';
    btnCerrar.classList.add('btn-cerrar');
    btnCerrar.onclick = cerrarModal;

    //agregar la imagen
    modal.appendChild(imagen);
        //agregar el botón al modal
    modal.appendChild(btnCerrar);

    //agregar a HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden');//evita el scroll cuando la imagen se abre
    body.appendChild(modal);
};

function cerrarModal(){//función para cerrar el modal
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');

    setTimeout(() => {
    modal?.remove();

    const body = document.querySelector('body');
    body.classList.remove('overflow-hidden');//habilitar el scroll nuevamente
    }, 500);
};

function resaltarEnlace(){//función para resaltar el enlace de la navegación correspondiente a la sección visible en pantalla
    document.addEventListener('scroll', function(){
        const sections = document.querySelectorAll('section');//selecciona todas las secciones del documento
        const navLinks = document.querySelectorAll('.navegacion-principal a');//selecciona todos los enlaces de la navegación principal

        let actual = '';//variable para almacenar la sección actual

        sections.forEach(section =>{//recorre todas las secciones
            const sectionTop = section.offsetTop; //distancia desde la parte superior del documento hasta la sección
            const sectionHeight = section.clientHeight; //altura visible de la sección
            
            if(window.scrollY >= (sectionTop - sectionHeight / 3) ){ //scrollY es la cantidad de píxeles que el documento se ha desplazado verticalmente desde la parte superior
                actual = section.id //getAttribute es un método que devuelve el valor de un atributo específico de un elemento.
            }
        })

        navLinks.forEach(link => {//recorre todos los enlaces de la navegación
            link.classList.remove('active');//elimina la clase active de todos los enlaces
            if(link.getAttribute('href') === '#'+ actual){//compara el href del enlace con el id de la sección actual
                link.classList.add('active');//agrega la clase active al enlace
            }
        })
    })
};
function scrollNav(){//función para hacer scroll suave al hacer clic en un enlace de la navegación
    const navLinks = document.querySelectorAll('.navegacion-principal a');//selecciona todos los enlaces de la navegación principal
    navLinks.forEach(link => {//recorre todos los enlaces de la navegación
        link.addEventListener('click', e=>{//agrega un evento click a cada enlace
            e.preventDefault();//evita el comportamiento por defecto del enlace
            const sectionScroll = e.target.getAttribute('href');//obtiene el valor del atributo href del enlace
            const section = document.querySelector(sectionScroll);//selecciona la sección correspondiente al href

            section.scrollIntoView({behavior: 'smooth'});//hace scroll suave hasta la sección
        })
    });
}