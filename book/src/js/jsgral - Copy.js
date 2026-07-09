// Elementos del DOM para el Menú Lateral
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openBtn');

// Elementos del DOM para el Panel de Paralelos Inferior
const panelParalelos = document.getElementById('panelParalelos');
const panelTitulo = document.getElementById('panelTitulo');
const panelContenido = document.getElementById('panelContenido');
const closePanelBtn = document.getElementById('closePanelBtn');

/* ==========================================================================
   1. MAPA DE PARALELOS (Base de datos temporal de referencias cruzadas)
   ========================================================================== */
// Aquí registraremos qué versículos tienen paralelos para que JS les dibuje el círculo automáticamente.
// Estructura: "Capítulo-Versículo": { libro: "...", contenido: "..." }
const paralelosGénesis = {
  "1-1": {
    libro: "Juan 1:1-2; Hebreos 11:3",
    contenido: "Juan 1:1: En el principio era el Verbo... | Hebreos 11:3: Por la fe entendemos haber sido constituido el universo..."
  },
  "1-3": {
    libro: "2 Corintios 4:6",
    contenido: "2 Co. 4:6: Porque Dios, que mandó que de las tinieblas resplandeciese la luz, es el que resplandeció en nuestros corazones..."
  }
  // Podrás seguir agregando más paralelos aquí fácilmente siguiendo el formato "Capítulo-Versículo"
};

/* ==========================================================================
   2. CARGADOR DINÁMICO DE LIBROS Y CAPÍTULOS (AJAX / FETCH)
   ========================================================================== */
/**
 * Función para cargar y renderizar un capítulo específico desde el archivo JSON
 * @param {string} rutaJson - Ruta del archivo (ej: 'src/libros/01_gn.json')
 * @param {number} numeroCapitulo - El capítulo que se desea leer (ej: 1)
 */
function cargarCapituloBiblico(rutaJson, numeroCapitulo) {
  fetch(rutaJson)
    .then(response => {
      if (!response.ok) {
        throw new Error(`No se pudo cargar el archivo: ${rutaJson}`);
      }
      return response.json();
    })
    .then(data => {
      renderizarContenido(data, numeroCapitulo);
    })
    .catch(error => {
      console.error("Error al obtener el libro bíblico:", error);
    });
}

/**
 * Se encarga de construir el HTML e inyectarlo en la página
 */
function renderizarContenido(libroData, capSeleccionado) {
  const contenedorPrincipal = document.querySelector('.main-content');
  
  // 1. Renderizar el título del libro
  let htmlContenido = `<h1 class="libro-titulo">${libroData.libro}</h1>`;
  htmlContenido += `<div class="texto-sagrado">`;
  
  // 2. Renderizar el número del capítulo
  htmlContenido += `<span class="capitulo-num">${capSeleccionado}</span>`;
  
  // 3. Obtener los versículos del capítulo seleccionado
  const versiculos = libroData.capitulos[capSeleccionado];
  
  if (versiculos) {
    // Recorremos cada versículo del JSON
    for (const numV in versiculos) {
      const textoVersiculo = versiculos[numV];
      const llaveParalelo = `${capSeleccionado}-${numV}`;
      
      // Verificamos si este versículo específico tiene paralelos registrados
      if (paralelosGénesis[llaveParalelo]) {
        const infoParalelo = paralelosGénesis[llaveParalelo];
        // Si tiene paralelo, le inyectamos la clase 'tiene-paralelo', el círculo 'v-con-circulo' y los atributos 'data-'
        htmlContenido += `
          <span class="versiculo tiene-paralelo" data-libro="${infoParalelo.libro}" data-contenido="${infoParalelo.contenido}">
            <span class="num-v v-con-circulo">${numV}</span>${textoVersiculo}
          </span>`;
      } else {
        // Versículo normal estándar sin círculo
        htmlContenido += `
          <span class="versiculo">
            <span class="num-v">${numV}</span>${textoVersiculo}
          </span>`;
      }
    }
  } else {
    htmlContenido += `<p>El capítulo ${capSeleccionado} no se encuentra disponible.</p>`;
  }
  
  htmlContenido += `</div>`;
  
  // NOTA: Dejamos un footer estático de ejemplo por ahora o vacío para las notas
  htmlContenido += `
    <footer class="pie-pagina">
      <p><strong>Nota 1:1</strong> El término hebreo para "Dios" aquí es <em>Elohim</em>.</p>
    </footer>`;
    
  // Inyectamos todo el bloque construido al DOM
  contenedorPrincipal.innerHTML = htmlContenido;
  
  // ¡IMPORTANTE! Volver a vincular los eventos de clic a los nuevos versículos dinámicos creados
  activarEventosParalelos();
}

/* ==========================================================================
   3. LÓGICA DEL PANEL DE PARALELOS (BOTTOM SHEET)
   ========================================================================== */
function activarEventosParalelos() {
  const versiculosConParalelo = document.querySelectorAll('.tiene-paralelo');

  versiculosConParalelo.forEach(versiculo => {
    versiculo.addEventListener('click', (e) => {
      const elementoTarget = e.currentTarget;
      
      const tituloParalelo = elementoTarget.getAttribute('data-libro');
      const contenidoParalelo = elementoTarget.getAttribute('data-contenido');

      // Formateamos el contenido separado por barras '|'
      const textoFormateado = contenidoParalelo.split('|').map(linea => `<p>${linea.trim()}</p>`).join('');

      panelTitulo.innerHTML = `📚 Paralelos: ${tituloParalelo}`;
      panelContenido.innerHTML = textoFormateado;

      panelParalelos.classList.add('open');
    });
  });
}

function closePanel() {
  panelParalelos.classList.remove('open');
}

closePanelBtn.addEventListener('click', closePanel);

document.addEventListener('click', (e) => {
  if (panelParalelos.classList.contains('open') && 
      !panelParalelos.contains(e.target) && 
      !e.target.closest('.tiene-paralelo')) {
    closePanel();
  }
});

/* ==========================================================================
   4. LÓGICA DEL MENÚ LATERAL (SIDEBAR)
   ========================================================================== */
function openMenu() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
}

function closeMenu() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

openBtn.addEventListener('click', openMenu);
overlay.addEventListener('click', closeMenu);

let startX = 0;
let currentX = 0;

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
  currentX = e.touches[0].clientX;
  if (!sidebar.classList.contains('open') && startX < 40 && (currentX - startX) > 60) {
    openMenu();
  }
  if (sidebar.classList.contains('open') && (startX - currentX) > 60) {
    closeMenu();
  }
});

/* ==========================================================================
   INICIALIZACIÓN DE LA APP
   ========================================================================== */
// Al cargar la página por primera vez, mandamos a llamar automáticamente Génesis, Capítulo 1
document.addEventListener('DOMContentLoaded', () => {
  cargarCapituloBiblico('src/libros/01_gn.json', 1);
});