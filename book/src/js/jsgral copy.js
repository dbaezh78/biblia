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
   LÓGICA DEL MENÚ LATERAL (SIDEBAR)
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

// Eventos de Desplazamiento Táctil para móviles (Touch Events)
let startX = 0;
let currentX = 0;

document.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
  currentX = e.touches[0].clientX;
  
  // Desplazar desde el borde izquierdo hacia la derecha para abrir
  if (!sidebar.classList.contains('open') && startX < 40 && (currentX - startX) > 60) {
    openMenu();
  }
  
  // Desplazar hacia la izquierda para cerrar
  if (sidebar.classList.contains('open') && (startX - currentX) > 60) {
    closeMenu();
  }
});

/* ==========================================================================
   LÓGICA DEL PANEL DE PARALELOS (BOTTOM SHEET)
   ========================================================================== */
// Capturamos todos los versículos que tengan paralelos
const versiculosConParalelo = document.querySelectorAll('.tiene-paralelo');

versiculosConParalelo.forEach(versiculo => {
  versiculo.addEventListener('click', (e) => {
    // Evitamos problemas si se hace clic exactamente sobre el círculo rojo
    const elementoTarget = e.currentTarget;
    
    // Obtenemos los datos guardados en los atributos custom del HTML
    const tituloParalelo = elementoTarget.getAttribute('data-libro');
    const contenidoParalelo = elementoTarget.getAttribute('data-contenido');

    // Formateamos el contenido si viene separado por barras verticales '|'
    const textoFormateado = contenidoParalelo.split('|').map(linea => `<p>${linea.trim()}</p>`).join('');

    // Seteamos la información en el panel flotante inferior
    panelTitulo.innerHTML = `📚 Paralelos: ${tituloParalelo}`;
    panelContenido.innerHTML = textoFormateado;

    // Desplegamos el panel hacia arriba
    panelParalelos.classList.add('open');
  });
});

// Función para cerrar el panel flotante
function closePanel() {
  panelParalelos.classList.remove('open');
}

closePanelBtn.addEventListener('click', closePanel);

// Cerrar panel si se hace scroll o clic fuera del área del panel (opcional)
document.addEventListener('click', (e) => {
  // Si el panel está abierto y el clic no fue dentro del panel ni en un versículo con paralelo, lo cerramos
  if (panelParalelos.classList.contains('open') && 
      !panelParalelos.contains(e.target) && 
      !e.target.closest('.tiene-paralelo')) {
    closePanel();
  }
});