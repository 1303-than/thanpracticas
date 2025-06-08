// Funcionalidad del Slideshow
let slideIndex = 1; // Inicializa el índice de la diapositiva en 1 (la primera)
showSlides(slideIndex); // Muestra la primera diapositiva al cargar

// Función para avanzar o retroceder diapositivas
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Función para ir a una diapositiva específica usando los "puntos"
function currentSlide(n) {
  showSlides(slideIndex = n);
}

// Lógica principal para mostrar las diapositivas
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides"); // Obtiene todas las diapositivas
  let dots = document.getElementsByClassName("dot"); // Obtiene todos los "puntos" de navegación

  // Reinicia el índice si se excede el número de diapositivas o es menor que 1
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}

  // Oculta todas las diapositivas
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Elimina la clase 'active' de todos los "puntos"
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Muestra la diapositiva actual y añade la clase 'active' al "punto" correspondiente
  slides[slideIndex-1].style.display = "block"; // Las diapositivas son un array base 0
  dots[slideIndex-1].className += " active";
}

// Navegación de la Single Page Application (SPA)
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('header nav ul li a'); // Selecciona todos los enlaces de navegación
  const contentSections = document.querySelectorAll('.content-section'); // Selecciona todas las secciones de contenido

  // Función para mostrar la sección correcta y actualizar la navegación
  const showSection = (sectionId) => {
    // 1. Ocultar todas las secciones de contenido
    contentSections.forEach(section => {
      section.classList.remove('active'); // Elimina la clase 'active'
      section.style.display = 'none'; // Oculta la sección visualmente
    });

    // 2. Mostrar solo la sección deseada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active'); // Añade la clase 'active'
      targetSection.style.display = 'block'; // Muestra la sección
    }

    // 3. Actualizar la clase 'current' en la navegación (resaltar el enlace activo)
    navLinks.forEach(link => {
      link.parentElement.classList.remove('current'); // Elimina la clase 'current' de todos los elementos 'li'
    });

    // Encuentra el enlace que corresponde a la sección activa y le añade la clase 'current'
    const currentNavLink = document.querySelector(`header nav ul li a[data-section="${sectionId.replace('-section', '')}"]`);
    if (currentNavLink) {
      currentNavLink.parentElement.classList.add('current');
    }

    // 4. Si se navega a la sección de inicio, reiniciar el slideshow
    if (sectionId === 'home-section') {
      slideIndex = 1; // Reinicia el índice del slideshow a la primera diapositiva
      showSlides(slideIndex); // Muestra la primera diapositiva
    }
  };

  // Manejar clics en los enlaces de navegación
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Evita que el navegador recargue la página
      const sectionName = link.dataset.section; // Obtiene el valor del atributo 'data-section'
      if (sectionName) {
        showSection(`${sectionName}-section`); // Llama a la función para mostrar la sección
      }
    });
  });

  // Mostrar la sección de inicio por defecto al cargar la página
  showSection('home-section');
});
